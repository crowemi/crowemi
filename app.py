import logging

from flask import Flask

from crowemi.crowemi import crowemi
from blog.blog import blog

logging.basicConfig(filename='log/record.log', level=logging.DEBUG, format=f'%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s')
 

app = Flask(__name__, subdomain_matching=True)

app.register_blueprint(crowemi)
app.register_blueprint(blog, subdomain="blog")


if __name__ == "__main__":
    app.config["SERVER_NAME"] = 'crowemi.com'
    app.run(debug=True)