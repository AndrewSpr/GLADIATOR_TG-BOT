const TELEGRAM_API = require("node-telegram-bot-api");
const { messageTypes } = require("node-telegram-bot-api/src/telegram");
const { options } = require("nodemon/lib/config");
const { resourceLimits } = require("worker_threads");

require("dotenv").config();

const BOT = new TELEGRAM_API(process.env.TOKEN, { polling: true });
const CHARACTER_IS_CREATED = false;

BOT.setMyCommands([
  {
    command: "/start",
    description: "Призывает Гладиатора для диалога",
  },
]);

function temporaryCharacterConstructor(name, surname, sex, age, characterClass) {
  this.name = name
  this.surname = surname
  this.sex = sex
  this.age = age
  this.characterClass = characterClass
}

const characterCreation = (chatId) => {
  const questions = [
    "Имя вашего персонажа?",
    "Фамилия вашего персонажа?",
    "Пол вашего персонажа?",
    "Возраст вашего персонажа?",
    "Какой класc вы преподчитаете: силач, ловкач, или тактик? Если вы не ознакомлены с системой классов, то прочитайте гайд по классам"
  ]
  
  BOT.on("message", async (msg) => {

    for(let i = 0; i < questions.length; i++) {
      await BOT.sendMessage(chatId, questions[i])
    }
  })
}

const startCommand = (() => {
  BOT.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const chatType = msg.chat.type;

    const {characterCreationKeyboard, startCommandKeyboard} = require("./inlineKeyboardSettings")

    switch (true) {
      case CHARACTER_IS_CREATED == false && chatType == "private":
        await BOT.sendMessage(
          chatId,
          `Я приветствую Вас, ${msg.from.first_name}. Мое имя - Гладиатор, я - путеводитель для тех, кто решился предать себя пути воина и вступить в бесчисленное количество кровопролитных битв. Я буду помогать вам в поиске соперников, подборе и покупке снаряжения, оформлении соответствующих документов и многом другом, что Вам понадобится\n\nНе для кого не секрет, что без предварительной регистрации вашего бытия - никто не выпустит вас на поле боя. Так что, прежде чем вы приступите к вашему возвышению, будьте добры пройти эту увлекательную процедуру`, characterCreationKeyboard);
        break;
      case CHARACTER_IS_CREATED == true && chatType == "private":
        await BOT.sendMessage(
          chatId,
          `Я приветствую Вас, ${msg.from.first_name}. Чем могу помочь на этот раз?`, startCommandKeyboard
        );
        break;
      case chatType == "group" || chatType == "supergroup":
        await BOT.sendMessage(
          chatId,
          `Использование этой команды доступно только в личных сообщениях`
        );
        break;
    }
  });

  BOT.on("callback_query", async (query) => {
    const { chat, message_id } = query.message;

    switch (true) {
      case query.data === "Start Character Creation":
        characterCreation(chat.id)
      break;
      case query.data === "About":
        await BOT.sendMessage(chat.id, `Lorem ipsum`)  
      break;
    }
  });
})();
