#!/bin/bash

keybase pgp sign -i mindbeamer-wpa-supplicant.txt -d -o mindbeamer-wpa-supplicant.txt.sig
keybase pgp sign -i provision.sh -d -o provision.sh.sig