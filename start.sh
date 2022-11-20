#!/bin/bash
systemctl start crowemi
systemctl enable crowemi
systemctl status crowemi

nginx -c /etc/nginx/nginx.conf -g 'daemon off;'

# nginx -c /etc/nginx/nginx.conf -g 'daemon off;'