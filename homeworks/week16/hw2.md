```js
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```
1. 當 i = 0，進入第一個迴圈
2. call stack 丟入 console.log('i: ' + 0)
3. 執行 console.log('i: ' + 0)
4. call stack 丟入`setTimeout(() => { console.log(i)}, 0 * 1000)` ，因 `setTimeout` 是 WebAPI 會與瀏覽器溝通，請瀏覽器做一些事
5. `setTimeout(() => {
    console.log(i)
  }, 0 * 1000)` 透過瀏覽器設置 Timer，等待 0 秒後，將 `() => {console.log(i)}` 這個 cb function 放到 Callback Queue 中，並等待所有在 call stack 中的任務完成才可放入 call stack 內執行
6.  i = 1，進入第二個迴圈
7. call stack 丟入 console.log('i: ' + 1)
8. 執行 console.log('i: ' + 1)
9. call stack 丟入`setTimeout(() => { console.log(i)}, 1 * 1000)` ，因 `setTimeout` 是 WebAPI 會與瀏覽器溝通，請瀏覽器做一些事
10. `setTimeout(() => {
    console.log(i)
  }, 1 * 1000)` 透過瀏覽器設置 Timer，等待 1 秒後，將 `() => {console.log(i)}` 這個 cb function 放到 Callback Queue 中，並等待所有在 call stack 中的任務完成才可放入 call stack 內執行
11. i = 2，進入第三個迴圈
12. call stack 丟入 console.log('i: ' + 2)
13. 執行 console.log('i: ' + 2)
14. call stack 丟入`setTimeout(() => { console.log(i)}, 2 * 1000)` ，因 `setTimeout` 是 WebAPI 會與瀏覽器溝通，請瀏覽器做一些事
15. `setTimeout(() => {
    console.log(i)
  }, 2 * 1000)` 透過瀏覽器設置 Timer，等待 2 秒後，將 `() => {console.log(i)}` 這個 cb function 放到 Callback Queue 中，並等待所有在 call stack 中的任務完成才可放入 call stack 內執行
16.  i = 3，進入第四個迴圈
17. call stack 丟入 console.log('i: ' + 3)
18. 執行 console.log('i: ' + 3)
19. call stack 丟入`setTimeout(() => { console.log(i)}, 3 * 1000)` ，因 `setTimeout` 是 WebAPI 會與瀏覽器溝通，請瀏覽器做一些事
20. `setTimeout(() => {
    console.log(i)
  }, 3 * 1000)` 透過瀏覽器設置 Timer，等待 3 秒後，將 `() => {console.log(i)}` 這個 cb function 放到 Callback Queue 中，並等待所有在 call stack 中的任務完成才可放入 call stack 內執行
21. i = 4，進入第五個迴圈
22. call stack 丟入 console.log('i: ' + 4)
23. 執行 console.log('i: ' + 4)
24. call stack 丟入`setTimeout(() => { console.log(i)}, 4 * 1000)` ，因 `setTimeout` 是 WebAPI 會與瀏覽器溝通，請瀏覽器做一些事
25. `setTimeout(() => {
    console.log(i)
  }, 4 * 1000)`透過瀏覽器設置 Timer， 等待 4 秒後，將 `() => {console.log(i)}` 這個 cb function 放到 Callback Queue 中，等待所有在 call stack 中的任務完成才可放入 call stack 內執行

26. i = 5， i 不得 > 5 ，結束迴圈
27. 當所有 call stack 中的任務完成，將 Callback Queue 內排序第一的`() => {console.log(i)}` 移到 call stack 中
28. 執行 `() => {console.log(i)}`，此時的 i = 5，執行`console.log(i)`，因此印出 `5`，結束後 call stack 又清空
29. 重複執行 27~28 步驟四次
30. 結束