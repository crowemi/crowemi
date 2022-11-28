import os
import json
import requests
from datetime import datetime

TWITTER_BEARER = os.getenv('twitter_bearer')

def get_latest_tweet(twitter_username: str = 'therealcrowemi', twitter_bearer: str = TWITTER_BEARER) -> list:
    # TODO: add checks for env var
    # TODO: breakout api calls and object creation
    ret = list()
    ret = None
    try:
        if twitter_bearer:
            headers = {'Authorization': f'Bearer {twitter_bearer}'}
            user = json.loads(requests.get(f"https://api.twitter.com/2/users/by/username/{twitter_username}", headers = headers).content)
            # must have a user object
            if user:
                tweets = json.loads(requests.get(f"https://api.twitter.com/2/users/{user['data'].get('id')}/tweets?tweet.fields=created_at&exclude=replies&expansions=attachments.media_keys&media.fields=url,type", headers = headers).content)
                includes_media = None
                if 'includes' in tweets:
                    includes = tweets['includes']
                    if 'media' in includes:
                        includes_media = includes['media']
                # must have tweets
                if tweets:
                    data = tweets['data'][0]
                    created_at = datetime.strptime(data.get('created_at'), '%Y-%m-%dT%H:%M:%S.%fZ')

                    # TODO: convert this to testable method
                    diff = (datetime.utcnow() - created_at)
                    if diff.days == 0:
                        # create stamp for min/hr duration
                        if diff.seconds/60 > 60:
                            posted_at = f'{round(diff.seconds/60/60)} hours ago.' if diff.days == 0 else None
                        else:
                            posted_at = f'{round(diff.seconds/60)} minutes ago.'
                    else:
                        posted_at = f'{created_at.strftime("%b %d, %Y")}'

                    ret = {
                        "id": data.get('id'),
                        "text": data.get('text'),
                        "posted_at": posted_at
                    }
                    if 'attachments' in data:
                        media_id = data['attachments']['media_keys'][0]
                        for media in includes_media: 
                            if media.get('media_key') == media_id:
                                # only handle photos for now
                                if media.get('type') == 'photo':
                                    # capture image
                                    ret['media_key'] = media.get('media_key')
                                    ret['media_url'] = media.get('url')

    except Exception as e:
        # no soup for you!
        print(e)

    return ret

def get_followers(twitter_username: str = 'therealcrowemi', twitter_bearer: str = TWITTER_BEARER, max_size: int = 25):
    ret = list()
    try:
        headers = {'Authorization': f'Bearer {twitter_bearer}'}
        user = json.loads(requests.get(f"https://api.twitter.com/2/users/by/username/{twitter_username}", headers = headers).content)
        token = None
        # must have a user object
        if user:
            while True:
                url = f"https://api.twitter.com/2/users/{user['data'].get('id')}/followers?max_results={max_size}"
                if token:
                    url += f"&pagination_token={token}"
                followers = json.loads(requests.get(url, headers = headers).content)
                # append followers to ret
                list(map(lambda x: ret.append(x), followers.get('data')))
                meta = followers.get('meta')
                token = meta.get('next_token')
                if not token:
                    break

            print(followers)
    except Exception as e:
        # no soup for you!
        print(e)
    return ret
