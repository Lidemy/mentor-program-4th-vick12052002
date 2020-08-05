## 什麼是 DOM？
DOM 文件物件模型
1. 提供文檔的結構化表述，並定義存取、訪問的方式(DOM API)，從中改變文檔的結構、內容、樣式。
2. 它並不是程式語言，但 JavaScript + DOM 可以動態操控網頁結構、內容、樣式
3. 常以腳本語言， 如 JavaScript，來進行訪問與處理，但也可以透過其他語言來實現 
4. 將 html 文件以樹狀的結構來表示的模型，組合起來的樹狀圖，就是「DOM Tree」。

![DOM Tree](https://ithelp.ithome.com.tw/upload/images/20171214/20065504rULoAa69HV.png)
如上圖，把 html 文件看成一棵樹，主樹幹是整份文件 document，而每個 Element 元素、標籤就代表一個節點（就像分支），JavaScript 透過 DOM 所提供的 API ，對該節點綁定監聽事件等操作，來動態改變 html 裡的元素樣式、內容、結構（網頁）。


資料來源：
1. [重新認識 JavaScript: Day 11 前端工程師的主戰場：瀏覽器裡的 JavaScript
2018鐵人賽 javascript](https://ithelp.ithome.com.tw/articles/10191666)
2. [MDN-DOM概述](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model/Introduction)

## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？

假設 html文件內，有一個按鈕 btn 上層包了 div，結構是 html > body > div > btn ，當我們點擊 btn 時，連同上層的 div、body、html 都會觸發 click 事件，這就是事件傳遞機制。

事件傳遞機制可分為三個階段：
捕獲（ Capture phase ）
元素本身（ Target  ）   
冒泡（ Bubbling phase ）

事件傳遞的兩大原則為：

>1. 先捕獲，在冒泡 
>2. 當事件傳遞到 target 本身，並無捕獲與冒泡之分

新增事件監聽
addEventListener('click', function(),**true**)，可帶三個參數

參數1-事件類型 : 例如 on、click、keypress 等等，事件類型可參考 [MDN-事件参考](https://developer.mozilla.org/zh-CN/docs/Web/Events)
參數2-回呼函數 :  偵測事件發生，觸發該 function ，可使用匿名函式的形式
**參數3－事件監聽順序 : Boolean ，預設為 false ，true 是把這個 listener 添加到捕獲階段，false 則是listener 添加到冒泡階段**

>事件傳遞機制一直都存在，addEventListener（ ）的第三個參數只是選擇把 listener 添加到捕獲、冒泡階段上

根據下方圖片，我們可以知道當我們點擊目標時，事件會從根部節點（windows > document > html > div> btn），向下傳遞，這個傳遞階段就是**捕獲（Capture phase）**

事件在元素本身（目標 Target Phase）時，並沒有捕獲與冒泡之分
冒泡階段（Bubbling phase）則是由元素本身，向上傳遞至根部節點

![event-flow](https://static.coderbridge.com/img/techbridge/images/huli/event/eventflow.png)


資料來源：
[DOM 的事件傳遞機制：捕獲與冒泡](https://blog.techbridge.cc/2017/07/15/javascript-event-propagation/)
[Yakim shu-[第七週] DOM - 事件傳遞機制：捕獲與冒泡、事件代理](https://yakimhsu.com/project/project_w7_eventListener.html)
[JavaScript30-Day25-DOM事件傳遞機制](https://weiyuan1993.github.io/2018/09/10/javascript30-25/)



## 什麼是 event delegation，為什麼我們需要它？

event delegation ：運用事件傳遞機制中的冒泡，在 e.target 目標元素的上層增加 addEventListener，再運用判斷式取得 e.target 的指定資料。

好處就是不用每個相似的物件都綁定 addEventListener，是一個比較有效率的做法，而且不用浪費資源，加上可以處理動態新增元素或 class 的情形。


## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？

event.preventDefault():阻止預設活動發生，
範例：表單中的 submit 按鈕，預設行為就是點擊按鈕，就會進行送出表單資料這個預設動作，如果在 callback function 內，最前面加上 event.preventDefault()，就會取消預設行為的發生

event.stopPropagation()：停止事件後續傳遞
傳遞到 e.target 時，事件將會停止傳遞，最終停留在 e.target，不上（下）級傳遞
範例：
```js
button.addEventListener('click', (e) => {
  e.stopPropagation();
  console.log('Click!!!');
},false);
```
當事件傳遞到目標上，就會終止，不會進行冒泡階段

```js
button.addEventListener('click', (e) => {
  e.stopPropagation();
  console.log('Click!!!');
},true);
```
捕獲階段第一層，後續就終止

e.stopImmediatePropagation()：立即停止後續的自身

