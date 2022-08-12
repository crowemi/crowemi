FROM python:3.8-slim

EXPOSE 8080

RUN apt-get update && \
  apt-get install --no-install-recommends -y -q \
  python3 python3-pip nginx python3-flask python3-gunicorn nano

COPY crowemi.service /etc/systemd/system/
COPY crowemi.conf /etc/nginx/sites-available/
RUN ln -s /etc/nginx/sites-available/crowemi.conf /etc/nginx/sites-enabled/

# Set the working directory in the container
WORKDIR /app
COPY . .

# Install any dependencies
RUN python -m pip install --upgrade pip
RUN pip install -r requirements.txt

RUN chown -R www-data:www-data /app
RUN chown www-data:www-data /etc/systemd/system/crowemi.service

# Proceed in User (non-root) mode
USER www-data

# Specify the command to run on container start
# CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0", "--port=8080"]
CMD [ "sh" ]
