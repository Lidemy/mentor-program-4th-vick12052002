```js
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```

程式碼最終會印出 1 -> 3 -> 5 -> 2 -> 4
首先要先提到 JavaScript 是個單程線 single threaded （單執行緒）的程式語言，在正常的情況下，程式碼會一個任務處理完再處理其他的任務，反觀瀏覽器是屬於多程線，像是異步處理的功能，例如：ajax、DOM、setTimeout，就都是屬於 ＷebAPI 所提供的。

所以根據上方的程式碼我們流程我們要先區分成兩塊「call stack、Callback Queue」
call stack：所有呼叫的 function 都會被堆疊在 stack 中，直到完成才會清空，而他的原則是先進後出

Callback Queue(Task Queue)：當 call stack 內已經沒有任務，才會依序將存放在 Callback Queue 的任務移到 call stack 中

實際程式碼執行如下：
1. call stack 丟入`console.log(1)`，並執行印出 1
2. call stack 丟入`setTimeout(() => {console.log(2)}, 0)`，setTimeout 與瀏覽器溝通，請瀏覽器延遲 0 秒，再將 setTimeout 的 `() => {console.log(2)}` 丟入 Callback Queue 中，等待 call stack 的任務完全結束
3. call stack 丟入`console.log(3)`，並執行印出 3
4. call stack 丟入`setTimeout(() => {console.log(4)}, 0)`，setTimeout 與瀏覽器溝通，請瀏覽器延遲 0 秒，再將 setTimeout 的 `() => {console.log(4)}` 丟入 Callback Queue 中，等待 call stack 的任務完全結束
5. call stack 丟入`console.log(5)`，並執行印出 5
6. call stack 已完全清空，將 Callback Queue 中`() => {console.log(2)}`移入 call stack 
7. 執行 call stack 中的`() => {console.log(2)}`
8. 執行 `console.log(2)`，印出 2
9. 結束 `() => {console.log(2)}`
10. call stack 已完全清空，將 Callback Queue 中`() => {console.log(4)}`移入 call stack 
7. 執行 call stack 中的`() => {console.log(4)}`
8. 執行 `console.log(4)`，印出 4
11. 結束 `() => {console.log(4)}`
12. 清空 call stack