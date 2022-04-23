#!/usr/bin/with-contenv bashio

echo "Starting tuyacli-cpr"

MQTT_HOST=$(bashio::services mqtt "host")
MQTT_USER=$(bashio::services mqtt "username")
MQTT_PASSWORD=$(bashio::services mqtt "password")

node main.js "${MQTT_HOST}" "${MQTT_USER}" "${MQTT_PASSWORD}"

echo "Exited?"
