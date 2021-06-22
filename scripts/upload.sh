
# deploys all files in the build folder to S3

aws s3 sync build s3://benjaminrsmith.com/crypto-bot \
--exclude '.git/*' \
--exclude '*.sh' \
--acl public-read \
--cache-control max-age=60 \
--delete \
--profile bensmith

echo "DONE";
