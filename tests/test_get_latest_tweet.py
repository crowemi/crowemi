import os
import pytest

from helper import get_latest_tweet


def test_get_latest_tweet():
    ret = get_latest_tweet()
    assert ret