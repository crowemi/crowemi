import os
import pytest

from helper.twitter import *


def test_get_latest_tweet():
    ret = get_latest_tweet()
    assert ret

def test_get_followers():
    ret = get_followers()
    assert ret