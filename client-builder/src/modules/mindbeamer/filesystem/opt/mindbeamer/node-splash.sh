#!/bin/bash

fpdconfig=/var/www/html/FullPageDashboard/urls.json
currentsum=$(md5sum "$fpdconfig" | cut -d ' ' -f 1)
tmp=$(mktemp)

# If the node server is not listening on port 3000, show the splash screen
if [[ $(netstat -ltn | grep ":3000" | wc -l) -eq "0" ]] ; then 
  jq '.urls[0].url = "http:\/\/localhost\/waiting.html"' "$fpdconfig" > "$tmp"
else
# If it is listening, switch to the node port
  jq '.urls[0].url = "http:\/\/localhost:3000"' "$fpdconfig" > "$tmp"
fi

tmpsum=$(md5sum "$tmp" | cut -d ' ' -f 1)

if [ "$currentsum" != "$tmpsum" ] ; then
  chown www-data:www-data "$tmp"
  mv "$tmp" "$fpdconfig"
  /bin/su -c "/home/pi/scripts/refresh" - pi
fi