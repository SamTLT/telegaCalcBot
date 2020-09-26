# telegaCalcBot

TelegaCalcBot is a [Telegram](https://telegram.org/) bot that allows you to calculate debts between two persons

# How to use it?
Create a new group, invite second person and bot to the group.
Execute following command:
```sh
/limit
```
After that bot starts to work.
A person who pays have to add record in following format: 
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

As soon you will pay you debt, or you get your money back, you can execute command:
```sh
/limit
```
Bot starts to count from this moment. (It will not count any records that was added before)

# Installation
Create .env file with following content (you can use an .env.example file as a template):
```sh
DB_CONNECTION=token
TELEGRAM_TOKEN=token
```

https://cloud.mongodb.com/ - To get the DB_CONNECTION tocken

https://core.telegram.org/bots/api - Telegram Bot API. To create a bot and get the TELEGRAM_TOKEN  

Telegram Bot webHook setup \
https://api.telegram.org/bot{my_bot_token}/setWebhook?url={url_to_send_updates_to} \
my_bot_token - tocken provied by @BotFather \
url_to_send_updates_to - URL telegram should trigger after receiving a new message (HTTPS only)

Working with TELEGRAM_TOKEN \
You should send message to @BotFather
```sh
/token - to get current tocken
/revoke - to refresh tocken
```
After refreshing tocken you have to setup a webHook again

https://dashboard.heroku.com/ - I am using heroku for deploiment. It has a really convinent automatic deploiment tool. But don't forget to set environment variables in your project settings
