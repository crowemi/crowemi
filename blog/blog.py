import os
from flask import Blueprint, render_template

blog = Blueprint("blog", __name__, subdomain="blog")

@blog.route("/", subdomain='blog')
def index():
    return "Hello World! From Blog."
