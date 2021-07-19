#!/bin/bash

sudo apt install docker.io
sudo systemctl enable docker

sudo usermod -aG docker $USER
