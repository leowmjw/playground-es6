// dependencies
var async = require('async');
var AWS = require('aws-sdk');
var gm = require('gm').subClass({imageMagick: true}); // Enable ImageMagick integration.
var util = require('util');

// constants
var MAX_WIDTH = 100;
var MAX_HEIGHT = 100;

// get reference to S3 client 
var s3 = new AWS.S3();

exports.handler = function (event, context, callback) {
    // Read options from the event.
    console.log("Reading options from event:\n", util.inspect(event, {depth: 5}));
    var srcBucket = event.Records[0].s3.bucket.name;
    // Object key may have spaces or unicode non-ASCII characters.
    var srcKey =
        decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));
    var dstBucket = "michael-testo";
    // srcKey is the UUID
    // /avatars/profile/<uuid>/<size>.<ext>, where size is one of 32, 64, 128, and ext is the extension of image.
    // Mike.jpg
    // /avatars/profile/Mike/32.jpg
    var KeyArray = srcKey.split(".")
    var finalext = KeyArray.pop()
    var finaluuid = KeyArray.join()

    var prefixKey = "avatars/profile/" + finaluuid + "/"
    var dstKey = prefixKey + "32." + finalext;

    var finalsizes = ["16", "32", "64"]

    // Sanity check: validate that source and destination are different buckets.
    if (srcBucket == dstBucket) {
        callback("Source and destination buckets are the same.");
        return;
    }

    // Infer the image type.
    var typeMatch = srcKey.match(/\.([^.]*)$/);
    if (!typeMatch) {
        callback("Could not determine the image type.");
        return;
    }
    var imageType = typeMatch[1];
    if (imageType != "jpg" && imageType != "png") {
        callback('Unsupported image type: ${imageType}');
        return;
    }

    finalsizes.map(function (size) {
        dstKey = prefixKey + size + "." + finalext;
        process(srcBucket, srcKey, dstBucket, dstKey, imageType, size, callback)
    })
};

function process(srcBucket, srcKey, dstBucket, dstKey, imageType, size, callback) {
    // Download the image from S3, transform, and upload to a different S3 bucket.
    async.waterfall([
            function download(next) {
                // Download the image from S3 into a buffer.
                s3.getObject({
                        Bucket: srcBucket,
                        Key: srcKey
                    },
                    next);
            },

            function transform(response, next) {
                // Resize to 32x32
                var width = size;
                var height = size;
                gm(response.Body).resize(width, height)
                    .toBuffer(imageType, function (err, buffer) {
                        if (err) {
                            next(err);
                        } else {
                            next(null, response.ContentType, buffer);
                        }
                    });
            },
            function upload(contentType, data, next) {
                // Stream the transformed image to a different S3 bucket.
                s3.putObject({
                        Bucket: dstBucket,
                        Key: dstKey,
                        Body: data,
                        ContentType: contentType
                    },
                    next);
            }


        ], function (err) {
            if (err) {
                console.error(' Error: ' + err);
            } else {
                console.log('OK!');
            }

            callback(null, "message");

        }
    );

}


