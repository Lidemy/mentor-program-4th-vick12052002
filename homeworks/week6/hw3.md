## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。

textarea - 文字區域（可輸入多行的文字），可設屬性有
1. name : submit 後，會依據 name 送出資料  ex.name="message" rows="4" cols="50"
2. cols、rows：設定文字區域大小  ex.rows="4" cols="50"

strong － 以粗體顯示並加重要標籤
b - 僅粗體顯示，無特別重要

thead、tbody 、tfoot- 等同於 table 內又可細分為 header, body, footer，使用這三個 tag 都必須包含至少一個 tr ，且 tbody 就可單獨滾動

附上參考連結[What is benefit of thead
](https://stackoverflow.com/questions/2700379/what-is-benefit-of-thead)、[w3schools-tfoot](https://www.w3schools.com/tags/tag_tfoot.asp)

----
特殊字元
 &absp; －空白

## 請問什麼是盒模型（box modal）

![box modal](https://i.imgur.com/6nWNHzY.png)
圖片截取自[w3school-CSS Box Model](https://www.w3schools.com/css/css_boxmodel.asp)

假設我們今天要寄一個東西給別人，就需要幫包裝，我們可以把寄東西的包裝順序比喻成 box modal

要被寄的物品：content
保護物品的泡泡紙：padding
裝物品的盒子/箱子：border
盒子外的包裝：margin

由上可知，物品、泡泡紙是盒子內的東西，content 是物件本體，padding 則是會影響物件與盒子的距離，border 是盒子，margin 是會影響每個盒子的距離。

而 padding、margin 在初學的時候，常會搞混用法，因此我們可以歸納成：

padding：影響「 自己 」
margin：影響與「 他人 」距離


box-sizing 是一個很方便的屬性，可以更改 width 所包含什麼，預設的情況下，box-sizing 為 content-box ，因此 CSS 的 width、height 是單指物件本身 (也就是只有 content ) 的寬高，當設計師如果指定某個 div 的寬高是 600px、400px，你就需要衡量到 border 、padding 的大小，或者是更詳細的確認他的要求是總寬高，還是物件本體等等

 box-sizing 有一個很好用的語法是「 border-box 」，可以更改 box modal 所包含什麼

| box-sizing | 範圍 | 特性 |
| -------- | -------- | -------- |
| content-box   |  width = content    | 預設，不包含 padding、border    |
| border-box  |  width = content + padding + border    | width 會自動幫你算好     |


## 請問 display: inline, block 跟 inline-block 的差別是什麼？

| 英文名詞| 中譯  | 特性 | 缺點 |例子 |
| -------- | -------- | -------- |-------- |-------- |
| inline    | 行內元素    | 預設不分行    | 不可設 width、height ，若設定 padding 物件本身位置不會動，但盒子會被撐開    | span、a   |
| block   | 塊元素   | 可調 width、height 的大小、一定分行    | 一定分行    | p、div   |
| inline-block    | 行內塊元素    | 綜合以上兩種的優點    | 可調 width、height 、又同行   |button、input  |


## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？


| 名詞 | 中譯  | 特性 |
| -------- | -------- | -------- |
| static   | 預設，靜態  |元素會依照自己的 display 的類型 ，如果是 inline 就會在同行顯示，如果是 block 就會換行顯示，位置就不會特別變動    | 
| relative   | 相對定位    |根據自己原本的位置做偏移，不會影響到其他人（其他元素不會改變），自己原本的位置「 會保留 」   | 
| absolute   | 絕對定位  | 會抓取父層元素（ static 預設不算）直到抓到父層有更改，會依抓到最接近的父層元素的位置，做偏移位置，自己原本的位置「 會被後面的元素替補 」| 
| fixed   | 固定定位   | 根據 viewport 作定位依據，會覆蓋別人    | 



備註 viewport: 使用者可以在網頁上看到的區域