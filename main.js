const DISCORD_ANNOUNCEMENTS_URL = 'https://discord.com/api/webhooks/3123954449835023560744/19u3_Si7Kt34yblgywe-tyXkRyE0ssadap38iVr4pWadOq-XdR7lTwZ6GFQqMW5WKJD';
const DISCORD_PICTURES_URL = 'https://discord.com/api/webhooks/954450212603166721/yQZZCzVpDO38sATSk4ueg2BBGCnwasdiYHQEwrWyXyLEXA00LBPtYf7JS4cwBw449Arm';
const TG_API_TOKEN = "512523212313687288:AAH9BxHIftqCSada3xad0u_NOdVAvasdwfxZ1Vr_bVc"; 
const TG_API_URL = "https://api.telegram.org/bot" + TG_API_TOKEN;
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbySdjZr_adsadmsuMRh3A3sW5TwpnZpp5mOBg-PNp-lUyjXqrtJgqig/exec";
//const CHAT_ID = "-100176513157156367";


function setWebhook() {
  var url = TG_API_URL + "/setWebhook?url=" + WEB_APP_URL;
  var response = UrlFetchApp.fetch(url);
}

function getImageLink(fileId) {
  var url = `${TG_API_URL}/getFile?file_id=${fileId}`;
  var response = UrlFetchApp.fetch(url);
  var response = JSON.parse(response);
  var path = response.result.file_path;
  var url = `https://api.telegram.org/file/bot${TG_API_TOKEN}/${path}`;
  
  return url;
}

function testLog(variableToLog){
  var test_log = SpreadsheetApp.openById("18ak1VHNmSZAtp58hcNGlzkFFEHrTEZgStfWeiMGL_0g").getSheetByName("log1");
  test_log.appendRow([variableToLog]);  
}

function postMessageToDiscord(embed, channel) {
  
  var payload = JSON.stringify({
    "username": "TFI Telegram",
    "avatar_url": "https://gcdnb.pbrd.co/images/6ueFuuOwPTIU.png?o=1",
    "embeds": [embed] 
  });
  
  let options = {
    "method": "post",
    "headers": {
      "Content-Type": "application/json",
    },
    "payload": payload
  };
  Logger.log(options, null, 2);
  var response = UrlFetchApp.fetch(channel, options);
}

function doPost(e) {
  var json = e.postData.contents;
  testLog(json);
  var contents = JSON.parse(json);
//  if (contents.channel_post.chat.id == CHAT_ID){
    
    var channelPost = contents.channel_post;
    
    if (channelPost.hasOwnProperty('photo') && channelPost.hasOwnProperty('caption')){
      var largestFileIndex = channelPost.photo.length - 1;
      var fileId = channelPost.photo[largestFileIndex].file_id;
      var fileLink = getImageLink(fileId);
      var text = channelPost.caption;
      var embed = buildNewMissionEmbed(text, fileLink);
      postMessageToDiscord(embed, DISCORD_ANNOUNCEMENTS_URL);
      testLog('new photo w caption'); 
    }
    
    if ( channelPost.hasOwnProperty('photo') && !channelPost.hasOwnProperty('caption')){
      var largestFileIndex = channelPost.photo.length - 1;
      var fileId = channelPost.photo[largestFileIndex].file_id;
      var fileLink = getImageLink(fileId);
      var embed = buildNewScreenshotEmbed(fileLink);
      postMessageToDiscord(embed, DISCORD_PICTURES_URL);
      testLog('new photo w/o caption'); 
      
    }
    
    if (channelPost.hasOwnProperty('text')){
      var text = channelPost.text;
      var embed = buildNewMissionEmbed(text);
      postMessageToDiscord(embed, DISCORD_ANNOUNCEMENTS_URL);
      testLog('new text'); 
    }
    
    if (channelPost.hasOwnProperty('video')) {
      var text = channelPost.caption;
      var embed = buildNewMissionEmbed(text, 'https://i.imgur.com/KP1eBkn.png');
      postMessageToDiscord(embed, DISCORD_ANNOUNCEMENTS_URL);
      testLog('new video');    
    } 
  }
//}

