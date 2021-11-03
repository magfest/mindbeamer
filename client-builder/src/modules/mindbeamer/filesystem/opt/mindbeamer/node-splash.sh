#!/bin/bash

# If the node server is not listening on port 3000, show the splash screen
if [[ $(netstat -ltn | grep ":3000" | wc -l) -eq "0" ]] ; then 
  echo "http://localhost/waiting.html" > /boot/fullpagedashboard.txt
  /bin/bash /home/pi/scripts/refresh
else
# If it is listening, switch to the node port
  echo "http://localhost:3000" > /boot/fullpagedashboard.txt
  /bin/bash /home/pi/scripts/refresh
fi