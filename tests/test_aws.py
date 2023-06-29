import json
import base64
from helper.aws import get_object, list_objects, parse_path

def test_get_object():
    ret = get_object()

def test_list_object():
    d = list_objects('Obsidian/blog/investing/', 'crowemi')

    prefix = d['Prefix']
    keys = d['Contents']
    paths = parse_path(keys, prefix)
    assert len(paths) > 0