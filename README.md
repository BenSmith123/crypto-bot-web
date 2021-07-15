
# cryptobot.nz

### Description
- Cryptobot.nz uses the 'Crypto Assistant' (discord-api) to read from the database, the API endpoints used to update user/bot configuration are currently not exposed to the web. Production API found here: https://github.com/BenSmith123/crypto-analyser
- The actual crypto-currency bot lambda functions are not exposed to the web either

### Commands
- `npm start`: Runs the website locally. Note: to access the API from local host you'll need headers:
	- Request: 'Origin': 'cryptobot.nz'
	- Response: 'Access-Control-Allow-Origin': '*'

- `npm run deploy`: Does a production react build and then deploys the /build folder to S3


### TODO
- Cryptobot favicon/images
- Prevent desktop navbar from sliding in
- Add hover everywhere for desktop

### Links
- Crypto assistant (discord-api) https://csezryhvsa.execute-api.ap-southeast-2.amazonaws.com/prod/commands
- S3 direct: https://s3.ap-southeast-2.amazonaws.com/cryptobot.nz/index.html
- CloudFront direct: https://d381tdzk0ut6cl.cloudfront.net/

- AWS certificiate manager: https://console.aws.amazon.com/acm/home?region=us-east-1#/?id=arn:aws:acm:us-east-1:793861092533:certificate%2F1f2416f0-1f38-48a3-831f-d21df03c98c1

- React-hook-form example: https://codesandbox.io/s/react-hook-form-custom-validation-8kuu7

- https://react-hook-form.com/api/useform/formstate
