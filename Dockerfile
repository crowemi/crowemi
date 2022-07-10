# Set base image (host OS)
FROM python:3.8-slim

# Update and install system packages
RUN apt-get update && \
  apt-get install --no-install-recommends -y -q \
  gcc libpq-dev python-dev git-all && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Set the working directory in the container
WORKDIR /app

# Copy the content of the local src directory to the working directory
COPY . .

# Install any dependencies
RUN python -m pip install --upgrade pip
RUN pip install poetry
RUN poetry config virtualenvs.create false
RUN poetry install

# Specify the command to run on container start
CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0", "--port=8080"]
