const TELEGRAM_API = require("node-telegram-bot-api");
const { messageTypes } = require("node-telegram-bot-api/src/telegram");
const { options } = require("nodemon/lib/config");
const { resourceLimits } = require("worker_threads");

const BOT = new TELEGRAM_API(process.env.TOKEN, { polling: true });

BOT.setMyCommands([
    {
        
    }
])