## Webpack 是做什麼用的？可以不用它嗎？


## gulp 跟 webpack 有什麼不一樣？


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