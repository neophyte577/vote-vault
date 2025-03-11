from flask import Flask, request, jsonify, render_template
import boto3
import os

# Configure S3 client with environment variables
s3 = boto3.client(
    's3',
    region_name='us-east-2',
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY")
)
BUCKET_NAME = os.getenv("S3_BUCKET", "fec-data-staging-bucket")

app = Flask(__name__)

@app.route('/')
def index():
    # Renders the index.html file from the templates/ directory
    return render_template('index.html')

@app.route('/download', methods=['GET'])
def download_file():
    category = request.args.get('category')
    cycle = request.args.get('cycle')
    dataset = request.args.get('dataset')
    filetype = request.args.get('filetype')

    print(category, cycle, dataset, filetype)

    if category == "finance":
        if not dataset:
            return jsonify({"error": "No dataset selected."}), 400
        filename = f"campaign-finance/today_{dataset}_{cycle}.{filetype}"
    elif category == "election":
        if not dataset:
            return jsonify({"error": "No dataset selected."}), 400
        filename = f"election/{dataset}_{cycle}.{filetype}"
    else:
        return jsonify({"error": "Invalid category."}), 400

    try:
        # Verify that the file exists in S3
        s3.head_object(Bucket=BUCKET_NAME, Key=filename)
    except s3.exceptions.NoSuchKey:
        return jsonify({"error": f"File '{filename}' not found in S3."}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    try:
        # Generate a presigned URL for the file download
        file_url = s3.generate_presigned_url(
            'get_object',
            Params={'Bucket': BUCKET_NAME, 'Key': filename},
            ExpiresIn=3600  # Link expires in 1 hour
        )
        return jsonify({"download_url": file_url})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
