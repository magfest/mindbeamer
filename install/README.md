# Mindbeamer Client Provisioning

1. Download [FullPageOS v0.12.0](https://github.com/guysoft/FullPageOS/releases/tag/0.12.0).
1. [Image it](https://www.raspberrypi.com/software/) to a SD card.
1. Update the `fullpageos-wpa-supplicant.txt` file in the boot partition with your network details. Remember Pi's only have 2.4Ghz networking, so use that network.
1. Update the `cmdline.txt` file in the boot partition to add ` cgroup_enable=memory cgroup_memory=1` to the end of the line.
1. Plug the SD card into the pi, power it on, and wait for it to show up on your network. This normally takes 3 minutes or so on first boot.
1. SSH into the Pi using `pi` / `raspberry` as the credentials.
1. Run `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/magfest/mindbeamer/main/install/client_1.sh)"`
