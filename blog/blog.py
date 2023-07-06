import os

from flask import Blueprint, render_template, request
from markdown import markdown
from markdown2 import Markdown

from helper.aws import *

blog = Blueprint("blog", __name__, subdomain="blog")

BUCKET = "crowemi"
# TODO: determine what happens when there is no default page, we should check if the document exists and the
# then display a default page if not.
DEFAULT_PAGE = "about"
BASE_ROUTE = "Obsidian/blog/"
# TODO: make this dynamic
SUBJECTS = [
    {"name": "investing", "paths": list(), "icon": "fa-solid fa-arrow-trend-up"},
    {"name": "finance", "paths": list(), "icon": "fa-solid fa-sack-dollar"},
    {"name": "projects", "paths": list(), "icon": "fa-solid fa-screwdriver-wrench"},
    {"name": "tutorials", "paths": list(), "icon": "fa-solid fa-code"},
]
MARKDOWN_EXTENSIONS = ["codehilite", "fenced_code"]


@blog.route("/", subdomain="blog")
def index():
    try:
        get_paths()
        html = markdown(
            get_object_content("crowemi", f"Obsidian/blog/about.md"),
            extensions=MARKDOWN_EXTENSIONS,
        )
    except Exception as e:
        print(e)
        html = "Uh oh! Something isn't right. Please try again later."
    return render_template("blog_home.html", page_content=html, subjects=SUBJECTS)


@blog.route("/<subject>/", subdomain="blog")
@blog.route("/<subject>/<id>", subdomain="blog")
def page(subject: str = None, id: str = None):
    try:
        is_base = request.args.get('base', default = False, type = bool)
        get_paths()
        last_modified = None
        if not id:
            id = DEFAULT_PAGE
            key = f"{BASE_ROUTE}{subject}/{id}.md"
        else:
            key = f"{base64.b64decode(id).decode('utf-8')}"

        if not is_base and object_exists(BUCKET, key):
            page_content = markdown(
                get_object_content(BUCKET, key),
                extensions=MARKDOWN_EXTENSIONS,
            )

            document = get_object(BUCKET, key)
            last_modified = document["LastModified"]
        else:
            # render template for subpage
            # TODO: if the path contains about.md, display that in a top section.
            paths = parse_path(list_objects(key, BUCKET)["Contents"], key, BUCKET)
            _metadata = get_object_content(BUCKET, f"{key}_metadata.md")
            if _metadata:
                _metadata = json.loads(_metadata)

            return render_template(
                "blog_folder.html",
                last_modified=last_modified,
                subject=subject,
                _metadata=_metadata,
                paths=paths,
                referrer=request.referrer
            )
    except Exception as e:
        print(e)
        page_content = "Uh oh! Something isn't right. Please try again later."
    return render_template(
        "blog_page.html",
        page_content=page_content,
        last_modified=last_modified,
        subjects=SUBJECTS,
        referrer=request.referrer
    )

def get_paths():
    for subject in SUBJECTS:
        objects = list_objects(f"{BASE_ROUTE}{subject['name']}/", BUCKET)
        prefix = objects.get("Prefix", None)
        keys = objects.get("Contents", None)
        paths = {}
        if keys:
            paths = parse_path(keys, prefix, BUCKET)
        subject["paths"] = paths
