module.exports = {
    characterCreationKeyboard: {
        reply_markup: JSON.stringify({
          inline_keyboard: [
            [
              {
                text: "Создать персонажа",
                callback_data: "Start Character Creation",
              },
            ],
            [
              {
                text: "Узнать поподробнее",
                callback_data: "About",
              },
            ],
          ],
        }),
      },
      startCommandKeyboard: {
          reply_markup: JSON.stringify({
              inline_keyboard: [
                  [
                      {
                          text: "Мой персонаж",
                          callback_data: "My character"
                      }
                  ],
                  [
                      {
                        text: "Помощь",
                        callback_data: "Help"
                      }
                  ],
                  [
                      {
                          text: "Меню",
                          callback_data: "Menu"
                      }
                  ]
              ]
          })
      }
}