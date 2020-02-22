const isLimiter = (text, arrOfSubstrings) => {
  const filter = arrOfSubstrings.filter(
    item => item.toString().toLowerCase() === text.toString().toLowerCase()
  );
  if (filter.length > 0) {
    return true;
  }
  return false;
};

const numberParser = text => {
  return Number(text.split(" ")[0]);
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

  day = checkZero(day);
  month = checkZero(month);
  year = checkZero(year);
  hour = checkZero(hour);
  minutes = checkZero(minutes);

  return `${hour}:${minutes} ${day}.${month}.${year}`;
};

const getMessage = item => {
  let message = item.data.message;
  if (!message) {
    message = item.data.edited_message;
  }
  return message;
};

const messageTextParse = item => {
  return {
    text: getMessage(item).text,
    sum: numberParser(getMessage(item).text)
  };
};

const getMessagesFromDb = (dataDB, type) =>
  dataDB.filter(item => {
    const message = item.data[type];
    if (message) {
      // kill reposts
      if (!message.forward_date) {
        return true;
      }
    }
    return false;
  });

const filterEditedMessages = editedMessages =>
  editedMessages.reduce((accum, item) => {
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

const mergeMessages = (origMessages, editedMessages) =>
  origMessages.map(orig => {
    editedMessages.forEach(edit => {
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

const getLimitersArr = (items, limiters) =>
  items.filter(item => {
    const message = item.data.message;
    if (message && message.text && isLimiter(message.text, limiters)) {
      return true;
    }
    return false;
  });

const getLastLimiterDate = limitersArr =>
  limitersArr.reduce((accum, item) => {
    if (item.data.message.date > accum.data.message.date) {
      return item;
    }
    return accum;
  }).data.message.date;

const getDataAfterDate = (data, limiterDate) =>
  data.filter(item => item.data.message.date > limiterDate);

const processDataReturnedObj = (item, limiterDate, usersFees) => {
  if (item && item.isLimiter === true) {
    return item;
  }

  if (!limiterDate) {
    return {
      error:
        "Ограничитель не установлен. Для установки ограничителя введите команду /limit"
    };
  }

  return {
    usersFees,
    lastMessage: {
      message: messageTextParse(item),
      username: getMessage(item).from.username
    },
    date: unixTimeToString(limiterDate)
  };
};

const getUsersData = data =>
  data.reduce((accum, item) => {
    const user = item.data.message.from.username;
    if (!accum[user]) {
      accum[user] = [item];
    } else {
      accum[user].push(item);
    }
    return accum;
  }, {});

const getUsersFees = data =>
  Object.entries(data).map(user => {
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

const processData = (item, dataDB, limiters) => {
  // checking for limiter
  if (getLimitersArr([item], limiters).length > 0) {
    return processDataReturnedObj({ isLimiter: true });
  }

  const origMessages = getMessagesFromDb(dataDB, "message");
  const editedMessages = getMessagesFromDb(dataDB, "edited_message");
  const filteredEditedMessages = filterEditedMessages(editedMessages);

  const mergeOrigAndEdited = mergeMessages(
    origMessages,
    filteredEditedMessages
  );

  const limitersArr = getLimitersArr(mergeOrigAndEdited, limiters);

  // if there is no limiter
  if (limitersArr.length === 0) {
    return processDataReturnedObj();
  }

  const limiterDate = getLastLimiterDate(limitersArr);
  const filteredData = getDataAfterDate(mergeOrigAndEdited, limiterDate);
  const usersData = getUsersData(filteredData);
  const usersFees = getUsersFees(usersData);

  return processDataReturnedObj(item, limiterDate, usersFees);
};

module.exports = {
  isLimiter,
  unixTimeToString,
  getMessage,
  messageTextParse,
  processData,
  numberParser,
  getMessagesFromDb
};
