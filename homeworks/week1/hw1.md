## 交作業流程

1. 使用 **terminal** 切換目錄到 **mentor-program-4th-vick12052002**
`$cd Desktop/mentor-program-4th-vick12052002` 
  
2. 建立一個新的 branch ( 第幾週就是 week* )

     `$git branch week1 `

3. 離開 master ，跳到 week1 這個分支
    `$git checkout week1`

4. 開始寫作業

5. 將作業加進 .git 的暫存區
    `$git add .`

6. 查看 git 目前狀態，確認作業是否都已被追蹤
    `git status`

7. 確認都已在暫存區，commit 並附註新增什麼事項
    `$git commit -m " week1 ok "`

8. 將 local 端的 week1 分支 ，推到遠端 repo 的 origin 分支
    `$git push origin week1`

9. 打開 [自己的 repo ](https://github.com/Lidemy/mentor-program-4th-vick12052002) ，點擊 Pull resquests

10. 正常會有提示，有個 week1 的分支要 merge ，點擊 **Compare &  Pull resquests** 的綠色按鈕

11. 確認改的東西都有上傳
12. 填寫標題及內容( 有問題可以在內容上問 ) 
13. 建立 Pull resquests
14. 到[學習系統](https://learning.lidemy.com/homeworks)
15. 新增作業，選擇第幾週，貼上[ PR 網址](https://github.com/Lidemy/mentor-program-4th-vick12052002/pulls)
16. 確認已檢查過作業也有完成需求，再打勾
17. 確認以看過當週的自我檢討並修正錯誤 ，再打勾
18. 送出

----
等作業改完後，並 merge 後：

1. 跳回 master 
    `$git checkout master`

2. 將遠端 repo 拉回 local 端
    `$git pull origin master`
3. 將已 merge 完成的 week1 分支刪除 (包含遠端的week1 分支也要刪除)
    `$git branch week1 -d`


