#!/bin/bash
systemctl start crowemi
systemctl enable crowemi
systemctl status crowemi

systemctl start blog
systemctl enable blog
systemctl status blog

nginx -c /etc/nginx/nginx.conf -g 'daemon off;'

# nginx -c /etc/nginx/nginx.conf -g 'daemon off;'