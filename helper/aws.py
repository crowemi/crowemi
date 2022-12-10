import boto3

resource = boto3.resource('s3')

def get_object(bucket: str, key: str) -> str:
    obj = resource.Object(bucket, key)
    return obj.get()['Body'].read().decode('utf-8')