import base64
import boto3

resource = boto3.resource('s3')
client = boto3.client('s3')

def get_object_content(bucket: str, key: str) -> str:
    obj = resource.Object(bucket, key)
    return obj.get()['Body'].read().decode('utf-8')

def get_object(bucket: str, key: str):
    return client.get_object(Bucket=bucket, Key=key)

def list_object(bucket: str, key: str):
    return client.list_objects_v2(Bucket=bucket, Prefix=key)

def list_objects(prefix: str, bucket: str, next_token: str = None):
    ret = None
    if next_token:
        ret = client.list_objects_v2(Bucket=bucket, Prefix=prefix, ContinuationToken=next_token)
    else:
        ret = client.list_objects_v2(Bucket=bucket, Prefix=prefix)
    return ret

def object_exists(bucket: str, key: str):
    ret = client.list_objects_v2(Bucket=bucket, Prefix=key)
    return True if ret['KeyCount'] > 0 else False

def parse_path(keys: list, prefix: str) -> object:
    paths = {}

    for key in keys:
        k = prefix.count('/')
        post_prefix = key['Key'].split(prefix)[1]
        post_prefix_paths = post_prefix.split("/")
        # traverse file structure
        i = 0
        current_position = paths
        while i < len(post_prefix_paths):
            current_path = post_prefix_paths[i]
            if len(current_path.split('.')) > 1:
                # page
                if "root" in current_position:
                    current_position["root"].append([current_path, base64.b64encode(bytes(post_prefix, 'utf-8'))])
                else:
                    root = list()
                    root.append([current_path, base64.b64encode(bytes(post_prefix, 'utf-8'))])
                    current_position["root"] = root
            else:
                if current_path in current_position:
                    current_position = current_position[current_path]
                else:
                    current_position[current_path] = {}
                    current_position = current_position[current_path]
            i += 1

    return paths