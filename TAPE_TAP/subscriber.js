/**
 * Created by leow on 8/5/16.
 */
"use strict"

const util = require('util')

const mqtt = require('mqtt')

const client = mqtt.connect("mqtt://broker.hivemq.com")


client.on('connect', () => {
    client.subscribe("iot_magic/loop")
})

client.on('message', (topic, message) => {
    console.error("TOPIC: %s MSG: %s", topic, message)
})

// LORA ..

const ttn = require('ttn')

const appEUI = '70B3D57ED000095C'

const accessKey = 'idooQoJoxqXwxhF/o/8jvnxyT+/dQN8pKlMZTCgbRlw='

const lora = new ttn.Client('staging.thethingsnetwork.org', appEUI, accessKey)

lora.on('uplink', (msg, extra) => {

    console.error("UPLINK: DATA: ", util.inspect(msg, {depth: 10}))
    console.error("EXTRA: ", util.inspect(extra, {depth: 10}))
})

lora.on('activation', (msg, extra) => {
    console.error("ACTIVATION: DATA: ", util.inspect(msg, {depth: 10}))
    console.error("EXTRA: ", util.inspect(extra, {depth: 10}))

})