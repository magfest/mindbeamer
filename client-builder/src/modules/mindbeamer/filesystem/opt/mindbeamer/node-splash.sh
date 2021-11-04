#!/bin/bash

# If the node server is not listening on port 3000, show the splash screen
if [[ $(netstat -ltn | grep ":3000" | wc -l) -eq "0" ]] ; then 
  tmp=$(mktemp)
  jq '.urls[0].url = "http:\/\/localhost\/waiting.html"' /var/www/html/FullPageDashboard/urls.json > "$tmp" && mv "$tmp" /var/www/html/FullPageDashboard/urls.json
  chown www-data:www-data /var/www/html/FullPageDashboard/urls.json
  rm "$tmp"
else
# If it is listening, switch to the node port
  tmp=$(mktemp)
  jq '.urls[0].url = "http:\/\/localhost:3000"' /var/www/html/FullPageDashboard/urls.json > "$tmp" && mv "$tmp" /var/www/html/FullPageDashboard/urls.json
  chown www-data:www-data /var/www/html/FullPageDashboard/urls.json
  rm "$tmp"
fi