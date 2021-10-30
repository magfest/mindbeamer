#!/bin/bash

export AWS_ACCESS_KEY_ID=
export AWS_SECRET_ACCESS_KEY=
export AWS_DEFAULT_REGION=us-east-1
sudo -E java -Droot="/greengrass/v2" -Dlog.store=FILE -jar /opt/greengrass/lib/Greengrass.jar --aws-region us-east-1 --thing-name Mindbeamer-$(cat /proc/cpuinfo | grep Serial | cut -d ' ' -f 2) --thing-group-name MindbeamerDisplayGroup --component-default-user ggc_user:ggc_group --provision true --setup-system-service true --deploy-dev-tools true
