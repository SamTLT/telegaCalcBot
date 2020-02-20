const express = require("express");
const router = express.Router();
const TelegaDB = require("../models/TelegramDB");

const axios = require("axios");

const API_URL = "https://api.telegram.org/bot";
const TOKEN = process.env.TELEGRAM_TOKEN;
const LIMITERS = [
  "————",
  "—————",
  "——————",
  "———————",
  "————————",
  "—————————",
  "----",
  "-----",
  "------",
  "-------",
  "--------",
  "---------",
  "---------",
  "-----------",
  "/limit"
];

const getMessage = item => {
  let message = item.data.message;
  if (!message) {
    message = item.data.edited_message;
  }
  return message;
};

const numberParser = text => {
  return Number(text.split(" ")[0]);
};

const messageTextParse = item => {
  return {
    text: getMessage(item).text,
    sum: numberParser(getMessage(item).text)
  };
};

const isLimiter = (text, arrOfSubstrings) => {
  const filter = arrOfSubstrings.filter(
    item => item.toString().toLowerCase() === text.toString().toLowerCase()
  );
  if (filter.length > 0) {
    return true;
  }
  return false;
};

const processData = (item, dataDB) => {
  const getOrigMessages = dataDB.filter(item => {
    const message = item.data.message;
    if (message) {
      // kill reposts
      if (!message.forward_date) {
        return true;
      }
    }
    return false;
  });

  const getEditedMessages = dataDB.filter(item => {
    const message = item.data.edited_message;
    if (message) {
      // kill reposts
      if (!message.forward_date) {
        return true;
      }
    }
    return false;
  });

  const filteredEditedMessages = getEditedMessages.reduce((accum, item) => {
    if (accum.length === 0) {
      accum.push(item);
    }

    accum.forEach((accumed, i) => {
      const accMsgId = accumed.data.edited_message.message_id;
      const accChatId = accumed.data.edited_message.chat.id;
      const accEditDate = accumed.data.edited_message.edit_date;

      const curMsgId = item.data.edited_message.message_id;
      const curChatId = item.data.edited_message.chat.id;
      const curEditDate = item.data.edited_message.edit_date;

      if (
        accMsgId === curMsgId &&
        accChatId === curChatId &&
        curEditDate > accEditDate
      ) {
        accum[i] = item;
      } else if (
        accMsgId === curMsgId &&
        accChatId === curChatId &&
        curEditDate <= accEditDate
      ) {
      } else {
        const filteredAccum = accum.filter(item => {
          if (
            item.data.edited_message.message_id === curMsgId &&
            item.data.edited_message.chat.id === curChatId
          ) {
            return true;
          }
          return false;
        });

        if (filteredAccum.length === 0) {
          accum.push(item);
        }
      }
    });

    return accum;
  }, []);

  const mergeOrigAndEdited = getOrigMessages.map(orig => {
    filteredEditedMessages.forEach(edit => {
      const origMsgId = orig.data.message.message_id;
      const origChatId = orig.data.message.chat.id;
      const origDate = orig.data.message.date;

      const editMsgId = edit.data.edited_message.message_id;
      const editChatId = edit.data.edited_message.chat.id;
      const editEditDate = edit.data.edited_message.edit_date;

      if (
        origMsgId === editMsgId &&
        origChatId === editChatId &&
        editEditDate > origDate
      ) {
        orig.data.message = edit.data.edited_message;
      }
    });
    return orig;
  });

  const limiterItem = mergeOrigAndEdited.filter(item => {
    const message = item.data.message;
    if (message && message.text && isLimiter(message.text, LIMITERS)) {
      return true;
    }
    return false;
  });

  const limiterDate = limiterItem.reduce((accum, item) => {
    if (item.data.message.date > accum.data.message.date) {
      return item;
    }
    return accum;
  }).data.message.date;

  const filteredData = mergeOrigAndEdited.filter(
    item => item.data.message.date > limiterDate
  );

  // check is limiter last?
  if (filteredData.length === 0) {
    return {
      lastMessage: {
        message: messageTextParse(item),
        username: getMessage(item).chat.username
      },
      date: unixTimeToString(limiterDate),
      isLimiter: true
    };
  }

  const usersData = filteredData.reduce((accum, item) => {
    const user = item.data.message.from.username;
    if (!accum[user]) {
      accum[user] = [item];
    } else {
      accum[user].push(item);
    }
    return accum;
  }, {});

  const usersFees = Object.entries(usersData).map(user => {
    return [
      user[0],
      user[1].reduce((sum, item) => {
        const num = numberParser(item.data.message.text);
        if (!Number.isNaN(num)) {
          return sum + num;
        }
        return sum;
      }, 0)
    ];
  });

  return {
    usersFees,
    lastMessage: {
      message: messageTextParse(item),
      username: getMessage(item).from.username
    },
    date: unixTimeToString(limiterDate)
  };
};

const sendMessage = async (chatId, text) => {
  return axios.get(
    API_URL +
      TOKEN +
      `/sendMessage?parse_mode=HTML&chat_id=${chatId}&text=${encodeURI(text)}`
  );
};

const summaryMsg = (a, b) => {
  return `<b>${a[0]}</b> должен(а): 
${b[1]} - ${a[1]} = <b>${b[1] - a[1]} руб.</b>`;
};

const unixTimeToString = unixTime => {
  const checkZero = data => {
    if (data < 10) {
      data = "0" + data;
    }
    return data;
  };

  let today = new Date(unixTime * 1000);
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  let hour = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();

  day = checkZero(day);
  month = checkZero(month);
  year = checkZero(year);
  hour = checkZero(hour);
  minutes = checkZero(minutes);
  seconds = checkZero(seconds);

  return `${hour}:${minutes}:${seconds} ${day}.${month}.${year}`;
};

const resultMessage = props => {
  const { usersFees, lastMessage, date, isLimiter } = props;

  if (isLimiter) {
    return "Готово. Оплаты будут считаться с этого момента";
  }

  if (usersFees.length > 2) {
    return `Поддерживается максимум 2 пользователя`;
  }

  //   const title = `Начало отсчета: ${date}
  // Сообщение: <i>${lastMessage.message.text}</i>

  const title = `Начало отсчета: ${date}
${
  Number.isNaN(lastMessage.message.sum)
    ? `Сумма не распознана`
    : `<b>${lastMessage.username} оплатил(а) ${lastMessage.message.sum} руб.</b>\n`
}
`;

  const data = usersFees.map(user => {
    return `${user[0]}: ${user[1]} руб.`;
  });

  const body = `Расходы:\n${data.join("\n")}\n`;

  if (usersFees.length === 1) {
    return title + body;
  }

  if (usersFees.length === 2) {
    const user0SpentMore = usersFees[0][1] > usersFees[1][1];
    let summary = summaryMsg(usersFees[1], usersFees[0]);

    if (!user0SpentMore) {
      summary = summaryMsg(usersFees[0], usersFees[1]);
    }
    return title + body + "\n" + summary;
  }
};

router.get("/", (req, res) => {
  const resultChat = {
    usersFees: [["JohnSmiz", 181]],
    lastMessage: { message: { text: "12", sum: 12 }, username: "JohnSmiz" },
    date: "21:49:12 17.02.2020"
  };

  const resultGroup = {
    usersFees: [
      ["JohnSmiz", 6172],
      ["TatianaKuv", 1]
    ],
    lastMessage: {
      message: { text: "3000 тинек", sum: 3000 },
      username: "JohnSmiz"
    },
    date: "01:52:34 20.02.2020"
  };

  // sendMessage(162884870, resultMessage(resultChat));
  // sendMessage(162884870, resultMessage(resultGroup));
  res.send("Home Page");
});

router.get("/" + TOKEN, async (req, res) => {
  const telegaDbFull = await TelegaDB.find({ chatId: -303247171 });
  res.status(200).json(telegaDbFull);
});

router.post("/" + TOKEN, async (req, res) => {
  const result = req.body;
  if (result) {
    const telegaDataNew = [result].map(item => {
      let chatId;
      if (item.message) {
        chatId = item.message.chat.id;
      }

      if (item.edited_message) {
        chatId = item.edited_message.chat.id;
      }

      return {
        updateId: item.update_id,
        data: item,
        chatId
      };
    });

    const sendedMessages = [];
    const telegaDbFull = await TelegaDB.find();

    for (const item of telegaDataNew) {
      const rowDB = telegaDbFull.filter(row => row.updateId === item.updateId);
      if (rowDB.length === 0) {
        const telegaDB = new TelegaDB(item);
        const savedData = await telegaDB.save();
        const dataDB = await TelegaDB.find({ chatId: item.chatId });
        const processedData = processData(savedData, dataDB);
        const messageToShow = resultMessage(processedData);
        sendMessage(item.chatId, messageToShow);
        sendedMessages.push(messageToShow);
      }
    }

    try {
      if (sendedMessages.length === 0) {
        res.status(200).json("No new updates");
      } else {
        res.status(200).json(sendedMessages);
      }
    } catch (err) {
      res.status(502).json(err);
    }
  } else {
    res.status(200).json("No updates");
  }
});

module.exports = {
  router,
  getMessage,
  numberParser,
  messageTextParse,
  isLimiter,
  processData,
  unixTimeToString,
  resultMessage
};
