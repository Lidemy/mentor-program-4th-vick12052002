## Webpack 是做什麼用的？可以不用它嗎？
打包各種模組 module 的工具，例如在 node.js 的執行環境中，可以用 require('') 來引入已包好的 module ，或使用 module.exports() 來輸出已包好的 module，但樣的用法僅限於 JS 跑在 node.js 這個執行環境中，但跑在瀏覽器上的 JS 並無這樣的用法，不過近年 ES6 有開發了 import / export 的語法，但早在 ES6 前，為了解決已寫好的 code 可以方便轉換且能順利跑在瀏覽器上，衍生出各種相似的規範（ node.js 所引用的規範就是 CommonJS ） ，而 Webpack 就是這樣一個工具，而且他的廣度更寬，除了 JS 外，連 sass、jpg 檔案都適用。

## gulp 跟 webpack 有什麼不一樣？
>定位完全不同

gulp 的定位在任務執行（管理各種任務），透過各種不同的 plugin 可以做的事情更廣泛，例如：校正時間、呼叫API 等等

webpack 則是在打包各種模組（資源集合），在打包 ( bundler ) 前需要經過 loader 的過程，loader 的過程可以是 babel compiler 、 SASS complier，loader 完的結果再打包起來，某些任務（ 例如：校正時間、呼叫 API 等任務 ）是 webpack 做不到的

總結 
gulp => 任務管理，幾乎什麼事都做得到，但做不到 bundler
webpack => bundler 打包 module ，主要在 bundler ，但在打包前會經過 loader ，loader 可以是各種 compiler ，所以常與 gulp 搞混，但實際兩者的本質與定位是完全不同的

## CSS Selector 權重的計算方式為何？

如果只有單一選擇器的話，權重如下
!important > 內聯 style >id Selector > class Selector  > element > Universal selector * (全體選擇器)|
| 級別 | 選擇器類別 | 比重| 
| -------- | -------- | -------- | 
| 第高等級| 內聯 inline-style| 1-0-0-0
| 第二等級| id Selector| 0-1-0-0
| 第三等級| class Selector、attribute 、pseudo-class | 0-0-1-0
| 第四等級| element(type selector) |0-0-0-1 
| 第五等級| Universal selector *|0-0-0-0 

暴力解法-最大魔王：!important

但權重會依據填寫選擇器的多寡比重加權，可以根據圖下
![CSS Selector 圖解](https://muki.tw/wordpress/wp-content/uploads/2015/07/CSS-Specificity-full.png)

例如:
| 範例 | 選擇器類別 | 權重加總| 
| -------- | -------- | -------- | 
| li [attr]| li = 0-0-0-1, +<br>[attr] = 0-0-1-0| 0-0-1-1
| :only-of-type| :only-of-type = 0-0-1-0 |  0-0-1-0
| #myDiv li.class a [herf]| #myDiv = 0-1-0-0, +<br> li = 0-0-0-1, +<br>.class= 0-0-1-0, +<br> a = 0-0-0-1,+<br> [herf]= 0-0-1-0| 0-1-2-2
| inline style | style =""  |1-0-0-0 
| !important| !important |1-0-0-0-0

### 總結
越左邊的權重越大，數字越多比重越重，如果前一個階層相同比重，就會比較下一階層的數字大小，權重較大的會蓋過權重小的，非逼不得已才使用!important。