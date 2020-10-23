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


## 寫 Node.js 的後端跟之前寫 PHP 差滿多的，有什麼心得嗎？
