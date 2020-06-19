## 請解釋後端與前端的差異。

提到前後端的差異，必須提到三個角色「 瀏覽器 」、「 Server 」、「 資料庫 」。

常見在使用者在搜尋引擎上，搜尋指定關鍵字，實際上三大角色貫穿一切流程，簡單流程如下：

1. 使用者透過瀏覽器來搜尋關鍵字，瀏覽器發送  Request 給 Server，
2. Server 要求資料庫給予指定關鍵字的 data 
3. 資料庫收到 Request 後開始動作
4. 資料庫 response 給 Server 整理好的資料
5. Server 再把資料庫整理好的資料 response 給瀏覽器
6. 收到 response 的瀏覽器，開始解析這些資料，進行處理及渲染相對應的文件，

> 三大角色完成了一連串 Request 與 response ，就是我們搜尋完關鍵字的網頁。
當中提到的「 瀏覽器 」，可以當成「 前端 」，而「 資料庫 」就是我們的「 後端 」。

* **前端** － 泛指網頁上看得到的東西，包括在瀏覽器網頁時所接觸到的視覺內容從字體到顏色、網頁每個區塊、互動的功能等等，都屬於前端的領域，又稱為前台。這些視覺的內容都是經由瀏覽器的解析、處理、渲染對應的 HTML、css、Javascript 文件所呈現出來的。

而且前端必學的三大基礎也就是 「HTML、css、Javascript」

* **HTML**（HyperText Markup Language，超文本標記語言）- 是打造網頁的基石。它表述並定義網頁的內容配合 css（網頁的衣服）與 JavaScript （網頁的互動），來建立使用者體驗比較好的網頁。

* **css**－**HTML的衣服**，描述網頁外觀（CSS）
* **JavaScript**－**網頁的互動**，功能性的程式語言


css、Javascript 分別有一些方便開發者開發而演出來已經制定好一套規範，就稱為「 框架 framework 」，css 中比較著名的有「 bootstrap 」。
![ bootstrap ](https://www.tutorialrepublic.com/lib/images/bootstrap-illustration.png)
![前端三大框架](https://uploads-ssl.webflow.com/5d3a7aed4e11720246d46f49/5d9c0b16c1df580b6f15d2b4_vuejs%20react%20angular.jpg)
而 Javascript，目前市場上前端三大框架 「React、Vue、Angular」，為什麼會特別強調**目前**，因為前端的世界變化很快，哪天又出現哪個更方便或更完善的框架出現，就陸續會有一些框架被淘汰。



* **後端** －就是網頁上看不到的東西，後端的工作著重在於**資料的處理（接收前端的要求並給予相對應的資料）**，雖說是看網頁上看不到的東西，但後端是非常重要的，要如何讓伺服器在茫茫資料海中，最「 快速地 」做出適合的運算，提供使用者想要的資料。為了達到這個目標，後端工程師必須要**建立並優化伺服器的性能、程式碼邏輯、以及資料庫結構**。

而後端可使用的語言蠻多種類的，常見的有老牌的 PHP、Java，最近十分熱門的 Python、Ruby，來勢洶洶的 Node.js、Go 等等。

----
## 假設我今天去 Google 首頁搜尋框打上：JavaScrit 並且按下 Enter，請說出從這一刻開始到我看到搜尋結果為止發生在背後的事情。

**預設我們使用的 DNS Server 是 google 提供 IP 位置為 8.8.8.8**
#### 前提 ( 瀏覽器到 google 首頁 )
1. 瀏覽器一開始在網址欄中，輸入 google.com 這個域名 
2. 瀏覽器去 google 所提供的 DNS Server，IP 為 8.8.8.8，要求 google.com 這個域名實際的 IP 位置 
3. DNS Server 回傳 IP 為 172.217.160.78 給瀏覽器 
4. 瀏覽器接受到 response 後，瀏覽器發 Request 給 172.217.160.78 ，告訴他我要讀取他的html 等文件
5. 172.217.160.78 回傳文件內容
6. 瀏覽器開始解析、渲染回傳的文件內容
7. 瀏覽器顯示 google.com 的頁面


#### 回到正題 （搜尋框打上：javascript 並且按下 Enter）
1. 搜尋框打上 「 JavaScrit 」 並且按下 Enter
2. 瀏覽器發送 Request 給 google server ，告訴他我要找 javascript 的資料
3. google server 接收到 Request ，再發送 Request 到資料庫，告訴資料庫「 我需要與javascript 的資料相關的資料 」
4. 資料庫接到來自 server 的 Request，迅速的整理出資料，並 response 整理好的資料給 google server 
5. google server 收到來自資料庫 response ( 整理好的資料 )，又馬上傳給瀏覽器
6. 瀏覽器接收到 google server 的 response ，開始解析與渲染回傳的文件資料（ html ）
7. 最後看到的頁面，即是瀏覽器搜尋完關鍵字 javascript 的頁面

----
## 請列舉出 3 個「課程沒有提到」的 command line 指令並且說明功用
1. nano 在終端機中編輯文字檔案
    `nano <xxx.txt>`     
    進入編輯模式後，下方會有提示欄，其中 **＾** 這個符號是需要配合 control 鍵的一起使用

2. exit 會終止伺服器連接和 CLI 階段作業。
    `$exit `

3. cal 印出月曆
    `$cal `