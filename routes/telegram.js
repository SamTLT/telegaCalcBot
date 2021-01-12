const express = require("express");
const router = express.Router();
const axios = require("axios");
const TelegaDB = require("../models/TelegramDB");
const { processData } = require("../utilites/process-data");

const API_URL = "https://api.telegram.org/bot";
const LIMITERS = ["/limit", "/limit@ZaprosCalcBot"];
const TOKEN = process.env.TELEGRAM_TOKEN;

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
let requestId = 0;
router.post("/" + TOKEN, async (req, res) => {
  requestId++;
  const result = req.body;
  console.log(`[${requestId}] POST Result:`, result);
  if (result) {
    const telegaDataNew = getTelegaDataNew(result);
    console.log(`[${requestId}] telegaDataNew:`, telegaDataNew);
    const rowsDB = await TelegaDB.find({ updateId: telegaDataNew.updateId });
    console.log(`[${requestId}] rowsDB:`, rowsDB);

    if (rowsDB.length === 0) {
      const telegaDB = new TelegaDB(telegaDataNew);
      console.log(`[${requestId}] telegaDB:`, rowsDB);
      const savedData = await telegaDB.save();
      console.log(`[${requestId}] savedData:`, savedData);
      const dataDB = await TelegaDB.find({ chatId: telegaDataNew.chatId });
      console.log(`[${requestId}] dataDB:`, dataDB);
      const processedData = processData(savedData, dataDB, LIMITERS);
      console.log(`[${requestId}] processedData:`, processedData);
      const messageToShow = resultMessage(processedData);
      console.log(`[${requestId}] messageToShow:`, messageToShow);
      await sendMessage(telegaDataNew.chatId, messageToShow);
      try {
        console.log(`[${requestId}] Successfully updated:`);
        res.status(200).json("Successfully updated");
      } catch (err) {
        console.log(`[${requestId}] Error`);
        res.status(502).json(err);
      }
    }
  } else {
    console.log(`[${requestId}] No updates:`);
    res.status(200).json("No updates");
  }
});

module.exports = {
  router,
  LIMITERS,
  resultMessage,
};
