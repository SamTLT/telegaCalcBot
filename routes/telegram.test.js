const funcs = require("./telegram.js");
const processData = require("../utilites/process-data");

const dbItemMessage = {
  _id: "5e49519b7d0d5f0017b0deac",
  updateId: 812742820,
  data: {
    update_id: 812742820,
    message: {
      message_id: 326,
      from: {
        id: 162884870,
        is_bot: false,
        first_name: "Seamus",
        username: "JohnSmiz",
        language_code: "ru"
      },
      chat: {
        id: 162884870,
        first_name: "Seamus",
        username: "JohnSmiz",
        type: "private"
      },
      date: 1581863323,
      text: "/limit",
      entities: [{ offset: 0, length: 6, type: "bot_command" }]
    }
  },
  chatId: 162884870,
  __v: 0
};

const messageAnswer = {
  message_id: 326,
  from: {
    id: 162884870,
    is_bot: false,
    first_name: "Seamus",
    username: "JohnSmiz",
    language_code: "ru"
  },
  chat: {
    id: 162884870,
    first_name: "Seamus",
    username: "JohnSmiz",
    type: "private"
  },
  date: 1581863323,
  text: "/limit",
  entities: [{ offset: 0, length: 6, type: "bot_command" }]
};

test("get (message) from obj", () => {
  expect(processData.getMessage(dbItemMessage)).toEqual(messageAnswer);
});

const dbItemEditedMessage = {
  _id: "5e49519b7d0d5f0017b0deac",
  updateId: 812742820,
  data: {
    update_id: 812742820,
    edited_message: {
      message_id: 326,
      from: {
        id: 162884870,
        is_bot: false,
        first_name: "Seamus",
        username: "JohnSmiz",
        language_code: "ru"
      },
      chat: {
        id: 162884870,
        first_name: "Seamus",
        username: "JohnSmiz",
        type: "private"
      },
      date: 1581863323,
      text: "231 bill",
      entities: [{ offset: 0, length: 6, type: "bot_command" }]
    }
  },
  chatId: 162884870,
  __v: 0
};

const editedMessageAnswer = {
  message_id: 326,
  from: {
    id: 162884870,
    is_bot: false,
    first_name: "Seamus",
    username: "JohnSmiz",
    language_code: "ru"
  },
  chat: {
    id: 162884870,
    first_name: "Seamus",
    username: "JohnSmiz",
    type: "private"
  },
  date: 1581863323,
  text: "231 bill",
  entities: [{ offset: 0, length: 6, type: "bot_command" }]
};

test("get (edit_message) from obj", () => {
  expect(processData.getMessage(dbItemEditedMessage)).toEqual(
    editedMessageAnswer
  );
});

test('message "2 5ka" => 2', () => {
  expect(processData.numberParser("2 5ka")).toEqual(2);
});

test('message "23123" => 23123', () => {
  expect(processData.numberParser("23123")).toEqual(23123);
});

test('message "asdasdas 123" => NaN', () => {
  expect(processData.numberParser("asdasdas 123")).toBeNaN();
});

test("get item text and sum (message)", () => {
  expect(processData.messageTextParse(dbItemMessage)).toEqual({
    sum: NaN,
    text: "/limit"
  });
});

test("get item text and sum (edit_message)", () => {
  expect(processData.messageTextParse(dbItemEditedMessage)).toEqual({
    sum: 231,
    text: "231 bill"
  });
});

test("is aaaaaaabbbbb equals aaaa", () => {
  expect(processData.isLimiter("aaaaaaabbbbb", ["aaaa"])).toEqual(false);
});

test("is aaaa equals aaaa", () => {
  expect(processData.isLimiter("aaaa", ["aaaa"])).toEqual(true);
});

test('is 21 equals "21"', () => {
  expect(processData.isLimiter(21, ["21"])).toEqual(true);
});

test("is HeLlO equals hello", () => {
  expect(processData.isLimiter("HeLlO", ["hello"])).toEqual(true);
});

const dbChat = [
  {
    _id: "5e49519b7d0d5f0017b0deac",
    updateId: 812742820,
    data: {
      update_id: 812742820,
      message: {
        message_id: 326,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1581863323,
        text: "/limit",
        entities: [{ offset: 0, length: 6, type: "bot_command" }]
      }
    },
    chatId: 162884870,
    __v: 0
  },
  {
    _id: "5e4951a17d0d5f0017b0dead",
    updateId: 812742821,
    data: {
      update_id: 812742821,
      message: {
        message_id: 328,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1581863329,
        text: "12"
      }
    },
    chatId: 162884870,
    __v: 0
  },
  {
    _id: "5e4952227d0d5f0017b0deae",
    updateId: 812742822,
    data: {
      update_id: 812742822,
      message: {
        message_id: 330,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1581863458,
        text: "35"
      }
    },
    chatId: 162884870,
    __v: 0
  },
  {
    _id: "5e4952267d0d5f0017b0deaf",
    updateId: 812742823,
    data: {
      update_id: 812742823,
      message: {
        message_id: 332,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1581863462,
        text: "98"
      }
    },
    chatId: 162884870,
    __v: 0
  },
  {
    _id: "5e4952297d0d5f0017b0deb0",
    updateId: 812742824,
    data: {
      update_id: 812742824,
      message: {
        message_id: 334,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1581863465,
        text: "/limit",
        entities: [{ offset: 0, length: 6, type: "bot_command" }]
      }
    },
    chatId: 162884870,
    __v: 0
  },
  {
    _id: "5e4952bbe8ffe4001757a864",
    updateId: 812742825,
    data: {
      update_id: 812742825,
      message: {
        message_id: 336,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1581863609,
        text: "12"
      }
    },
    chatId: 162884870,
    __v: 0
  },
  {
    _id: "5e4952c7e8ffe4001757a865",
    updateId: 812742826,
    data: {
      update_id: 812742826,
      message: {
        message_id: 338,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1581863623,
        text: "145 кот"
      }
    },
    chatId: 162884870,
    __v: 0
  },
  {
    _id: "5e49612734fffd0017f98ac2",
    updateId: 812742827,
    data: {
      update_id: 812742827,
      message: {
        message_id: 340,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1581867297,
        text: "Ghhf"
      }
    },
    chatId: 162884870,
    __v: 0
  },
  {
    _id: "5e49613034fffd0017f98ac3",
    updateId: 812742828,
    data: {
      update_id: 812742828,
      message: {
        message_id: 342,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1581867312,
        text: "2"
      }
    },
    chatId: 162884870,
    __v: 0
  },
  {
    _id: "5e49e07e24338c0017b753a4",
    updateId: 812742829,
    data: {
      update_id: 812742829,
      message: {
        message_id: 344,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1581899895,
        text: "12"
      }
    },
    chatId: 162884870,
    __v: 0
  },
  {
    _id: "5e49e08624338c0017b753a5",
    updateId: 812742830,
    data: {
      update_id: 812742830,
      message: {
        message_id: 346,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1581899910,
        text: "2"
      }
    },
    chatId: 162884870,
    __v: 0
  },
  {
    _id: "5e49e08b24338c0017b753a6",
    updateId: 812742831,
    data: {
      update_id: 812742831,
      message: {
        message_id: 348,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1581899915,
        text: "43"
      }
    },
    chatId: 162884870,
    __v: 0
  },
  {
    _id: "5e49e09124338c0017b753a7",
    updateId: 812742832,
    data: {
      update_id: 812742832,
      message: {
        message_id: 350,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1581899921,
        text: "/limit",
        entities: [{ offset: 0, length: 6, type: "bot_command" }]
      }
    },
    chatId: 162884870,
    __v: 0
  },
  {
    _id: "5e49e09624338c0017b753a8",
    updateId: 812742833,
    data: {
      update_id: 812742833,
      message: {
        message_id: 352,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1581899926,
        text: "21"
      }
    },
    chatId: 162884870,
    __v: 0
  },
  {
    _id: "5e4a157219856b001707c736",
    updateId: 812742834,
    data: {
      update_id: 812742834,
      message: {
        message_id: 354,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1581913451,
        text: "1 тест"
      }
    },
    chatId: 162884870,
    __v: 0
  },
  {
    _id: "5e4a318170cfd00017411d1d",
    updateId: 812742835,
    data: {
      update_id: 812742835,
      message: {
        message_id: 356,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1581920634,
        text: "/limit",
        entities: [{ offset: 0, length: 6, type: "bot_command" }]
      }
    },
    chatId: 162884870,
    __v: 0
  },
  {
    _id: "5e4a318470cfd00017411d1e",
    updateId: 812742836,
    data: {
      update_id: 812742836,
      message: {
        message_id: 358,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1581920644,
        text: "12"
      }
    },
    chatId: 162884870,
    __v: 0
  },
  {
    _id: "5e4a318f70cfd00017411d1f",
    updateId: 812742837,
    data: {
      update_id: 812742837,
      message: {
        message_id: 360,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1581920655,
        text: "52 за дерьмовый хлеб"
      }
    },
    chatId: 162884870,
    __v: 0
  },
  {
    _id: "5e4ade52de08b30017b7d9c1",
    updateId: 812742838,
    data: {
      update_id: 812742838,
      message: {
        message_id: 362,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1581964881,
        text: "12312"
      }
    },
    chatId: 162884870,
    __v: 0
  },
  {
    _id: "5e4adf495f469200178e832a",
    updateId: 812742839,
    data: {
      update_id: 812742839,
      message: {
        message_id: 363,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1581965128,
        text: "44"
      }
    },
    chatId: 162884870,
    __v: 0
  },
  {
    _id: "5e4ae0224008320017619e07",
    updateId: 812742840,
    data: {
      update_id: 812742840,
      message: {
        message_id: 373,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1581965342,
        text: "45"
      }
    },
    chatId: 162884870,
    __v: 0
  },
  {
    _id: "5e4ae0254008320017619e08",
    updateId: 812742841,
    data: {
      update_id: 812742841,
      message: {
        message_id: 375,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1581965349,
        text: "0"
      }
    },
    chatId: 162884870,
    __v: 0
  },
  {
    _id: "5e4ae0284008320017619e09",
    updateId: 812742842,
    data: {
      update_id: 812742842,
      message: {
        message_id: 377,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1581965352,
        text: "/limit",
        entities: [{ offset: 0, length: 6, type: "bot_command" }]
      }
    },
    chatId: 162884870,
    __v: 0
  },
  {
    _id: "5e4ae02b4008320017619e0a",
    updateId: 812742843,
    data: {
      update_id: 812742843,
      message: {
        message_id: 379,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1581965354,
        text: "123"
      }
    },
    chatId: 162884870,
    __v: 0
  },
  {
    _id: "5e4ae02d4008320017619e0b",
    updateId: 812742844,
    data: {
      update_id: 812742844,
      message: {
        message_id: 381,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1581965357,
        text: "10"
      }
    },
    chatId: 162884870,
    __v: 0
  },
  {
    _id: "5e4d7a338d09f40017450b89",
    updateId: 812742845,
    data: {
      update_id: 812742845,
      message: {
        message_id: 383,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1582135852,
        text: "Тест"
      }
    },
    chatId: 162884870,
    __v: 0
  },
  {
    _id: "5e4d7a398d09f40017450b8a",
    updateId: 812742846,
    data: {
      update_id: 812742846,
      message: {
        message_id: 385,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1582135865,
        text: "12"
      }
    },
    chatId: 162884870,
    __v: 0
  },
  {
    _id: "5e4dbc750a6cb700177fbefa",
    updateId: 812742851,
    data: {
      update_id: 812742851,
      message: {
        message_id: 391,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1582152798,
        text: "12"
      }
    },
    chatId: 162884870,
    __v: 0
  },
  {
    _id: "5e4ec5fab97d4c0017d69060",
    updateId: 812742858,
    data: {
      update_id: 812742858,
      message: {
        message_id: 406,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1582220782,
        text: "Ово"
      }
    },
    chatId: 162884870,
    __v: 0
  },
  {
    _id: "5e4ec61cb97d4c0017d69061",
    updateId: 812742859,
    data: {
      update_id: 812742859,
      message: {
        message_id: 408,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1582220828,
        text: "12"
      }
    },
    chatId: 162884870,
    __v: 0
  },
  {
    _id: "5e4ecc8fb97d4c0017d69062",
    updateId: 812742860,
    data: {
      update_id: 812742860,
      message: {
        message_id: 410,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1582222478,
        text: "12"
      }
    },
    chatId: 162884870,
    __v: 0
  }
];

const itemChatWithBot = {
  _id: "5e4ec61cb97d4c0017d69061",
  updateId: 812742859,
  data: {
    update_id: 812742859,
    message: {
      message_id: 408,
      from: {
        id: 162884870,
        is_bot: false,
        first_name: "Seamus",
        username: "JohnSmiz",
        language_code: "ru"
      },
      chat: {
        id: 162884870,
        first_name: "Seamus",
        username: "JohnSmiz",
        type: "private"
      },
      date: 1582220828,
      text: "12"
    }
  },
  chatId: 162884870,
  __v: 0
};

const resultChat = {
  usersFees: [["JohnSmiz", 181]],
  lastMessage: { message: { text: "12", sum: 12 }, username: "JohnSmiz" },
  date: "21:49 17.02.2020"
};

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

test("New message by Seamus chat with bot (processData)", () => {
  expect(processData.processData(itemChatWithBot, dbChat, LIMITERS)).toEqual(
    resultChat
  );
});

const itemChatWithBotLimiter = {
  _id: "5e4ec61cb97d4c0017d69061",
  updateId: 812742859,
  data: {
    update_id: 812742859,
    message: {
      message_id: 408,
      from: {
        id: 162884870,
        is_bot: false,
        first_name: "Seamus",
        username: "JohnSmiz",
        language_code: "ru"
      },
      chat: {
        id: 162884870,
        first_name: "Seamus",
        username: "JohnSmiz",
        type: "private"
      },
      date: 1582220828,
      text: "/limit"
    }
  },
  chatId: 162884870,
  __v: 0
};

const resultWithoutLimiters = {
  error:
    "Ограничитель не установлен. Для установки ограничителя введите команду /limit"
};

const resultIfItIsLimiter = {
  isLimiter: true
};

test("Set limiter by Seamus chat with bot (processData)", () => {
  expect(
    processData.processData(itemChatWithBotLimiter, dbChat, LIMITERS)
  ).toEqual(resultIfItIsLimiter);
});

test("New message by Seamus chat with bot (processData) without limiters", () => {
  expect(
    processData.processData(itemChatWithBot, dbChat, [
      "u94fnsefj98sejfsjef8sjfs8ejfs"
    ])
  ).toEqual(resultWithoutLimiters);
});

const dbGroupChat = [
  {
    _id: "5e4dbc190a6cb700177fbef6",
    updateId: 812742847,
    data: {
      update_id: 812742847,
      message: {
        message_id: 387,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: -303247171,
          title: "Запросы",
          type: "group",
          all_members_are_administrators: false
        },
        date: 1582152720,
        new_chat_participant: {
          id: 962736852,
          is_bot: true,
          first_name: "zaprosCalc",
          username: "ZaprosCalcBot"
        },
        new_chat_member: {
          id: 962736852,
          is_bot: true,
          first_name: "zaprosCalc",
          username: "ZaprosCalcBot"
        },
        new_chat_members: [
          {
            id: 962736852,
            is_bot: true,
            first_name: "zaprosCalc",
            username: "ZaprosCalcBot"
          }
        ]
      }
    },
    chatId: -303247171,
    __v: 0
  },
  {
    _id: "5e4dbc370a6cb700177fbef7",
    updateId: 812742849,
    data: {
      update_id: 812742849,
      message: {
        message_id: 389,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: -303247171,
          title: "Запросы",
          type: "group",
          all_members_are_administrators: false
        },
        date: 1582152741,
        text: "/limit@ZaprosCalcBot",
        entities: [{ offset: 0, length: 20, type: "bot_command" }]
      }
    },
    chatId: -303247171,
    __v: 0
  },
  {
    _id: "5e4dbc560a6cb700177fbef8",
    updateId: 812742848,
    data: {
      update_id: 812742848,
      message: {
        message_id: 388,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: -303247171,
          title: "Запросы",
          type: "group",
          all_members_are_administrators: false
        },
        date: 1582152728,
        text: "/limit@ZaprosCalcBot",
        entities: [{ offset: 0, length: 20, type: "bot_command" }]
      }
    },
    chatId: -303247171,
    __v: 0
  },
  {
    _id: "5e4dbc740a6cb700177fbef9",
    updateId: 812742850,
    data: {
      update_id: 812742850,
      message: {
        message_id: 390,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: -303247171,
          title: "Запросы",
          type: "group",
          all_members_are_administrators: false
        },
        date: 1582152754,
        text: "/limit",
        entities: [{ offset: 0, length: 6, type: "bot_command" }]
      }
    },
    chatId: -303247171,
    __v: 0
  },
  {
    _id: "5e4dbc8c0a6cb700177fbefb",
    updateId: 812742852,
    data: {
      update_id: 812742852,
      message: {
        message_id: 394,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: -303247171,
          title: "Запросы",
          type: "group",
          all_members_are_administrators: false
        },
        date: 1582152843,
        text: "3171 пупс должен"
      }
    },
    chatId: -303247171,
    __v: 0
  },
  {
    _id: "5e4dbcf20a6cb700177fbefc",
    updateId: 812742853,
    data: {
      update_id: 812742853,
      message: {
        message_id: 396,
        from: {
          id: 335103282,
          is_bot: false,
          first_name: "Tatianа",
          username: "TatianaKuv"
        },
        chat: {
          id: -303247171,
          title: "Запросы",
          type: "group",
          all_members_are_administrators: false
        },
        date: 1582152945,
        text: "0"
      }
    },
    chatId: -303247171,
    __v: 0
  },
  {
    _id: "5e4dbd0f0a6cb700177fbefd",
    updateId: 812742854,
    data: {
      update_id: 812742854,
      message: {
        message_id: 398,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: -303247171,
          title: "Запросы",
          type: "group",
          all_members_are_administrators: false
        },
        date: 1582152975,
        text: "0"
      }
    },
    chatId: -303247171,
    __v: 0
  },
  {
    _id: "5e4dbd3c0a6cb700177fbefe",
    updateId: 812742855,
    data: {
      update_id: 812742855,
      message: {
        message_id: 400,
        from: {
          id: 335103282,
          is_bot: false,
          first_name: "Tatianа",
          username: "TatianaKuv"
        },
        chat: {
          id: -303247171,
          title: "Запросы",
          type: "group",
          all_members_are_administrators: false
        },
        date: 1582153020,
        text: "1. Прррр"
      }
    },
    chatId: -303247171,
    __v: 0
  },
  {
    _id: "5e4dbd440a6cb700177fbeff",
    updateId: 812742856,
    data: {
      update_id: 812742856,
      message: {
        message_id: 402,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: -303247171,
          title: "Запросы",
          type: "group",
          all_members_are_administrators: false
        },
        date: 1582153028,
        text: "1 тест"
      }
    },
    chatId: -303247171,
    __v: 0
  },
  {
    _id: "5e4eb9b5fc3ac70017dbc03d",
    updateId: 812742857,
    data: {
      update_id: 812742857,
      message: {
        message_id: 404,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: -303247171,
          title: "Запросы",
          type: "group",
          all_members_are_administrators: false
        },
        date: 1582217646,
        text: "3000 тинек"
      }
    },
    chatId: -303247171,
    __v: 0
  }
];

const itemGroup = {
  _id: "5e4eb9b5fc3ac70017dbc03d",
  updateId: 812742857,
  data: {
    update_id: 812742857,
    message: {
      message_id: 404,
      from: {
        id: 162884870,
        is_bot: false,
        first_name: "Seamus",
        username: "JohnSmiz",
        language_code: "ru"
      },
      chat: {
        id: -303247171,
        title: "Запросы",
        type: "group",
        all_members_are_administrators: false
      },
      date: 1582217646,
      text: "3000 тинек"
    }
  },
  chatId: -303247171,
  __v: 0
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
  date: "01:52 20.02.2020"
};

test("Set limiter by Seamus group chat (processData)", () => {
  expect(
    processData.processData(itemChatWithBotLimiter, dbGroupChat, LIMITERS)
  ).toEqual(resultIfItIsLimiter);
});

test("New message by Seamus in group chat (processData)", () => {
  expect(processData.processData(itemGroup, dbGroupChat, LIMITERS)).toEqual(
    resultGroup
  );
});

test("New message by Seamus in group chat (processData) without limiters", () => {
  expect(
    processData.processData(itemGroup, dbGroupChat, [
      "asiodhaosiudhaisuogdioaushdioash"
    ])
  ).toEqual(resultWithoutLimiters);
});

test("Result message set limiter", () => {
  expect(funcs.resultMessage(resultWithoutLimiters)).toEqual(
    resultWithoutLimiters.error
  );
});

const resultMessageBot =
  "Начало отсчета: 21:49 17.02.2020\n<b>JohnSmiz оплатил(а) 12 руб.</b>\n\nРасходы:\nJohnSmiz: 181 руб.\n";

test("Result message in bot chat", () => {
  expect(funcs.resultMessage(resultChat)).toBe(resultMessageBot);
});

test("Result message in bot chat (without limmiter)", () => {
  expect(funcs.resultMessage(resultWithoutLimiters)).toBe(
    resultWithoutLimiters.error
  );
});

const resultMessageGroup = `Начало отсчета: 01:52 20.02.2020
<b>JohnSmiz оплатил(а) 3000 руб.</b>

Расходы:
JohnSmiz: 6172 руб.
TatianaKuv: 1 руб.

<b>TatianaKuv</b> должен(а): 
6172 - 1 = <b>6171 руб.</b>`;

test("Result message in group chat", () => {
  expect(funcs.resultMessage(resultGroup)).toBe(resultMessageGroup);
});

test("Result message in group chat (without limiter)", () => {
  expect(funcs.resultMessage(resultWithoutLimiters)).toBe(
    resultWithoutLimiters.error
  );
});

const editedMessages = [
  {
    _id: "5e510354bd3abe0017b1a8c4",
    updateId: 812742917,
    data: {
      update_id: 812742917,
      edited_message: {
        message_id: 542,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1582367564,
        edit_date: 1582367572,
        text: "123 hjd"
      }
    },
    chatId: 162884870,
    __v: 0
  },
  {
    _id: "5e51035abd3abe0017b1a8c5",
    updateId: 812742918,
    data: {
      update_id: 812742918,
      edited_message: {
        message_id: 542,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1582367564,
        edit_date: 1582367578,
        text: "123 hjdjjsk"
      }
    },
    chatId: 162884870,
    __v: 0
  },
  {
    _id: "5e510506bd3abe0017b1a8c6",
    updateId: 812742919,
    data: {
      update_id: 812742919,
      edited_message: {
        message_id: 544,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1582367566,
        edit_date: 1582368006,
        text: "672 jdkkkd"
      }
    },
    chatId: 162884870,
    __v: 0
  },
  {
    _id: "5e510510bd3abe0017b1a8c8",
    updateId: 812742921,
    data: {
      update_id: 812742921,
      edited_message: {
        message_id: 549,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1582368010,
        edit_date: 1582368015,
        text: "Jjdjjdjjejdjdj"
      }
    },
    chatId: 162884870,
    __v: 0
  },
  {
    _id: "5e510514bd3abe0017b1a8c9",
    updateId: 812742922,
    data: {
      update_id: 812742922,
      edited_message: {
        message_id: 549,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1582368010,
        edit_date: 1582368019,
        text: "Jjdjjdjjejdjdjhshhshd"
      }
    },
    chatId: 162884870,
    __v: 0
  },
  {
    _id: "5e51051dbd3abe0017b1a8ca",
    updateId: 812742923,
    data: {
      update_id: 812742923,
      edited_message: {
        message_id: 549,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1582368010,
        edit_date: 1582368028,
        text: "212"
      }
    },
    chatId: 162884870,
    __v: 0
  }
];

const filteredEditedMessages = [
  {
    _id: "5e51035abd3abe0017b1a8c5",
    updateId: 812742918,
    data: {
      update_id: 812742918,
      edited_message: {
        message_id: 542,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1582367564,
        edit_date: 1582367578,
        text: "123 hjdjjsk"
      }
    },
    chatId: 162884870,
    __v: 0
  },
  {
    _id: "5e510506bd3abe0017b1a8c6",
    updateId: 812742919,
    data: {
      update_id: 812742919,
      edited_message: {
        message_id: 544,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1582367566,
        edit_date: 1582368006,
        text: "672 jdkkkd"
      }
    },
    chatId: 162884870,
    __v: 0
  },
  {
    _id: "5e51051dbd3abe0017b1a8ca",
    updateId: 812742923,
    data: {
      update_id: 812742923,
      edited_message: {
        message_id: 549,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1582368010,
        edit_date: 1582368028,
        text: "212"
      }
    },
    chatId: 162884870,
    __v: 0
  }
];

test("getLastEditedMessages", () => {
  expect(processData.getLastEditedMessages(editedMessages)).toEqual(
    filteredEditedMessages
  );
});

dataDB = [
  {
    _id: "5e510342bd3abe0017b1a8bf",
    updateId: 812742912,
    data: {
      update_id: 812742912,
      message: {
        message_id: 536,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1582367554,
        text: "Kdkr"
      }
    },
    chatId: 162884870,
    __v: 0
  },
  {
    _id: "5e510345bd3abe0017b1a8c0",
    updateId: 812742913,
    data: {
      update_id: 812742913,
      message: {
        message_id: 538,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1582367557,
        text: "/limit",
        entities: [{ offset: 0, length: 6, type: "bot_command" }]
      }
    },
    chatId: 162884870,
    __v: 0
  },
  {
    _id: "5e510348bd3abe0017b1a8c1",
    updateId: 812742914,
    data: {
      update_id: 812742914,
      message: {
        message_id: 540,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1582367560,
        text: "Kdkdkd"
      }
    },
    chatId: 162884870,
    __v: 0
  },
  {
    _id: "5e51034cbd3abe0017b1a8c2",
    updateId: 812742915,
    data: {
      update_id: 812742915,
      message: {
        message_id: 542,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1582367564,
        text: "123"
      }
    },
    chatId: 162884870,
    __v: 0
  },
  {
    _id: "5e51034fbd3abe0017b1a8c3",
    updateId: 812742916,
    data: {
      update_id: 812742916,
      message: {
        message_id: 544,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1582367566,
        text: "672"
      }
    },
    chatId: 162884870,
    __v: 0
  },
  {
    _id: "5e510354bd3abe0017b1a8c4",
    updateId: 812742917,
    data: {
      update_id: 812742917,
      edited_message: {
        message_id: 542,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1582367564,
        edit_date: 1582367572,
        text: "123 hjd"
      }
    },
    chatId: 162884870,
    __v: 0
  },
  {
    _id: "5e51035abd3abe0017b1a8c5",
    updateId: 812742918,
    data: {
      update_id: 812742918,
      edited_message: {
        message_id: 542,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1582367564,
        edit_date: 1582367578,
        text: "123 hjdjjsk"
      }
    },
    chatId: 162884870,
    __v: 0
  },
  {
    _id: "5e510506bd3abe0017b1a8c6",
    updateId: 812742919,
    data: {
      update_id: 812742919,
      edited_message: {
        message_id: 544,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1582367566,
        edit_date: 1582368006,
        text: "672 jdkkkd"
      }
    },
    chatId: 162884870,
    __v: 0
  },
  {
    _id: "5e51050abd3abe0017b1a8c7",
    updateId: 812742920,
    data: {
      update_id: 812742920,
      message: {
        message_id: 549,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1582368010,
        text: "Jjdjjd"
      }
    },
    chatId: 162884870,
    __v: 0
  },
  {
    _id: "5e510510bd3abe0017b1a8c8",
    updateId: 812742921,
    data: {
      update_id: 812742921,
      edited_message: {
        message_id: 549,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1582368010,
        edit_date: 1582368015,
        text: "Jjdjjdjjejdjdj"
      }
    },
    chatId: 162884870,
    __v: 0
  },
  {
    _id: "5e510514bd3abe0017b1a8c9",
    updateId: 812742922,
    data: {
      update_id: 812742922,
      edited_message: {
        message_id: 549,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1582368010,
        edit_date: 1582368019,
        text: "Jjdjjdjjejdjdjhshhshd"
      }
    },
    chatId: 162884870,
    __v: 0
  },
  {
    _id: "5e51051dbd3abe0017b1a8ca",
    updateId: 812742923,
    data: {
      update_id: 812742923,
      edited_message: {
        message_id: 549,
        from: {
          id: 162884870,
          is_bot: false,
          first_name: "Seamus",
          username: "JohnSmiz",
          language_code: "ru"
        },
        chat: {
          id: 162884870,
          first_name: "Seamus",
          username: "JohnSmiz",
          type: "private"
        },
        date: 1582368010,
        edit_date: 1582368028,
        text: "212"
      }
    },
    chatId: 162884870,
    __v: 0
  }
];
