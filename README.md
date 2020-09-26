# telegaCalcBot

TelegaCalcBot is a [Telegram](https://telegram.org/) bot that allows to calculate how much money do 2 people owe each other (you and another person)

# How to use it?
Create a new group, invite second person and bot to the group
Execute following command:
```sh
/limit
```
After that bot starts to work
A person who pays or gives you money have to add record in a following format: 
```sh
"amout" "description"
```
For example:
```sh
5000 Restaurant
1500 Glasses
400 KFC
```

The bot will calculate total amount of money each person paid and it will provide total information how much money you owe, or another person owes you

As soon as you will pay all you owe, or you get your money back, one of person can execute command:
```sh
/limit
```
Bot starts to count from this moment. (It will not count any records that was added before)

# Developing
Create .env file with following content (you can use an .env.example file as a template):
```sh
DB_CONNECTION=token
TELEGRAM_TOKEN=token
```

https://cloud.mongodb.com/ - To get the DB_CONNECTION token

https://core.telegram.org/bots/api - Telegram Bot API. To create a bot and get the TELEGRAM_TOKEN  

Telegram Bot webHook setup \
https://api.telegram.org/bot{my_bot_token}/setWebhook?url={url_to_send_updates_to} \
my_bot_token - token provied by @BotFather \
url_to_send_updates_to - URL telegram should trigger after receiving a new message (HTTPS only)

Working with TELEGRAM_TOKEN \
You should send message to @BotFather
```sh
/token - to get current token
/revoke - to refresh token
```
After refreshing token you have to setup a webHook again

# Start
```sh
npm i
npm start
```

# Test
```sh
npm test
```

# Deploing

https://dashboard.heroku.com/ - I am using heroku for deploiment. It has a really convinent automatic deploiment tool. But don't forget to set environment variables in your project settings
