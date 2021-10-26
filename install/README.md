# Mindbeamer Client Provisioning

1. Download FullPageOS.
1. Image it to a SD card.
1. Update the /boot/fullpageos-wpa-supplicant.txt file with your network details. Remember Pi's only have 2.4Ghz networking, so use that network.
1. Update the /boot/cmdline.txt file to add ` cgroup_enable=memory cgroup_memory=1` to the end of the line.
1. Plug the SD card into the pi, power it on, and wait for it to show up on your network. This normally takes 3 minutes or so on first boot.
1. SSH into the Pi using `pi` / `raspberry` as the credentials.
1. Run `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/magfest/mindbeamer/main/install/client_1.sh)"`
