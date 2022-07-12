from flask import Flask, render_template

from helper import get_latest_tweet


app = Flask(__name__)

@app.route("/")
def index():
    return render_template("base.html", latest_tweet=get_latest_tweet())

@app.route("/health")
def health():
    return "true"


if __name__ == "__main__":
    app.run(host="localhost", port=8080, debug=True)