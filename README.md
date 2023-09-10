# Tik Tok UI Clone

## About

使用 Next.js 製作的 Tik Tok UI Clone
功能需求：

1.  上下滑動播放與暫停影片
2.  進度條控制
3.  UI 介面

## Environment

```
node v18.12.1
npm 8.19.2
next.js 13.4.19
react.js 18.2.0
typescript 5.2.2
```

## Question

如果影片想要設計試看功能，請問怎麼設計比較好。
舉例 一個影片長 30mins，但試看只能看前 5mins

影片來源需是 m3u8 格式

ans:

1. 取得來源檔案，並且透過 ffmpeg 進行影片切割
2. 將切割後的影片檔案上傳至 Server
3. 當使用者開始觀看影片時，開始計時，當計時達到 5 分鐘時，暫停影片並顯示一個訊息，告訴使用者試看時間已結束。
   透過 setTimeout 或是 setInterval 來設定計時器。
