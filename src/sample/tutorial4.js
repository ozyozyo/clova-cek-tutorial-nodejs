// 必要な設定を読み込む
const clova = require('@line/clova-cek-sdk-nodejs');
const express = require('express');

// LINEの設定を読み込む
const line = require('@line/bot-sdk');
// TODO: あなたのCHANNEL_SECRETとACCESS_TOKENに置き換えてください
const config = {
    channelSecret: 'your channel secret',
    channelAccessToken: 'your channel access token'
};
const client = new line.Client(config);

// TODO: あなたのEXTENSION_IDに置き換えてください
const EXTENSION_ID = 'your extension id';

// `IntentRequest`が呼び出されたときに実行されます
const intentHandler = async responseHelper => {
  const intentName = responseHelper.getIntentName();
  const sessionId = responseHelper.getSessionId();

  // Intentの名前をログに出力します
  console.log('intentName: ' + intentName);
  // Slotの一覧をログに出力します
  const slots = responseHelper.getSlots();
  console.log(slots);

  switch (intentName) {
    case 'AnswerPrefecture':
      // ユーザーが県名を回答したときは復唱する
      responseHelper.setSimpleSpeech(
        clova.SpeechBuilder.createSpeechText(`${slots.AnsweredPlace}なんですね。すきな食べ物はなんですか？`)
      );
      // 聴取した県名を保存しておく
      responseHelper.setSessionAttributes({
        'prefecture' : slots.AnsweredPlace
      })
      // LINEを送信する
      try {
        await client.pushMessage(responseHelper.getUser().userId, {
          type: 'text',
          text: `${slots.AnsweredPlace}なんですね`,
        });
      } catch (error) {
        console.log(error);
      }
      break;
    case 'AnswerFavoriteFood':
      // 保存しておいた県名を呼び出す
      console.log(responseHelper.getSessionAttributes());
      const prefecture = responseHelper.getSessionAttributes().prefecture;
      // ユーザーが好きな食べ物を回答したときは復唱する
      responseHelper.setSimpleSpeech(
        clova.SpeechBuilder.createSpeechText(`${prefecture}出身で、${slots.FavoriteFood}がお好きなんですね`)
      );
      responseHelper.endSession();
      break;
    case 'Clova.NoIntent':
      // ユーザーが`いいえ`と発話したときは`いえいえ`と返事します
      responseHelper.setSimpleSpeech(
        clova.SpeechBuilder.createSpeechText('いえいえ')
      );
      break;
    default:
      // ユーザーがそれ以外の発話をしたときは`なんなん`と返事します
      responseHelper.setSimpleSpeech(
        clova.SpeechBuilder.createSpeechText('なんなん')
      );
      break;
  }
};

const clovaHandler = clova.Client
  .configureSkill()
  .onLaunchRequest(responseHelper => {
    // スキル起動直後には`こんにちは、ご出身は何県ですか？`と発話します
    responseHelper.setSimpleSpeech( clova.SpeechBuilder.createSpeechText('こんにちは、ご出身は何県ですか？'));
  }) // ユーザが発話をしたときには`intentHandler`を呼び出します
  .onIntentRequest(intentHandler)
  // スキル終了時には何もしません
  .onSessionEndedRequest(responseHelper => {})
  .handle();

const app = new express();
const clovaMiddleware = clova.Middleware({ applicationId: EXTENSION_ID });

app.post('/clova', clovaMiddleware, clovaHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
