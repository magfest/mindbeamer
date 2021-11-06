#!/bin/bash

# If the USB drive is plugged in and has a mindbeamer-wpa-supplicant.txt file...
if [ -f /media/usb/mindbeamer-wpa-supplicant.txt ]; then
    # Check to see if the file is signed by a key we trust
    gpg --no-default-keyring --keyring /opt/mindbeamer/signer.kbx --verify /media/usb/mindbeamer-wpa-supplicant.txt.sig /media/usb/mindbeamer-wpa-supplicant.txt

    if [ $? -eq 0 ]; then
        diff /media/usb/mindbeamer-wpa-supplicant.txt /boot/mindbeamer-wpa-supplicant.txt

        # If there's new content
        if [ ! $? -q 0 ]; then
            # If it does, copy the new config over
            cp /media/usb/mindbeamer-wpa-supplicant.txt /boot/mindbeamer-wpa-supplicant.txt

            # And then reboot this bad boy
            reboot
        else 
            echo No new WiFi config to update.
        fi
    else
        echo WPA Supplicant signature is not valid. Not copying.
    fi
fi
