#!/bin/bash

# If the node server is not listening on port 3000, show the splash screen
$port="3000"
if [[ $(netstat -ltn | grep ":${port} " | wc -l) -eq "0" ]] ; then 
  echo "http://localhost/waiting.html" > /boot/fullpageos.txt
  /bin/bash /home/pi/scripts/refresh
else
  echo "http://localhost:3000" > /boot/fullpageos.txt
  /bin/bash /home/pi/scripts/refresh
fi
# If it is listening, switch to the node port