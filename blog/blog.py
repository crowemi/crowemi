import os

from flask import Blueprint, render_template
from markdown import markdown

from helper.aws import get_object

blog = Blueprint("blog", __name__, subdomain="blog")

@blog.route("/", subdomain='blog')
def index():
    try:
        html = markdown(get_object('crowemi', f'Obsidian/blog/about.md'))
    except Exception as e:
        print(e)
        html = "Uh oh! Something isn't right. Please try again later."
    return render_template("blog.html", page_content=html)

@blog.route("/investing", subdomain="blog")
def investing(id: str = None):
    try:
        html = markdown(get_object('crowemi', f'Obsidian/blog/investing/about.md'))
    except Exception as e:
        print(e)
        html = "Uh oh! Something isn't right. Please try again later."
    return render_template("blog.html", page_content=html)