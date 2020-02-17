const funcs = require('./telegram.js');

    // getMessage,
    // numberParser,
    // messageTextParse,
    // isLimiter,
    // processData,
    // sendMessage,
    // summaryMsg,
    // unixTimeToString,
    // resultMessage

const dbItemMessage = {
    "_id":"5e49519b7d0d5f0017b0deac",
    "updateId":812742820,
    "data":{
        "update_id":812742820,
        "message":{
            "message_id":326,
            "from":{
                "id":162884870,
                "is_bot":false,
                "first_name":"Seamus",
                "username":"JohnSmiz",
                "language_code":"ru"
            },
            "chat":{
                "id":162884870,
                "first_name":"Seamus",
                "username":"JohnSmiz",
                "type":"private"
            },
            "date":1581863323,
            "text":"/limit",
            "entities":[
                {"offset":0,
                "length":6,
                "type":"bot_command"
            }]
        }
    },
    "chatId":162884870,
    "__v":0
};

const messageAnswer = {
    "message_id":326,
    "from":{
        "id":162884870,
        "is_bot":false,
        "first_name":"Seamus",
        "username":"JohnSmiz",
        "language_code":"ru"
    },
    "chat":{
        "id":162884870,
        "first_name":"Seamus",
        "username":"JohnSmiz",
        "type":"private"
    },
    "date":1581863323,
    "text":"/limit",
    "entities":[
        {"offset":0,
        "length":6,
        "type":"bot_command"
    }]
};

test('get (message) from obj', () => {
  expect(funcs.getMessage(dbItemMessage)).toEqual(messageAnswer);
});

const dbItemEditedMessage = {
    "_id":"5e49519b7d0d5f0017b0deac",
    "updateId":812742820,
    "data":{
        "update_id":812742820,
        "edited_message":{
            "message_id":326,
            "from":{
                "id":162884870,
                "is_bot":false,
                "first_name":"Seamus",
                "username":"JohnSmiz",
                "language_code":"ru"
            },
            "chat":{
                "id":162884870,
                "first_name":"Seamus",
                "username":"JohnSmiz",
                "type":"private"
            },
            "date":1581863323,
            "text":"231 bill",
            "entities":[
                {"offset":0,
                "length":6,
                "type":"bot_command"
            }]
        }
    },
    "chatId":162884870,
    "__v":0
};

const editedMessageAnswer = {
    "message_id":326,
    "from":{
        "id":162884870,
        "is_bot":false,
        "first_name":"Seamus",
        "username":"JohnSmiz",
        "language_code":"ru"
    },
    "chat":{
        "id":162884870,
        "first_name":"Seamus",
        "username":"JohnSmiz",
        "type":"private"
    },
    "date":1581863323,
    "text":"231 bill",
    "entities":[
        {"offset":0,
        "length":6,
        "type":"bot_command"
    }]
};

test('get (edit_message) from obj', () => {
  expect(funcs.getMessage(dbItemEditedMessage)).toEqual(editedMessageAnswer);
});

test('message "2 5ka" => 2', () => {
    expect(funcs.numberParser("2 5ka")).toEqual(2);
});

test('message "23123" => 23123', () => {
    expect(funcs.numberParser("23123")).toEqual(23123);
});

test('message "asdasdas 123" => NaN', () => {
    expect(funcs.numberParser("asdasdas 123")).toBeNaN();
});

test('get item text and sum (message)', () => {
    expect(funcs.messageTextParse(dbItemMessage)).toEqual({"sum": NaN, "text": "/limit"});
});

test('get item text and sum (edit_message)', () => {
    expect(funcs.messageTextParse(dbItemEditedMessage)).toEqual({"sum": 231, "text": "231 bill"});
});


test('is aaaaaaabbbbb equals aaaa', () => {
    expect(funcs.isLimiter('aaaaaaabbbbb', ['aaaa'])).toEqual(false);
});

test('is aaaa equals aaaa', () => {
    expect(funcs.isLimiter('aaaa', ['aaaa'])).toEqual(true);
});

test('is 21 equals "21"', () => {
    expect(funcs.isLimiter(21, ["21"])).toEqual(true);
});

test('is HeLlO equals hello', () => {
    expect(funcs.isLimiter('HeLlO', ["hello"])).toEqual(true);
});



test('is HeLlO equals hello', () => {
    expect(funcs.processData()).toEqual(true);
});




