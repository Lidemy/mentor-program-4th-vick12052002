## 跟你朋友介紹 Git

講到 Git 就要提到 **版本控制的概念**，舉例來說：

>**一人開發**：一份報告、文件有不同版本，為了要保留每個版本，就是在做版本控制
**團隊開發**：很多人共同開發一個檔案，如果有兩個人同時進行編輯的話，先進行編輯的人的修改內容會被覆蓋，相信大家都有這樣的經歷。這時候就容易產生有錯誤。所以就需要版本控制，可以使用到 branch 分支的概念來解決這個衝突 。

而 Git 就是一種分散式版本控制系統，最初是為了更好管理Linux內核而開發的，現在有很多團隊開發都用此套系統喔。

#### 優點：

1.有系統的存放每個版本
2.不需要儲存過多的檔案(備份)
3.可任意讀取之前的版本

開始使用 git 吧！

等等！

在開始使用 git 前當然要去下載 [git下載](https://git-scm.com/) 並安裝

>確認是否安裝成功可在 terminal（ mac ） 或 git-bash ( windows ) 輸入 git --version ，輸出目前 git 版本就成功囉！

----

#### 初始化

到任何一個**新的目錄**(就是資料夾)都必須先初始化，該目錄下有 .git 的資料夾，就代表該目錄可使用 git 版本控制 。
>不確定該目錄是否有 .git 的資料夾，可使用 CLI 輸入`$ls -l`就可以看見隱藏檔案 

##### 初始化開始！
`git init ` git 初始化，該目錄下會建立 .git 資料夾

`git config <user.name & email>`： git 規定一定要有 user.name & email 才可以順利執行版控，所以在`git init`後，要`git config` 設定使用者與信箱

範例
>git config --global user.name "your name"
git config --global user.email "youremail"

>*git 有三個層級 ：local < global < system*

為什麼要留 user.name & email?
>擁有 user.name & email 的資訊，未來在 commit 等等都會留存資料，在團體開發時，若有衝突 Conflict，較快可抓到兇手(誒～不是拉），是比較好團隊溝通

----
#### 進入 Git 世界

首先來看這張圖
![git](https://static.coderbridge.com/img/vick12052002/ef49ce21aa3547ed9237346b5313fe84.png)

我稱它為四大區域，簡單可以把它想像成：

`workspace`：我現在的位置
`staging`：暫存區（放那些準備要去新版本資料的地方）
`local repo`：本地端的資料夾（ PC 上 )
`remote repo`：遠端的資料夾（ GitHub ）

每一個 commit，可以想像成創立一個「新版本」的資料夾 ( local repo ) ，在 commit 前的 add 就是準備要去這個新版本的檔案，檔案可以有很多個。

----

##### 基本指令
使用 Git 最重要的就是學會 add、commit 等的基本指令，以下會跟你介紹幾個實用的指令：


`git status`： git 暫存區目前狀態
`git add <file> / . ` ：將 workspace 中的檔案加入到暫存區 ( . 代表全部檔案都加入)

`git commit `：**新建一個版本**，將 staging 暫存區 的檔案加入 local repo 本地資料庫，如果沒帶參數，他會跳到 Vim 編輯器，可輸入比較長的敘述(備註：新增了什麼功能等)
`git commit －ｍ “備註”`：**新建一個版本**，m 為 messerge 的意思，輸入較短敘述(備註)
`git commit -am "備註"`：更改檔案內容且檔案已加入到 local repo 本地資料夾，可跳過 add 到暫存區直接 commit

------

學會操作 add、commit 等的基本指令後，要如何查看目前各種狀態或歷史紀錄也是很重要的，以下會跟你介紹幾種方法：

`git log`：列出所有 commit 過的紀錄 （會依據你所在的分支不同（ HEAD 的位置 ），顯示出來的紀錄，不一定是全部）
`git log --all` ：log 全部的commit 過的紀錄
`git log --all --graph`：顯示**有線**的log紀錄
`git log --oneline `：可縮排成一行，較好閱覽
`git reflog` 可以查看所有 commit 紀錄與動作   

###### log 與 show 差異
>log 所有 commit 過的紀錄
show 是**最新**commit的修改，包含異動內容


`git diff (A B)`：比較 **暫存區與工作區** 的比較差異/ 比較Ａ、Ｂ版的差異
`git diff --cached `：比較暫存區與HEAD比較差異
`git cat-file -p _____`：查看＿＿id的內容
`git show ( ID ) `：查看最新commit修改的log 包含異動內容//若要指定 就後面加個ID

###### `.gitignore` 用法
比較機密的專案或沒有實質幫助的資料，不想放在 git 中備份的，就可新增.gitignore的檔案，並在內文打上不要需要備份的檔名， git 皆自動不將它儲存
![.gitignore範例](https://miro.medium.com/max/3908/1*X6UVZ7rO_RSttGQTs_pv2w.png)

>提醒 `.gitignore`的檔案也要一併 commit ，共同開發的夥伴，才知道哪些檔案被邊緣了

----

###### 分支多重要
學會了基本指令後，就要談到分支。每次新開發一個功能就請創一個新的分支，並在新的分支上開發，因為
>**master 盡可能是穩定版**
**master 盡可能是穩定版**
**master 盡可能是穩定版**(很重要所以說三次)
養成好習慣已經合併到 master 主線 的分支就可以刪掉了～

以下會介紹分支相關的指令：


`git branch` ：產生分支
`git branch  < new-branch-name > -m `： 重新命名目前分支的名稱
`git switch <branch> `：切換分支
`git branch -v `：顯示目前所有分支與當前 commit
`git branch --list`：顯示目前所有分支
`git branch <branch-name> -d `：刪除分支
`git branch <branch-name>  commit id `：建立dev分支在特定的commit 上
>要跳到別的分支，可使用 checkout

-----

###### 合併分支用法
有兩種 merge 跟 rebase 兩種方法，merge 跟 rebase 差異
>merge ：我拉別人－我在主線 拉分支
rebase ：別人拉我 －我跳到分支 拉主線

為了避免容易搞混，可以擇一使用就好(我傾向用merge)

`git merge 指定分支`：我在主線，拉指定分支

`git rebase master`：我在主線，拉指定分支

補充
>fast-forward ：快進(只需要移動分支)。rebase的概念
![rebase的概念](https://static.coderbridge.com/img/vick12052002/465dc170ce8c44b3bd79ef444e6420a8.png)


>no fast-forward ：一定會產生commit ，因此會有節點，優於未來尋找分支方便。merge的概念
![merge的概念](https://static.coderbridge.com/img/vick12052002/32f20007476546678a46010c0c9b982d.png)

----
##### 瞬間移動（切換版本）
現在你已經會基本指令，也有分支的概念了，這邊簡單教你如何切換到指定的版本，有好幾種方法，不過在使用每種瞬移，都會有些區不同影響到本地端區域（工作區、暫存區、本地 repo ）
，所以在使用前，一定要清楚了解，會動到哪個部分喔！
![切換](https://static.coderbridge.com/img/vick12052002/ab259fa5b21f478d8f655b4fe25d26cf.png)

`git revert (-n) `：回復 commit ，重做一個的意思 ( 不會重送出 commit )
revert 的恢復是有順序性
`git checkout `：**改變目前的版本/將 HEAD 轉移到指定 branch 上**，
* 有分 file － 工作目錄重設 
* commit / branch － 工作目錄， HEAD 重設


`git reset` 有分三種`--hard`/` --mixed`/` --soft` 三者皆會HEAD位置＆目前分支重設，**預設為--mixed**
#### hard & mixed 的差異
>差異為 hard 工作目錄區也會一併重設

----
#### 遠端 repo 我來了
首先去創一個 GitHub 的帳號，
1. 新增一個 遠端的 repo
2. clone repo的網址 `git clone url`
3. 新增 origin 這個遠端分支，url 是 gitHub 的網址，通常都用 origin 來稱呼遠端
`git remote add origin url`
4. git pull <遠端的名稱><目前使用的分支>
  `git pull origin master `
5. 將本地端的 repo 推到遠端 `git push <遠端的名稱><目前使用的分支>`

----

看完以上你學會基本操作 git 了

* 本地端 （個人使用）
```
git init 初始化
git config 設定帳號＆信箱
git branch <branch-name> 建立新的分支 (原本在 master )
git checkout <branch-name> 跳到分支
git add <file> 檔案加入暫存區
git commit -m"" 暫存區檔案，加入本地端新的資料夾 
```
* 遠端 ( 總之放在 GitHub 上，公開資料夾，除非你付費鎖起來 )

```
git clone < GitHub repo url > 複製遠端資料夾到本地
git push origin <branch/master> 將在本地的資料夾推上遠端
git pull origin <branch/master> 將在遠端的資料夾拉回本地 
```
* 狀態查詢

```
git status 查看暫存區與工作目錄狀態
git log --all 查看目前所有 commit 內容
git branch -a/-v 查看所有分支
git config ----list 查看目前設定的項目
```

就這幾點蔡哥，如果還不懂的話，多練習你就會了！