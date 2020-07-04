``` js
function isValid(arr) {
  for(var i=0; i<arr.length; i++) {
    if (arr[i] <= 0) return 'invalid'
  }
  for(var i=2; i<arr.length; i++) {
    if (arr[i] !== arr[i-1] + arr[i-2]) return 'invalid'
  }
  return 'valid'
}

isValid([3, 5, 8, 13, 22, 35])
```

## 執行流程
arr.length 是 6
1. 執行第一行，設定變數 i = 0，檢查 i 小於 6
2. 確認 3 不小於等於 0 ，結束第一圈
3. 設定變數 i = 1 
4. 檢查 1 小於 6 (arr.length)
5. 確認 5 不小於等於 0 ，結束第二圈
6. 設定變數  i = 2 
7. 檢查 2 小於 6 (arr.length)
8. 確認 8 不小於等於 0 ，結束第三圈
9. 設定變數  i = 3 
10. 檢查 3 小於 6 (arr.length)
11. 確認 13 不小於等於 0 ，結束第四圈
12. 設定變數  i = 4 
13. 檢查 4 小於 6 (arr.length)
14. 確認 22 不小於等於 0 ，結束第五圈
12. 設定變數  i = 5 
13. 檢查 5 小於 6 (arr.length)
14. 確認 35 不小於等於 0 ，結束第六圈
12. 設定變數  i = 6 
13. 檢查 6 不小於 6 (arr.length)，結束迴圈
14. 進入迴圈並執行第一圈，設定變數 i = 2 
15. 檢查 2 小於 6
15. 確認 8 == 5 + 3 
16. 結束第一圈，設定變數 i = 3
17. 檢查 3 小於 6
18. 確認 13 == 8 + 5
19. 結束第二圈，設定變數 i = 4
20. 檢查 4 小於 6
21. 確認 22 !== 13 + 8 ，回傳 'invalid'