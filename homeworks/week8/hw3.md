## 什麼是 Ajax？
非同步 JavaScript 及 XML，全名「Asynchronous JavaScript and XML」，使用
物件來與伺服器進行通訊。它可以傳送並接收多種格式的資訊，例如：JSON、XML、HTML。
AJAX 「非同步」的特性，這代表它可以與伺服溝通、交換資料、以及更新頁面，且「 無需重整頁面 」。

JavaScript 是單線程（single threaded runtime）的程式語言，單線程的意思就是程式碼是由上到下執行的，前面的程式碼必須處理好，後面才可執行。

但當我們需要與 WebAPI 存取資料，同時需要繼續執行後面的程式碼時，我們不可能在那邊等 Response，因此就需要有非同步的作法。

同步：電腦透過瀏覽器發送 Request 後，需要等到 Response 發送回來，才會繼續執行後面的程式碼。
非同步：電腦透過瀏覽器發送 request 後，繼續執行後面的程式碼，等到 Response 發送回來後，在進行處理 Response 的資料

雖然 JavaScript 是單線程的程式語言，但運作 JavaScript 的「 瀏覽器 」並不是單程線的，瀏覽器可能同時執行 JavaScript引擎線程、界面渲染線程(css)、瀏覽器事件觸發線程(event)、HTTP請求線程(發送 Request)等等


小記錄：
  多線程：在單個程序中同時運行多個線程完成不同的工作，稱為多線程

參考資料
[你瞭解異步編程、進程、單線程、多線程嗎？](https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/683044/)
[輕鬆理解 Ajax 與跨來源請求](https://blog.techbridge.cc/2017/05/20/api-ajax-cors-and-jsonp/)
[MDN-Ajax 入門篇](https://developer.mozilla.org/zh-TW/docs/Web/Guide/AJAX/Getting_Started)

## 用 Ajax 與我們用表單送出資料的差別在哪？
| 方式 | 特性 | 說明
| -------- | -------- | -------- | 
| 表單   | 會換頁、透過html元素（與 javaScript 無關）  | 送出資料後，會根據`form`tag 內的`action`這個屬性，將網頁傳送到`action`上的網址並向該網址帶上參數 (`input`的內容)發出 Request ，接收該網址的 Response 再 render 出網頁｜
| ajax  | 不會換頁、使用者體驗較好  | 有時候只需要存取 API 部份資料時使用｜



## JSONP 是什麼？
全名 JSON with Padding ，透過 html 文件內 `<script>`的特性，來存取跨網域 API 資料，但缺點是你要帶的參數，只能用附加在網址的方式帶過去（GET），無法使用 POST 方式。這種存取跨網域 API 的做法，現在已經不常使用了，能使用 CORS 的話，優先考慮 CORS 。

## 要如何存取跨網域的 API？
運用 CORS，全名為 Cross-Origin Resource Sharing，跨來源資源共享。
在 request 的 header 上夾帶`Access-Control-Allow-Origin`，當瀏覽器收到 Response 之後，會先檢查 Access-Control-Allow-Origin 裡面的內容，如果裡面有包含現在這個發起 Request 的 Origin 的話，就會允許通過，讓程式順利接收到 Response。

除了`Access-Control-Allow-Origin`的方法，還有`Access-Control-Allow-Headers`可以定義接受哪些 Request Header 跟`Access-Control-Allow-Methods`只接受哪些 Method。



## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？
因為第四週時我們執行環境是在 node.js 上，是透過 node.js 在自己的電腦上與 WebAPI 進行資料的存取，而這週我們是透過瀏覽器這個媒介，來與 WebAPI 溝通，而在瀏覽器上執行，會有些瀏覽器上的限制，例如：安全上的考量（同源政策）

| 執行環境 | 優點 | 缺點|
| -------- | -------- | -------- |
| node.js   | 暢通無阻  | 安全問題、遇到惡意程式碼中鏢    |
| 瀏覽器  | 安全防護、 會阻擋  |  很多限制   |

同源政策，Same-origin policy，當你呼叫「 不同源 」的 API，瀏覽器一樣會幫你發 Request，但是會把 Response 給擋下來，不讓你的 JavaScript 拿到並且傳回錯誤。
如下圖， devTool 會冒出錯誤訊息
![我是錯誤訊息](https://static.coderbridge.com/img/techbridge/images/huli/cors1.png)

同源：兩份網頁是相同 domain 相同，端口相同、傳輸協定相同（同為http或https)，以下引入[MDN-同源政策](https://developer.mozilla.org/zh-TW/docs/Web/Security/Same-origin_policy)範例

比較目標:http://store.company.com/dir/page.html

|URL | 同源| 理由|
| -------- | -------- | -------- |
| http://store.company.com/dir2/other.html   | 同源 |  |
| http://store.company.com/dir/inner/another.html  | 同源 |   |
| https://store.company.com/secure.html  | 不同源 |  協定不同 |
| http://store.company.com:81/dir/etc.html	 | 不同源 |  埠號不同 |
| http://news.company.com/dir/other.html	  | 不同源 | 主機位置不同  |

所以基本上如果你要串接別人的 API，通常都是不同源的。


[輕鬆理解 Ajax 與跨來源請求](https://blog.techbridge.cc/2017/05/20/api-ajax-cors-and-jsonp/)
[MDN-同源政策](https://developer.mozilla.org/zh-TW/docs/Web/Security/Same-origin_policy)
