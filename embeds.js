
function buildNewMissionEmbed (description, imageUrl) {
  //var newDescription = description.replace(/┏╋◥◣◆◢◤╋┓/g, '').replace(/┗╋◥◣◆◢◤╋┛/g, '').replace(/┏◥◣◆◢◤┓/g, '').replace(/┗◥◣◆◢◤┛/g, '');
  let newDescription = description.split('━')[0];
  
  const embed = {
    color: 0x00FF1A,
    title: '',
    url: 'https://t.me/PersianArma3',
    author: {
      name: '',
      icon_url: '',
      url: '',
    },
    description: newDescription || '',
    image: {
    url: imageUrl,
  },
      timestamp: new Date(),
        footer: {
          text: 'پیام خودکار',
            icon_url: 'https://toppng.com/uploads/preview/telegram-icon-telegram-logo-11563072765e0pl0xsrfe.png',
        },
};

return embed;  
}

