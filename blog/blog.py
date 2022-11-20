from flask import Flask

blog = Flask(__name__)

@blog.route("/")
def index():
    return "Welcome to the crowemi blog!"

@blog.route("/health")
def health():
    return "true"


if __name__ == "__main__":
    blog.config["SERVER_NAME"] = 'blog.crowemi'
    blog.run(debug=True)