```js
var a = 1
function fn(){
  console.log(a)
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
  function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
}
fn()
console.log(a)
a = 10
console.log(a)
console.log(b)
```

1. 在程式碼執行的一開始，我們會有個全域的 global execute context（以下簡稱EC) 被建立
```js
// global EC
{
   a: undefined,
   fn: function 
}
```
2. 執行 `var a = 1` ，改變 `global EC` 中 `a` 變數的值，如下
```js
// global EC
{
   a: 1,
   fn: function 
}
```
3. 遇到 `fn()`， `fn()` 的 Active context（以下簡稱AC) 會被建立，並且初始化
```js
// fn() AC 
{
   a: undefined,
   fn2: function 
}
```
4. 進入 `fn()`
5. 執行 `console.log(a)`，查看 `fn() AC`  是否有 `a` 存在 ，若不存在再往外層的 `global EC` 尋找變數
6. 確認 `fn() AC` 內 `a` 存在 ，印出 `undefined`
7. 執行`var a = 5`，改變 `fn() AC `中 `a` 變數的值
```js
// fn() AC 
{
   a: 5,
   fn2: function 
}
```
8. 執行`console.log(a)`，印出 `5`
9. 執行`a++`，改變 `fn() AC `中 `a` 變數的值為`6`
```js
// fn() AC 
{
   a: 6,
   fn2: function ,
}
```
10. 因 `a` 已宣告過，所以 `var a`，無意義可忽略
11. 進入 `fn2()`，先初始化`fn2()` 的 `fn2() AC`
```js
// fn2() AC 
{
  無
}
```
12. 執行`console.log(a)`，查看 `fn2() AC`  是否有 `a` 存在 ，若不存在再往外層的 `fn() AC` 尋找變數(如果還是無，請再依序往外找)
13. 確認 `fn2() AC` 內 `a` 不存在 ，向`fn() AC` 尋找變數`a` ，確認 `a = 6`，
14. 執行 `console.log(a)`，印出 `6`
15. 執行 `a = 20`，已確認`fn() AC` 中的有變數`a`，因此將 `fn() AC` 中的變數`a`的值改為 `20`
```js
// fn() AC 
{
   a: 20,
   fn2: function
}
```
16. 執行`b = 100`，查看 `fn2() AC`  是否有 `b` 存在 ，若不存在再往外層的 `fn() AC` 尋找變數(如果還是無，請再依序往外找)

17. 確認 `fn2() AC` 中 `b` 無存在，再往上 `fn() AC`尋找變數`b`
18. 確認 `fn() AC` 中 `b` 無存在，再往上 `global EC`尋找變數`b`
19. 確認 `global EC` 中 `b` 無存在，因此在`global EC` 中建立一個變數`b`
```js
// global EC
{
   a: 1,
   fn: function, 
   b: undefined
}
```

20. 執行`b = 100`，已確認`global EC` 中的有變數`b`，因此將 `global EC` 中的變數`b`的值改為 `100`
```js
// global EC
{
   a: 1,
   fn: function, 
   b:100
}
```
21. 結束 `fn2()`，繼續執行 `fn()` 的最後一行
22. 執行 `console.log(a)`，確認`fn() AC` 中的變數`a`，印出 20
23. 結束 `fn()`，繼續執行第十七行
24. 執行 `console.log(a)`，確認`global EC` 中的變數`a`，印出 1
25. 執行`a = 10`，已確認`global EC` 中的有變數`a`，因此將 `global EC` 中的變數`a`的值改為 `10`
```js
// global EC
{
   a: 10,
   fn: function, 
   b:100
}
```

26. 執行 `console.log(a)`，確認`global EC` 中的變數`a`，印出 10
27. 執行 `console.log(b)`，確認`global EC` 中的變數`b`，印出 100
28. 結束


因此會印出 undefined (步驟 5) -> 5 （步驟 8） -> 6 （步驟 14）-> 20（步驟 22） -> 1 （步驟 24） -> 10（步驟 26） -> 100 （步驟 27）