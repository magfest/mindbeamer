#!/bin/bash

# If this is a new install of Mindbeamer...
if [ ! -f /opt/mindbeamer/provisioned ]; then
    # If the USB drive is plugged in and has a provision.sh file...
    if [ -f /media/usb/provision.sh ]; then
    # Check to see if the file is signed by a key we trust
        gpg --no-default-keyring --keyring /opt/mindbeamer/signer.kbx --verify /media/usb/provision.sh.sig /media/usb/provision.sh

        if [ $? -eq 0 ]; then
            # Verify internet connectivity
            if nc -zw1 google.com 443 && echo |openssl s_client -connect $test:443 2>&1 |awk '
            handshake && $1 == "Verification" { if ($2=="OK") exit; exit 1 }
            $1 $2 == "SSLhandshake" { handshake = 1 }'
            then
                # If it does, run the provision.sh file
                /bin/bash /media/usb/provision.sh

                if [ $? -eq 0 ]; then
                    # And then mark this pi as provisioned
                    touch /opt/mindbeamer/provisioned
                    # Move the splash screen to be provisioned
                    rm /boot/splash.png
                    mv /boot/splash-ready.png /boot/splash.png
                    # reboot
                    reboot
                else
                    echo Provision script failed to run.
                    exit 1
                fi
            fi
        else
            echo Provision script signature is not valid.
        fi
    fi
fi