# mindbeamer
Beaming the bits into the minds of the masses at MAGFest

# Technical Requirements

* Display Computer user frontend based on (FullPageOS)[https://github.com/guysoft/FullPageOS]
* UI looks similar between 1080p and 4k TV screens
* Config files are able to be downloaded from control server, allowing for fully offline operations
* Admin console that allows to see last time display computers checked in, what version of the config they are running, and the mode they are running in

## Icing on the cake

* Allow for getting real time from other open networks nearby in case of main backhaul outage (Captive Portal)
* Room busy-ness indicator
* Notifications if display computer has been offline for longer than a particular duration of time
* Notifications on screen in case of emergency/notification that needs to go out

## Types of Displays

* GenericInfoDisplay - You has screen? You has info!
* RoomSpecificExternalDisplay - You has screen in front of room? Let us know, we will give you specifics!
* RoomSpecificInternalDisplay - You has screen in room? Let us know, we will give you awesome content!

# Accessibility Requirements

* Map should always be shown for GenericInfoDispay
* QR code to guidebook should always be shown
* can be read from 10ft away
* not visually busy
* clock
* security / info desk phone
* alternating row colors
* symbol in front of each row indicating type of event

# Project Components

* /examples - Example configuration files to test with. In the format that uber-parser will output.
* /install - Install scripts to get clients online
* /terraform/backend - Backend code terraform
* /terraform/frontend - Frontend code terraform (may not be needed)
* /uber-parser - Script that transforms uber scheduling to mindbeamer config
* /tests - Test scripts that allow for testing functionality

# How schedule updates work

0. Schedule updates are made inside of MAGFest Ubersystem.
1. `uber-parser` (Lambda Scheduled Function) polls for new changes to the schedule from MAGFest Ubersystem via the API and generates a config. That config gets uploaded to an S3 bucket.
2. `display-updater` (Lambda Function) is triggered on S3 object create to send a notification to all InfoDisplays to download the new version of the config.
3. Display computers running `mindbeamer-client` get an MQTT notification to download the latest version of the config from S3, do so, and then update their shadow with the most up to date version of the json file to reflect the download has happened and succeeded.
4. The `react-frontend` running on all display computers notice a new config downloaded and update their contents with the most recent config data. 

# AWS IoT Components 

Documentation: https://docs.aws.amazon.com/greengrass/v2/developerguide/greengrass-nucleus-component.html
