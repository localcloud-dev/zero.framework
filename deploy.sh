#!/bin/sh

#Parameters
#$1 - website domain
#$2 - app domain

if [ -z "$1" ]
then
  echo ""
  echo ""
  echo "No domains is specified in the command"
  echo ""
  echo ""
  exit 0
fi

#wait until another process are trying updating the system
while sudo fuser /var/{lib/{dpkg,apt/lists},cache/apt/archives}/lock >/dev/null 2>&1; do sleep 1; done
while sudo fuser /var/lib/dpkg/lock-frontend >/dev/null 2>&1; do sleep 1; done

#Disable "Pending kernel upgrade" message. OVH cloud instances show this message very often, for
sudo sed -i "s/#\$nrconf{kernelhints} = -1;/\$nrconf{kernelhints} = -1;/g" /etc/needrestart/needrestart.conf
sudo sed -i "/#\$nrconf{restart} = 'i';/s/.*/\$nrconf{restart} = 'a';/" /etc/needrestart/needrestart.conf

#Open only necessary ports
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 22
sudo ufw --force enable

#Install Bun.js
curl -fsSL https://bun.sh/install | bash

sudo bun install pm2 -g
pm2 start --interpreter ~/.bun/bin/bun website.js --name website
pm2 start --interpreter ~/.bun/bin/bun app.js --name app

pm2 startup
pm2 save

#Generate SSH keys
sudo ssh-keyscan bitbucket.org >> ~/.ssh/known_hosts
sudo ssh-keyscan github.com >> ~/.ssh/known_hosts

#Install Caddy Server
DEBIAN_FRONTEND=noninteractive sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --batch --yes --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo DEBIAN_FRONTEND=noninteractive sudo apt -y install caddy

echo -e "$1 {\n    reverse_proxy /* localhost:5226\n}\n$2 {\n    reverse_proxy /* localhost:5225\n} " > $HOME/Caddyfile
cd $HOME
caddy reload
