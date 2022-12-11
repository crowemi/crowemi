from logging.config import dictConfig

from flask import Flask

from crowemi.crowemi import crowemi
from blog.blog import blog


dictConfig(
    {
        "version": 1,
        "formatters": {
            "default": {
                "format": "[%(asctime)s] %(levelname)s in %(module)s: %(message)s",
            }
        },
        "handlers": {
            "console": {
                "class": "logging.StreamHandler",
                "stream": "ext://sys.stdout",
                "formatter": "default",
            },
            "file": {
                "class": "logging.FileHandler",
                "filename": "flask.log",
                "formatter": "default",
            },
        },
        "root": {"level": "DEBUG", "handlers": ["console", "file"]},
    }
)

app = Flask(__name__, subdomain_matching=True)

app.config["SERVER_NAME"] = 'localhost:8080' #TODO: find a better way to config 'crowemi.local:5000'

app.register_blueprint(crowemi)
app.register_blueprint(blog, subdomain="blog")


if __name__ == "__main__":
    app.config["SERVER_NAME"] = 'localhost:8080' #TODO: find a better way to config 'crowemi.local:5000'
    app.run(debug=True)

