# Mindbeamer Client Provisioning

1. Download Mindbeamer IMG file from GitHub Actions and extract it.
1. [Image it](https://www.raspberrypi.com/software/) to a SD card.
1. Get a flash drive and copy `provision.sh`, `mindbeamer-wpa-supplicant.txt`, and `sign.sh` to it.
1. Update the `mindbeamer-wpa-supplicant.txt` file with your network details. Remember Pis only have 2.4Ghz networking, so use that network.
1. Add AWS credentials w/ AdministratorAccess to your `provision.sh` file.
1. On a box with Keybase installed, run `sign.sh` to sign the two files with your PGP key.
1. Plug the SD card AND the USB stick into the pi, power it on, and wait for roughly 25 minutes. The Pi will reboot a number of times during this process.
1. Done!
