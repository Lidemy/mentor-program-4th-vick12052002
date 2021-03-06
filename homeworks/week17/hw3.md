## 什麼是 MVC？
一種軟體設計模式，將系統各自分工為三個部分 模型 Model、 視圖 view、 控制器 controller。

Model（ 邏輯層 ）：與資料庫進行任何的處理。

controller（ 事件層 ）： 是大家的傳聲筒，因此是整體運作的核心，掌握與瀏覽器之間的互動行為（來自使用者），也負責收發 Request 與 Response，因此，通常會在 Controller 設置不同的事件 Event，進而觸發不同指令完成後續動作。

後續的動作包含：「 收到什麼 Request 後要向哪個 Model 要求資料 」、「 接收並傳送 Model 處理好資料，針對不同的使用情境，傳給相對的 view 進行畫面的 render」

view（ 表現層 ）：透過 controller 接收到經過 Model 處理好的資料，並將這些資料放入已寫好的 HTML 樣板（ template ）中，簡單來說，就是負責顯示畫面，不具備邏輯概念

採用 MVC 架構的好處
1. 更容易維護程式碼 － MVC 三者各自分工，並不會互相影響，因此各自得擴充性相對也高
2. 可重複利用寫好的程式碼 － 運用相同的 model 得到的資料，根據使用場景不同，產出不同的 view
3. 方便團隊合作 － 實際工作上，依據  model 與 view 的處理範圍不同，可以將工程師與設計師的職責部分切開，可以加速開發的效率。

小總結：
使用 MVC 軟體設計模型，看似好處多多，但若專案規模沒有到很大，其實也可以不使用 MVC ，工具的使用與開發的方式一切取決於專案的規模、使用的情境。

參考資料
[「筆記」- 何謂 MVC 軟體設計模式](https://medium.com/pierceshih/%E7%AD%86%E8%A8%98-%E4%BD%95%E8%AC%82-mvc-%E8%BB%9F%E9%AB%94%E8%A8%AD%E8%A8%88%E6%A8%A1%E5%BC%8F-af1ff10901e6)
[MVC架構是什麼？認識 Model-View-Controller 軟體設計模式](https://tw.alphacamp.co/blog/mvc-model-view-controller)


## 請寫下這週部署的心得
原本用 express 改寫完檔案，還覺得蠻有趣的，可能自己是走後端的料，數不知在部署上踩到的坑一堆，這週真的應證了「 後端要與指令們好好相處 」的這句話，只能透過 terminal 噴出錯誤訊息，來端察可能是哪個部分出錯了。這週真的是部署之亂，我是部署在之前自己租的主機上，一剛開始部署上去就遇到一大堆問題，例如：port 已被佔用 => 應該是與之前 apache server 有關，原本想設定 nginx 與 apache 同時使用，運用 nginx proxy server 反向代理的方法，不過設定檔一直出錯，後來就先放棄了，而且我的 conf.d 當中並沒有 sites-available 與 sites-enabled 的兩個資料夾，爬文後，才發現不一定會自動幫你產生，甚至在部署抽獎系統時，頁面也出現了 502 的錯誤訊息，真的狀況頻頻百出，加上調整不是很熟悉的設定檔，每改一個參數都覺得怕怕的，非常不踏實。

但也因這樣子害怕的心理，使得我去爬了更多的文，踩了很多坑，下次再遇到相似的問題，希望我能想到大概是哪部分出錯，我想這就是經驗的累積吧！

總之，終於再次完成部署拉～可喜可賀～

## 寫 Node.js 的後端跟之前寫 PHP 差滿多的，有什麼心得嗎？
寫起來方便很多，而且也沒有寫原生 php ，邏輯與畫面混在一起的情況，雖然 php 也是可以盡可能地向兩者分開，不對相對起來，易讀性變高，可以借用的工具，其實蠻多的 ejs 樣版引擎、 body-parser 等等的，總之就是好處多多拉～不過寫完後，更能理解為何要先走 php 這段坎坷的路，因為走過崎嶇的道路，才知道果實的甜美～