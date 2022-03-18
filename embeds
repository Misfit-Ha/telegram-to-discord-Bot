
function buildNewMissionEmbed (description, imageUrl) {
  var newDescription = description.replace(/━/g, '').replace(/┏╋◥◣◆◢◤╋┓/g, '').replace(/┗╋◥◣◆◢◤╋┛/g, '').replace(/•/g, '');
  var newDescription = newDescription.split('💥برای')[0];
  
  const embed = {
    color: 0x00FF1A,
    title: 'پست جدید',
    url: 'https://t.me/PersianArma3',
    author: {
      name: 'Forwarded From Telegram',
      icon_url: 'https://toppng.com/uploads/preview/telegram-icon-telegram-logo-11563072765e0pl0xsrfe.png',
      url: 'https://t.me/PersianArma3',
    },
    description: newDescription || '',
    image: {
    url: imageUrl,
  },
      timestamp: new Date(),
        footer: {
          text: 'این پیغام به صورت خودکار از کانال تلگرام گرفته شده ',
            icon_url: 'https://toppng.com/uploads/preview/telegram-icon-telegram-logo-11563072765e0pl0xsrfe.png',
        },
};

return embed;  
}

      
function buildNewScreenshotEmbed (imageUrl) {
  const embed = {
    color: 0xFF001A,
    image: {
      url: imageUrl,
      timestamp: new Date(),
    },
    footer: {
      text: 'این پیغام به صورت خودکار از کانال تلگرام گرفته شده ',
      icon_url: 'https://toppng.com/uploads/preview/telegram-icon-telegram-logo-11563072765e0pl0xsrfe.png',
    },
  };
  
  return embed;  
}
