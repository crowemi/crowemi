import os

from flask import Blueprint, render_template
from markdown import markdown

from helper.aws import *

blog = Blueprint("blog", __name__, subdomain="blog")

BASE_ROUTE = "Obsidian/blog/"


@blog.route("/", subdomain='blog')
def index():
    try:
        html = markdown(get_object_content('crowemi', f'Obsidian/blog/about.md'))
    except Exception as e:
        print(e)
        html = "Uh oh! Something isn't right. Please try again later."
    return render_template("blog.html", page_content=html)

@blog.route("/investing/", subdomain = "blog")
@blog.route("/investing/<id>", subdomain="blog")
def investing(id: str = None):
    try:
        if id:
            pass
        else:
            id = 'about'
        html = markdown(get_object_content('crowemi', f'{BASE_ROUTE}investing/{id}.md'))
    except Exception as e:
        print(e)
        html = "Uh oh! Something isn't right. Please try again later."
    return render_template("blog.html", page_content=html)