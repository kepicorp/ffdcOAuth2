# OAuth2 Bearer extractor for FFDC

> Creation 18th July 2019

## Install dependencies

> Make sure you have nodejs installed on the computer

Execute
```
npm install
```

## Create your .env file

```
CLIENT_ID=<MYID>
CLIENT_SECRET=<MYSECRET>
ACCESS_URL=https://api.preprod.fusionfabric.cloud/login/v1/sandbox/oidc/token
AUTHORIZE_URL=https://api.preprod.fusionfabric.cloud/login/v1/sandbox/oidc/authorize
RESPONSE_URL=http://<MYIP>:8888/oauth2/ffdc/callback
```

## Run the server

Execute
```
npm start
```

## Get the bearer token

Go on the url [localhost:8888](http://localhost:8888/oauth2/ffdc)

