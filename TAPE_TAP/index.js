/**
 * Created by leow on 8/5/16.
 */
"use strict"

const mqtt = require('mqtt')

const client = mqtt.connect("mqtt://broker.hivemq.com")

let loop_sensor_activated = false

client.on('connect', () => {
    // Inform that the sensir state is OK
    client.publish('iot_magic/loop', "BOB")

})
