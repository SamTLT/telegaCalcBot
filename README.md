# telegaCalcBot

Если соберусь выкладывать в паблик, то нужно будет перезалить проект, т.к. спалил .env =\
Так же нужно будет поменять все креденшелы.

Для работы необходимо:

Создать файл .env со следующим содержимым (за основу можно взять файл .env.example):
DB_CONNECTION=token
TELEGRAM_TOKEN=token

В качестве БД используется монга. Я использую бесплатную версию на https://cloud.mongodb.com/
Там мы и создаем токен DB_CONNECTION

https://core.telegram.org/bots/api - API бота телеги. Тут мы создаем бота и получаем токен TELEGRAM_TOKEN

Настройка Telegram Bot webHook:
https://api.telegram.org/bot{my_bot_token}/setWebhook?url={url_to_send_updates_to}

where
my_bot_token is the token you got from BotFather when you created your Bot
url_to_send_updates_to is the url of the piece of code you wrote to implement your Bot behavior (must be HTTPS)

Узнать текущий токен можно у @BotFather
/token - текущий токен
/revoke - обновить токен

после обновления токена нужно заново устанавливать webHook.
