import os
import requests
import json
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("base.html", latest_tweet=get_latest_tweet())

@app.route("/health")
def health():
    return "true"

def get_latest_tweet(twitter_username: str = 'therealcrowemi'):
    # TODO: add checks for env var
    twitter_bearer = os.getenv('twitter_bearer')
    last_tweet = None
    if twitter_bearer:
        headers = {'Authorization': f'Bearer {twitter_bearer}'}
        user = json.loads(requests.get(f"https://api.twitter.com/2/users/by/username/{twitter_username}", headers = headers).content)
        tweets = json.loads(requests.get(f"https://api.twitter.com/2/users/{user['data'].get('id')}/tweets", headers = headers).content)
        last_tweet = tweets['data'][0]
    return last_tweet

if __name__ == "__main__":
    app.run(host="localhost", port=8080, debug=True)