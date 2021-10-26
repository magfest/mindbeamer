#!/bin/bash
# Mindbeamer Client Installation Script
# 
# Install script 1 - Updating OS and installing required packages
# 
# To be used on Raspberry Pi model 3B and above imaged with FullPageOS 0.12.0.
# Run as the `pi` user

# Check to see if this has run before, otherwise exit
if [ -f /opt/mindbeamer_install1 ]; then
    echo "Install script 1 already run, exiting."
    exit 0
fi

# Add ggc user and group for AWS Greengrass Core install
sudo adduser --system ggc_user
sudo addgroup --system ggc_group

# Ensure system is up to date
sudo apt-get update             # Get the latest lists
sudo apt update -y              # To accept the updates to the repo name
sudo apt full-upgrade -y        # Install latest packages
sudo apt-get upgrade -y         # Get anything else we may have missed

# Install prereqs
sudo apt install openjdk-8-jdk -y

# Download and unpack Greengrass Nucleus
curl -s https://d2s8p88vqu9w66.cloudfront.net/releases/greengrass-nucleus-latest.zip > greengrass-nucleus-latest.zip
unzip greengrass-nucleus-latest.zip -d GreengrassCore

# Add system vars
sudo su -
echo "fs.protected_hardlinks = 1" >> /etc/sysctl.d/97-custom.conf
echo "fs.protected_symlinks = 1" >> /etc/sysctl.d/97-custom.conf
exit

touch /opt/mindbeamer_install1

# Reboot
sudo reboot

#sudo -E java -Droot="/greengrass/v2" -Dlog.store=FILE -jar ./GreengrassCore/lib/Greengrass.jar --aws-region us-east-1 --thing-name GreengrassQuickStartCore-17cb35bb2ef --thing-group-name GreengrassQuickStartGroup --component-default-user ggc_user:ggc_group --provision true --setup-system-service true --deploy-dev-tools true

