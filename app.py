import logging

from flask import Flask

from crowemi.crowemi import crowemi
from blog.blog import blog

app = Flask(__name__, subdomain_matching=True)
app.config["SERVER_NAME"] = 'crowemi.com' #TODO: find a better way to config 'crowemi.local:5000'

app.register_blueprint(crowemi)
app.register_blueprint(blog, subdomain="blog")


if __name__ == "__main__":
    app.config["SERVER_NAME"] = 'crowemi.com' #TODO: find a better way to config 'crowemi.local:5000'
    app.run(debug=True)

