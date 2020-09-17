# telegaCalcBot

Для работы необходимо:

Создать файл .env со следующим содержимым (за основу можно взять файл .env.example):
DB_CONNECTION=token
TELEGRAM_TOKEN=token

В качестве БД используется монга. Я использую бесплатную версию на https://cloud.mongodb.com/
Там мы и создаем токен DB_CONNECTION

https://core.telegram.org/bots/api - API бота телеги. Тут мы создаем бота и получаем токен TELEGRAM_TOKEN

Настройка Telegram Bot webHook:
https://api.telegram.org/bot{my_bot_token}/setWebhook?url={url_to_send_updates_to}
my_bot_token - токен, полученный у @BotFather
url_to_send_updates_to - урл, на который будет ходить телеграмм в случае получения ботом нового сообщения (должен быть HTTPS)

Узнать текущий токен можно у @BotFather\
/token - текущий токен\
/revoke - обновить токен

После обновления токена нужно заново устанавливать webHook.

Я деплоюсь на Heroku: https://dashboard.heroku.com/ \
При деплое переменные окружения задаются в settings вашего проекта + там есть довольно удобный функционал автоматической сборки проекта из репозитория гитхаба.
