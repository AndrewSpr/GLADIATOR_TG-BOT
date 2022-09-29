const TELEGRAM_API = require("node-telegram-bot-api");
const { messageTypes } = require("node-telegram-bot-api/src/telegram");
const { options } = require("nodemon/lib/config");
const { resourceLimits } = require("worker_threads");

require("dotenv").config();

const BOT = new TELEGRAM_API(process.env.TOKEN, { polling: true });

BOT.setMyCommands([
    {
        command: "/start",
        description:
          "Призывает Гладиатора для диалога",
    }
])

const startCommand = (() => {
  BOT.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const chatType = msg.chat.type;
    let characterAvailability = true;

    if (characterAvailability == false && chatType == "private") {
      await BOT.sendMessage(
        chatId,
        `Я приветствую Вас, ${msg.from.first_name}. Мое имя - Гладиатор, я - путеводитель для тех, кто решился предать себя пути воина и вступить в бесчисленное количество кровопролитных битв. Я буду помогать вам в поиске соперников, подборе и покупке снаряжения, оформлении соответствующих документов и многом другом, что Вам понадобится\n\nНе для кого не секрет, что без предварительной регистрации вашего бытия - никто не выпустит вас на поле боя. Так что, прежде чем вы приступите к вашему возвышению, будьте добры пройти эту увлекательную процедуру\n\nВведите следующую команду: гладиатор создать персонажа`
      );
    } else if (characterAvailability == true && chatType == "private") {
      await BOT.sendMessage(
        chatId,
        `Я приветствую Вас, ${msg.from.first_name}. Чем могу помочь на этот раз?\n\nСписок доступных команд:`
      );
    } else {
      await BOT.sendMessage(
        chatId,
        `Использование этой команды доступно только в личных сообщениях`
      );
    }
  });
})();

const characterCreation = (() => {
    BOT.on('message', async (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text;
        const chatType = msg.chat.type;
        let characterAvailability = true;

        switch(chatType, text, characterAvailability) {
            case "private" && "гладиатор создать персонажа" && false:
                BOT.sendMessage(chatId, 'got it')
            break;
            case "private" && "гладиатор создать персонажа" && true:
                BOT.sendMessage(chatId, `У Вас уже есть персонаж, ${msg.from.first_name}`)
            break;
            case "supergroup" && "гладиатор создать персонажа":
                BOT.sendMessage(chatId, `Вы не можете создать персонажа здесь, это доступно только в личных сообщениях`)
            break;
        }
    })
})(); 