FROM ubuntu:22.04

EXPOSE 8080

RUN apt update
RUN apt install --no-install-recommends -y -q python3-pip python3-dev build-essential libssl-dev libffi-dev python3-setuptools nano systemctl nginx

# Set the working directory in the container
WORKDIR /app
COPY . .

# Install any dependencies
RUN python3 -m pip install --upgrade pip
RUN pip install -r requirements.txt

COPY crowemi.service /etc/systemd/system/
COPY crowemi.conf /etc/nginx/sites-available/

RUN ln -s /etc/nginx/sites-available/crowemi.conf /etc/nginx/sites-enabled/
RUN unlink /etc/nginx/sites-enabled/default
RUN systemctl restart nginx

RUN chown -R root /app

# # Specify the command to run on container start
CMD [ "sh", "./start.sh" ]
