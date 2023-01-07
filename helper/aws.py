import boto3

resource = boto3.resource('s3')

def get_object_content(bucket: str, key: str) -> str:
    obj = resource.Object(bucket, key)
    return obj.get()['Body'].read().decode('utf-8')

def get_object(self, key: str, bucket: str):
        return self.aws_client.get_object(Bucket=bucket, Key=key)

def list_object(self, key: str, bucket: str):
    return self.aws_client.list_objects_v2(Bucket=bucket, Prefix=key)

def list_objects(self, prefix: str, bucket: str, next_token: str = None):
    ret = None
    if next_token:
        ret = self.aws_client.list_objects_v2(Bucket=bucket, Prefix=prefix, ContinuationToken=next_token)
    else:
        ret = self.aws_client.list_objects_v2(Bucket=bucket, Prefix=prefix)

    return ret

def object_exists(self, key: str, bucket: str):
    ret = self.aws_client.list_objects_v2(Bucket=bucket, Prefix=key)
    return True if ret['KeyCount'] > 0 else False