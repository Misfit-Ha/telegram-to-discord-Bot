/*
*I dont remember how it gets triggered 
*I think you have to run setWebhook first 
*run https://api.telegram.org/bot<TG_API_TOKEN>/deleteWebhook then run setWebhook with the new web app url
*/
const DISCORD_ANNOUNCEMENTS_URL = '***';// webhook of the channel i want announcements to go to
const DISCORD_PICTURES_URL = '***';//Webhook of the channel i want pictures to go to
const TG_API_TOKEN = "***"; //ex: 0123456789:ABC
const TG_API_URL = "https://api.telegram.org/bot" + TG_API_TOKEN;
const WEB_APP_URL = "***"; // get it from "manage deployments"
const CHAT_ID = "***";//ex: -1001002704487


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


function postFileToDiscord(link, channel) {
  var file = UrlFetchApp.fetch(link).getBlob();

  var channel = DISCORD_PICTURES_URL;
  var payload = {
    file: file
  };
  
  var options = {
    method: "post",
    payload: payload,
    muteHttpExceptions: true
  };
  Logger.log(options, null, 2);
  var response = UrlFetchApp.fetch(channel, options);
}


function doPost(e) {
  var json = e.postData.contents;
  testLog(json);
  var contents = JSON.parse(json);
  if (contents.channel_post.chat.id == CHAT_ID){
    
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
      postFileToDiscord(fileLink, DISCORD_PICTURES_URL)
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
}

