import os

from flask import Blueprint, render_template
from markdown import markdown

from helper.aws import *

blog = Blueprint("blog", __name__, subdomain="blog")

BUCKET = "crowemi"
# TODO: determine what happens when there is no default page, we should check if the document exists and the
# then display a default page if not.
DEFAULT_PAGE = 'about'
BASE_ROUTE = "Obsidian/blog/"
SUBJECTS = [
    { "name": 'investing', "paths" : list() },
    { "name": 'finance', "paths" : list() },
    { "name": 'fitness', "paths" : list() },
                                          
]


@blog.route("/", subdomain='blog')
def index():
    try:
        get_paths()
        html = markdown(get_object_content('crowemi', f'Obsidian/blog/about.md'))
    except Exception as e:
        print(e)
        html = "Uh oh! Something isn't right. Please try again later."
    return render_template("blog.html", page_content=html, subjects=SUBJECTS)

@blog.route("/<subject>/", subdomain = "blog")
@blog.route("/<subject>/<id>", subdomain="blog")
def page(subject: str = None, id: str = None):
    try:
        get_paths()
        last_modified = None
        if not id:
            id = DEFAULT_PAGE
            key = f'{BASE_ROUTE}{subject}/{id}.md'
        else:
            key = f"{BASE_ROUTE}{subject}/{base64.b64decode(id).decode('utf-8')}"
        if object_exists(BUCKET, key):
            page_content = markdown(get_object_content(BUCKET, key))
            document = get_object(BUCKET, key)
            last_modified = document['LastModified']
        else:
            raise Exception(f"{key} : Page not found.")
    except Exception as e:
        print(e)
        page_content = "Uh oh! Something isn't right. Please try again later."
    return render_template("blog.html", page_content=page_content, last_modified=last_modified, subjects=SUBJECTS)

def get_paths():
    for subject in SUBJECTS:
        objects = list_objects(f"{BASE_ROUTE}{subject['name']}/", BUCKET)
        prefix = objects['Prefix']
        keys = objects['Contents']
        paths = parse_path(keys, prefix)
        subject['paths'] = paths