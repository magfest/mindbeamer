#!/bin/bash
# Mindbeamer Client Installation Script
# 
# Install script 1 - Updating OS and installing required packages
# 
# To be used on Raspberry Pi model 3B and above imaged with FullPageOS 0.12.0.
# Run as the `pi` user

# Check to see if this has run before, otherwise exit
if [ -f /opt/mindbeamer/install1 ]; then
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
sudo apt-get install -y gcc g++ make
curl -sSL https://deb.nodesource.com/setup_14.x | sudo bash -
sudo apt-get install -y nodejs

# Download and unpack Greengrass Nucleus
curl -s https://d2s8p88vqu9w66.cloudfront.net/releases/greengrass-nucleus-latest.zip > greengrass-nucleus-latest.zip
unzip greengrass-nucleus-latest.zip -d GreengrassCore

# Add system vars
sudo su -c 'echo "fs.protected_hardlinks = 1" >> /etc/sysctl.d/97-custom.conf' -
sudo su -c 'echo "fs.protected_symlinks = 1" >> /etc/sysctl.d/97-custom.conf' -

# Create mindbeamer client data directories
sudo mkdir /opt/mindbeamer
sudo chown pi:pi /opt/mindbeamer

# Download and install client software
cd /opt/mindbeamer/
git clone https://github.com/magfest/mindbeamer.git repo
cd repo/
git checkout initial-frontend
cd frontend/
npm install

# Install AWS IoT Greengrass Core v2 client
sudo -E java -Droot="/greengrass/v2" -Dlog.store=FILE -jar ./GreengrassCore/lib/Greengrass.jar --aws-region us-east-1 --thing-name Mindbeamer-$(cat /proc/cpuinfo | grep Serial | cut -d ' ' -f 2) --thing-group-name MindbeamerDisplayGroup --component-default-user ggc_user:ggc_group --provision true --setup-system-service true --deploy-dev-tools true

# Done with this install, let's make sure it doesnt run again
touch /opt/mindbeamer/install1

# Reboot
sudo reboot

