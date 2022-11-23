from flask import Blueprint, render_template

from helper.twitter import get_latest_tweet

crowemi = Blueprint("crowemi", __name__)

@crowemi.route("/")
def index():
    return render_template("home.html", latest_tweet=get_latest_tweet())

@crowemi.route("/health")
def health():
    return "true"
