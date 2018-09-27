# このドキュメントについて
このドキュメントはClovaスキルを`Node.js`で実装するための非公式なチュートリアルです。
このドキュメントの通りに実装すれば、簡単なClovaスキルを動かすこと、スキルへの対話を元にLINEメッセージを送信することができます。

## 必要なもの
- LINE ID(スマホでLINEを登録し、メールアドレスの登録まで完了させてください)
- Clovaデバイス
- インターネットに接続され、CLIで操作できるコンピュータ

## 利用するもの(詳細は後述)
- Clova-CEK-SDK-Nodejs
- ngrok

# はじめに
### Clovaスキルとは
Clovaにはデバイス購入時にそのまま利用することができるビルトインのスキルと、スキルストアに掲載されているスキルの2種類があります。
スキルストアは、Clovaアプリを起動し、ホーム画面にある導線をタップすると開くことができます。
![導線](./document/img/SkillStore_Home_Link.png)

Clovaスキルは、スキルストア詳細画面にて確認できる`呼び出し名`を利用して起動することができます。
- `呼び出し名`を起動して
- `呼び出し名`を開いて
- `呼び出し名`をつないで
スキルの起動をせずにスキルを利用開始することはできません。
また、一度起動したスキルはスキルサーバーから明示的に終了するリクエストを送った場合(link: shouldEndSession)か、ユーザが`終了して`などスキルを終了する発話をするまでは、起動したスキルが応答をする状態になります。
`ねぇClova、XXを起動して`という発話から、スキルが終了するまでを1セッションと扱います。

そのため、特定のスキルを起動中に`今日の天気は？`とユーザが発言したとしても、通常のClovaのお天気機能が呼び出されることはありませんし、1度スキルが終了してしまったら再度スキルの起動を促す発話をユーザがするまで、スキルは起動状態にすることができません。

```やってみよう
ねぇClova、激むず早口言葉を起動して！と話しかけて実際のスキルの挙動を確認してみよう
```

### Clovaが提供してくれること、スキルが実装すること


### スキルの公開までのフロー
スキルを公開するには以下の手順を踏む必要があります。
* [チャネルを作成する](https://clova-developers.line.me/guide/#/DevConsole/Guides/CEK/Create_Channel.md)
* [Extensionを登録する](https://clova-developers.line.me/guide/#/DevConsole/Guides/CEK/Register_Extension.md)
* [対話モデルを登録する](https://clova-developers.line.me/guide/#/DevConsole/Guides/CEK/Register_Interaction_Model.md)
* [対話モデルをテストする](https://clova-developers.line.me/guide/#/DevConsole/Guides/CEK/Test_Extension.md)
* [Clovaデバイスでテストする](https://clova-developers.line.me/guide/#/DevConsole/Guides/CEK/Device_Test_Extension.md)
* [Extensionを配布する](https://clova-developers.line.me/guide/#/DevConsole/Guides/CEK/Deploy_Extension.md)

[Extensionを配布する](https://clova-developers.line.me/guide/#/DevConsole/Guides/CEK/Deploy_Extension.md)の中で、[審査をリクエストする](https://clova-developers.line.me/guide/#/DevConsole/Guides/CEK/Deploy_Extension.md#RequestExtensionSubmission)という項目で説明されている通り、スキルを公開する前には審査が必要になります。

# 下準備
### LINE DevelopersとClova Developer Centerβ
Clovaのスキルを作成するには2つのDeveloper Centerを操作する必要があります。
* [LINE Developers](https://developers.line.me/ja/)
* [Clova Developer Centerβ](https://clova-developers.line.me/)

### チャネルを作成する
こちらのドキュメントを参考にまずはチャネルを作成しましょう。
[チャネルを作成する](https://clova-developers.line.me/guide/#/DevConsole/Guides/CEK/Create_Channel.md)

#### プロバイダーとは？
> チャネルにアプリを提供する個人または組織。チャネルを作成するには、LINE Developersコンソールでプロバイダーを作成する必要があります。例えば、個人や企業の名前をプロバイダーとして使用できます。

引用元: [用語集](https://developers.line.me/ja/docs/glossary/)

スキルを実装するには、プロバイダーとチャネルの両方を作る必要があります。
※ スキルとLINEを連携して利用するには同一のプロバイダーにBotのチャネルとスキルのチャネルを作る必要があります

# スキルを作り始める
## ゴールとシナリオを決定する
これから実装するスキルが提供するシナリオのゴールを決定しましょう。
[目標を設定する](https://clova-developers.line.me/guide/#/Design/Design_Guideline_For_Extension.md#SettingGoal)

## 対話モデルを構築する
対話モデルを構築して、これから実装するスキルサーバーへのRequestを確定させましょう

* 対話モデルとは？->[対話モデルを定義する](https://clova-developers.line.me/guide/#/Design/Design_Guideline_For_Extension.md#DefineInteractionModel)
* 実際の操作->[対話モデルを登録する](https://clova-developers.line.me/guide/#/DevConsole/Guides/CEK/Register_Interaction_Model.md)

## スキルサーバーを実装する

## 話しかけてみよう
- 呼び出し名(サブ)

## LINEを送ってみよう

## 審査に出してみよう
- 審査ポイントを書いちゃう
