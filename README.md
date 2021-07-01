
S3 direct URL: https://s3.ap-southeast-2.amazonaws.com/cryptobot.nz/index.html

CloudFront direct: https://d381tdzk0ut6cl.cloudfront.net/

AWS certificiate manager: https://console.aws.amazon.com/acm/home?region=us-east-1#/?id=arn:aws:acm:us-east-1:793861092533:certificate%2F1f2416f0-1f38-48a3-831f-d21df03c98c1

### Commands
`npm start`: Runs the website locally. Note: to access the API from local host you'll need headers:
	- Request: 'Origin': 'cryptobot.nz'
	- Response: 'Access-Control-Allow-Origin': '*'

`npm run deploy`: Does a production react build and then deploys the /build folder to S3

https://csezryhvsa.execute-api.ap-southeast-2.amazonaws.com/prod/commands


https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/migrate-dns-domain-inactive.html#migrate-dns-get-zone-file-domain-inactive
