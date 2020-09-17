const express = require("express");
const router = express.Router();
const TelegaDB = require("../models/TelegramDB");
const { processData } = require("../utilites/process-data");

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
  "/limit",
  "/limit@ZaprosCalcBot",
];

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

const resultMessage = (props) => {
  const { usersFees, lastMessage, date, isLimiter, error } = props;

  if (error) {
    return error;
  }

  if (isLimiter) {
    return "Готово. Оплаты будут считаться с этого момента";
  }

  if (usersFees.length > 2) {
    return `Поддерживается максимум 2 пользователя`;
  }

  if (Number.isNaN(lastMessage.message.sum)) {
    return "Сумма не распознана";
  }

  const title = `Начало отсчета: ${date}
${`<b>${lastMessage.username} оплатил(а) ${lastMessage.message.sum} руб.</b>\n`}
`;

  const data = usersFees.map((user) => {
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

const getTelegaDataNew = (item) => {
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
    chatId,
  };
};

router.get("/", (req, res) => {
  res.redirect("https://github.com/SamTLT/telegaCalcBot");
});

// show DB on page
// router.get("/", async (req, res) => {
//   const telegaDbFull = await TelegaDB.find();
//   // const telegaDbFull = await TelegaDB.find({ chatId: -303247171 });
//   // const telegaDbFull = await TelegaDB.find({ chatId: 162884870 });

//   res.status(200).json(telegaDbFull);
// });

router.post("/" + TOKEN, async (req, res) => {
  const result = req.body;
  if (result) {
    const telegaDataNew = getTelegaDataNew(result);
    const rowsDB = await TelegaDB.find({ updateId: telegaDataNew.updateId });

    if (rowsDB.length === 0) {
      const telegaDB = new TelegaDB(telegaDataNew);
      const savedData = await telegaDB.save();
      const dataDB = await TelegaDB.find({ chatId: telegaDataNew.chatId });
      const processedData = processData(savedData, dataDB, LIMITERS);
      const messageToShow = resultMessage(processedData);
      sendMessage(telegaDataNew.chatId, messageToShow);
      try {
        res.status(200).json("Successfully updated");
      } catch (err) {
        res.status(502).json(err);
      }
    }
  } else {
    res.status(200).json("No updates");
  }
});

module.exports = {
  router,
  LIMITERS,
  resultMessage,
};
