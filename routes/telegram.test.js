const funcs = require("./telegram.js");

const resultChat = {
  usersFees: [["JohnSmiz", 181]],
  lastMessage: { message: { text: "12", sum: 12 }, username: "JohnSmiz" },
  date: "21:49 17.02.2020"
};

const resultWithoutLimiters = {
  error:
    "Ограничитель не установлен. Для установки ограничителя введите команду /limit"
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
