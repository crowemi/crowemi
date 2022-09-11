from flask import Flask, render_template

from helper.twitter import get_latest_tweet


crowemi = Flask(__name__)

@crowemi.route("/")
def index():
    return render_template("base.html", latest_tweet=get_latest_tweet())

@crowemi.route("/health")
def health():
    return "true"


if __name__ == "__main__":
    crowemi.run(host="localhost", port=8080, debug=True)