import os
import boto3
from helper.twitter import get_followers

def main():
    AWS_ACCESS_KEY_ID = os.getenv('aws_access_key_id')
    AWS_SECRET_ACCESS_KEY = os.getenv('aws_secret_access_key')

    client = boto3.client(
        service_name='dynamodb',
        aws_access_key_id=AWS_ACCESS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_ACCESS_KEY
        )

    # get list of current followers
    # 
    ret = client.put_item(
        TableName="test",
        Item={'id': {'N': '3'}}
    )

    print(ret)

if __name__ == "__main__":
    main()