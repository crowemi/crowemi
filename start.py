import os 

os.system("systemctl start crowemi")
os.system("systemctl enable crowemi")
os.system("systemctl status crowemi")

os.system("nginx -c /etc/nginx/nginx.conf -g 'daemon off;'")
