#!/bin/bash

# If this is a new install of Mindbeamer...
if [ ! -f /opt/mindbeamer/provisioned ]; then
    # Set the Timezone
    timedatectl set-timezone America/New_York 
    
    # If the USB drive is plugged in and has a provision.sh file...
    if [ -f /media/usb/provision.sh ]; then
    # Check to see if the file is signed by a key we trust
        gpg --no-default-keyring --keyring /opt/mindbeamer/signer.kbx --verify /media/usb/provision.sh.sig /media/usb/provision.sh

        if [ $? -eq 0 ]; then
            # If it does, run the provision.sh file
            /bin/bash /media/usb/provision.sh
            # And then mark this pi as provisioned
            touch /opt/mindbeamer/provisioned
            # Move the splash screen to be provisioned
            rm /boot/splash.png
            mv /boot/splash-ready.png /boot/splash.png
        else
            echo Provision script signature is not valid.
        fi
    fi
fi