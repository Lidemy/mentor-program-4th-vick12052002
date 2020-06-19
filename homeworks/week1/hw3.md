## 教你朋友 CLI

嗨  h0w 哥

command line 簡單來說就是**以純文字的方式告訴電腦你要它做什麼**，我們可以把，一行行的指令視為一個程式。

而我們在用電腦時，所看到的 icon、新增資料夾功能 等，其實是圖型化介面 GUI ，可以把它想像成 command line 穿了一件好看的衣服，讓你方便使用。

要使用  command line 首先要有可以與電腦溝通的平台:
 
>*  mac ：可以直接搜尋電腦中的 terminal 終端機
>*  windows：可以直接搜尋電腦中的 cmd.exe 或是去下載 [git](https://git-scm.com/)，安裝完後 git-bash 就是等同於 cmd.exe

溝通平台創好了，先教你幾個**必學的指令**

### 基本指令
* 印出**該位置下**的所有檔案 lists all files
  * 後可加參數 
  * 參數 l：所有細節
  * 參數 ａ：包含隱藏檔案
  ```
    ls 
    ls -l
    ls -a
    ls -al (綜合技：詳細列出所有檔案，包含隱藏檔案)
    ```
  
* 印出**現在位置**  prints working directory

    ```
    pwd
    ```
* 改變/移動位置 change directory

    ```
    cd (目標位置)
    cd .. (回到上一層)
    ```

* 使用手冊 manual（教你怎麼用指令）
**按Ｑ會跳出手冊**

    ```
    man (指令)
    ex. man ls
    ```   

* 清除版面 clear

    ```
    clear
    ```

* 印出所打文字 echo

    ```
    echo "打打文字"
    => 印出“打打文字”，
    ````
###  檔案操作相關指令


* 更改時間 (已存在檔案) / 建立檔案(尚未存在的檔案)

    ```
    touch (檔案名稱)
    ```

* 刪除檔案 deletes files

    ```
    rm (檔案名稱)
    ```
 
 * 刪除資料夾 deletes directory (include all of its child directories.)

    ```
    rm -r (資料夾名稱)
    rmdir (資料夾名稱)
    ```
 
 * 移動檔案 / 改檔名 move 
以下可參考[相對 絕對 傻傻分不清楚](https://alirong.coderbridge.io/2020/06/14/week1-relative-absolute/) 

    ```
    mv 檔案名稱 相對路徑
    mv text.txt Desktop（相對路徑，目前在/Users/alirongrong）
    mv 檔案名稱 絕對路徑
    mv text.txt /Users/alirongrong/Desktop （絕對路徑）
    ```


 *  建立資料夾 make directory

    ```
    mkdir  folder
    ```

 *  複製檔案 copy

    ```
    cp text.txt (新的檔名)
    cp -r folder (新的資料夾名稱) 
    ```

 *  印出檔案內容 cat

    ```
    cat 檔案名稱
    ```

 *  印出檔案內容(分頁式) less

    ```
    less 檔案名稱
    ```

 *  抓取檔案內容指定關鍵字 grep

    ```
    grep 指定文字 (目標檔案) 
    => 列出含有指定關鍵字的行
    ```

----
### 超強綜合技

 *  **\>**  重新導向Input Output, redirection

    ```
    ls -al > 123
    => 將列出ls -al 的資料存到 123 這個檔案中
    ----
    echo "我是文字" > 123.txt
    => 將"我是文字"的資料存到 123.txt 中
    但要注意 123.txt 會先被清空，再導入“我是文字”
    ```

 *  **\>>**  新增內容 append to the end of the file
 
    ```
     echo "我是文字" >> 123.txt
     =>將"我是文字"的資料存到 123.txt 中
     因為是 append 的方式，所以不會將 123.txt 檔案清空，則是在放面新增
    ```
 * **|**  pipe 指令的組合技
 
    左邊指令的輸出 給 右邊指令的輸入
    ```
    cat text.txt | grep "我是文字" >> 123.txt
    => 在 text.txt 的檔案中，抓取 "我是文字" 這個關鍵字，並 append to 123.txt
    ```
----
最後來解答一下 h0w 哥你的問題

*建立一個叫做 wifi 的資料夾，並且在裡面建立一個叫 afu.js 的檔案*

```
mkdir wifi (建立一個叫做 wifi 的資料夾)
cd wifi (移動位置到 wifi 資料夾中)
touch afu.js (建立一個叫 afu.js 的檔案)
```

就是這麼簡單拉～ 