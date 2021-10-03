# mindbeamer
Beaming the bits into the minds of the masses at MAGFest

# Project Components

* /examples - Example configuration files to test with. In the format that uber-parser will output.
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

# 

