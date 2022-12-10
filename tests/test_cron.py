from cron.capture_twitter_followers import main


def test_capture_twitter_followers():
    ret = main()
    assert ret