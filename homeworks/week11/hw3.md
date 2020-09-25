## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫
加密（ Encrypt ）：加密與編碼有點相似，但差異在於加「 密 」，秘密的意思，因此使用加密、解密，必須要有金鑰（ key ），加密又可分為對稱式加密與非對稱式加密，非對稱式加密有兩把鑰匙，分別為「 私鑰與公鑰 」，私鑰（ 自己要藏好 ），公鑰則是可以公開，舉例小明需要傳機密給小黃，小明可以產生一組鑰匙，小黃有了小明的公鑰，看完機密後傳給小明，小明可用自己的私鑰解開，但只要你個鑰匙弄丟了、被攻擊者猜到就很危險。常見的加密演算法為 AES （ 對稱 ）、RSA（ 非對稱 ）。

雜湊（ Hash ）：把資料丟到一串公式後，計算出一個結果，是無法回推原字串，常見雜湊演算法有 SHA 系列（ SHA-256 ）、MD5、BLAKE2

兩者的差別在於：
* 加密需要密鑰，且可以透過解密得到原文。（ 加密可逆，一對一 ）
* 雜湊不需密鑰，無法逆向解出原始輸入。（ 雜湊不可逆，多對一 ）

而密碼存在資料庫中，考量資安問題，第一點不能儲存明碼，因此需要特殊編譯過後才能存入資料庫，為何我們選擇雜湊的方式，也是考量資安問題，從上文我們可以得知，雜湊過後的資料是不可逆的，為什麼不可逆，是因為他是多對一的關係，假設今天密碼 1234 與 5678 ，雜湊過後的亂碼是 8888 ，就算惡意攻擊者知道了雜湊過後的密碼為 8888，但由於雜湊是不可逆的，攻擊者無法得知原始的密碼為何。

#### 備註
編碼（ Encode ）：將一筆資料轉換成另一種形式，可以任意轉換，所以只要是熟悉轉換規則的人，很容易就可以解碼回原本的資料，並無安全性可言，就像中文翻譯成泰文，泰文對泰國人來說跟喝水一樣平常，所以很容易就可以知道資料想傳達的內容，常見的編碼有
1. encodeURI() & decodeURI()：在 JavaScript 中兩個很實用的 function ，將網址中特殊字元（ 空白、標點符號、中文等 ）編碼成符合 URL 格式
2. Base64：是一種可以把二進位的資料編碼成 ASCII 字元的方法
3. 霍夫曼編碼（ Huffman Coding ）：是一種用來進行「 無失真壓縮 」的編碼演算法，說穿了他的概念就是把常用的字記成縮寫，從而降低資料量、達到壓縮的效果。

參考資料
[一次搞懂密碼學中的三兄弟 — Encode、Encrypt 跟 Hash](https://medium.com/starbugs/what-are-encoding-encrypt-and-hashing-4b03d40e7b0c)
[加密和雜湊有什麼不一樣？](https://blog.m157q.tw/posts/2017/12/25/differences-between-encryption-and-hashing/)

## `include`、`require`、`include_once`、`require_once` 的差別

#### include
使用 include 語句可以告訴 PHP 提取特定的檔案，並載入它的全部內容，執行文件時每次都要進行「 讀取和評估 」，一般是放在流程控制的處理部分中。PHP 程序網頁在讀到 include 的文件時，才將它讀進來。這種方式適合用來引入動態的程式碼，可以把程序執行時的流程簡單化。

#### require
通常放在 PHP 程式碼的最前面，PHP 程序碼在執行前，就會先讀入 require 所指定引入的文件，使它變成 PHP 程序網頁的一部份。適合用來引入靜態的內容，例如：常用的 function，亦可以這個方法將它引入網頁中。

require 和 include 處理失敗的方式不同，require 在出錯時產生 E_COMPILE_ERROR 級別的錯誤。( 程式碼終止 )
換句話說將導致指令碼中止，而 include 只產生警告（ E_WARNING ），指令碼會繼續執行。（ 程式碼繼續 ）

>使用 include 和 include_once 語句的潛在問題是：PHP只會試圖匯入被請求匯入的檔案，即使該檔案沒有被找到，程式依舊會執行


### 有無 _once 差異
引入檔案前，會先檢查檔案是否已經在其他地方被引入過了，若有，就不會再重複引入。

資料來源
[include和require的區別](https://blog.xuite.net/ttddmon/oldfriend/12896656-include%E5%92%8Crequire%E7%9A%84%E5%8D%80%E5%88%A5)
[[PHP]include 與 require 的差別](http://syunguo.blogspot.com/2013/04/phpinclude-require.html)

## 請說明 SQL Injection 的攻擊原理以及防範方法
#### 攻擊原理：
在未設定過濾惡意程式碼的情況下，資料庫伺服器會直接接收使用者所輸入的 SQL 指令並執行攻擊代碼，使攻擊者能夠取得最高權限，得以擅自竊取、修改、挪用或刪除資料的可能。
#### 防範方法：
1. prepared statement: 使用 SQL 內建的字串拼接指令，來代替使用後端語言拼接字串

##  請說明 XSS 的攻擊原理以及防範方法
全名為 Cross-site scripting 跨網站指令碼，是一種網站應用程式的安全漏洞攻擊，是代碼注入的一種。它允許惡意使用者將程式碼注入到網頁上，其他使用者在觀看網頁時就會受到影響。這類攻擊通常包含了HTML以及使用者端手稿語言。

#### 攻擊原理：
通過網頁開發時留下的漏洞，利用資安漏洞注入惡意程式碼在網頁上，使用戶載入並執行攻擊者惡意製造的網頁程式，通常是使用 JavaScript 來這惡意輸入，其實也可使用 Java、HTML 等等方式造成使用戶的資料外洩、攻擊者可得到更高權限（ 進行一些操作 ）、私密網頁內容、對談、cookie 等

#### 防範方法：
1. 過濾特殊字元：可以利用後端程式語言所提供的語法，將內容進行過濾。例如：PHP`htmlentities()`或是`htmlspecialchars()`、Python 的`cgi.escape()`、ASP 的 `Server.HTMLEncode()`等等
2. 使用 HTTP 的 header 指定類型：可以使用 HTTP  header 指定內容的類型，使得輸出的內容避免被作為 HTML 解析

資料來源：[跨網站指令碼](https://zh.wikipedia.org/wiki/%E8%B7%A8%E7%B6%B2%E7%AB%99%E6%8C%87%E4%BB%A4%E7%A2%BC)


##  請說明 CSRF 的攻擊原理以及防範方法

全名為 Cross Site Request Forgery ，跨站請求偽造， 又稱作 one-click attack。

#### 攻擊原理：
使用者在被攻擊的忘夜且為已經登入的狀態下，運用一個假圖、隱藏連結的方式，讓使用者點擊或載入頁面時，在無意識的偽造使用者本人發出的 request。

#### 防範方法：
使用者的防禦：
  1. 每次在使用完網頁後就登出
  
Server 的防禦
  1. 檢查 request 的 header 中 referer 欄位(request 表示從哪裡來)，是不是合法的 domain，不是可以 reject，但方法不完善（有些瀏覽器不帶referer、有些使用者會關閉自動帶 referer 的功能）
  2. 加上圖形驗證碼、簡訊驗證碼（推薦）
  3. `csrftoken` 在表單中加上一個 hidden 的 input，value 由 server 隨機產生，並由 server 存在 session 當中，送出 submit 後，server會驗證 `csrftoken`是否與 session 中的相同，並且需每段的不同的 session 就該要更換一次。
  4. Double Submit Cookie - 與第三點相似，但不同於無需將 token 儲存於 session 中，而是儲存於 cookie 內，在送出表單後，server 會比對 cookie 內的 csrftoken 與 form 裡面的 csrftoken 是否相同，單仍有危險，若攻擊者得知你任何一個subdomain，就可以幫你來寫 cookie，還是可以順利攻擊
  5. client side 的 Double Submit Cookie ，方法同上，只要設置 header 名稱跟 cookie 名稱，設定好以後你每一個 request，它都會自動幫你把 header 填上 cookie 裡面的值。

browser 本身的防禦
  1. SameSite cookie（目前只支援Chrome）， SameSite 有兩種模式，Lax 跟 Strict（默認）可自己指定
      Strict（默認)：凡是「a href="", form, new XMLHttpRequest」只要是瀏覽器驗證不是在同一個 site 底下發出的 request，全部都不會帶上這個 cookie，但這樣會導致使用者體驗非常不好，點擊連結時都會變成登出狀態（ 因為不帶上cookie ），但因而衍生出解法：
        一、準備兩組不同的 cookie，第一組是讓你維持登入狀態，第二組則是做一些敏感操作的時候會需要用到的（例如說購買、設定帳戶等等）。第一種不設定 SameSite，因為攻擊者有了第一組的 cookie 也不能做什麼，所以沒差，第二組則設定，因而可完全擋去攻擊
        二、
      Lax :限制較鬆，「a href="", form, new XMLHttpRequest」都會帶上 cookie ，但就無法擋掉 GET 形式的CSRF

  
參考資料：
[讓我們來談談 CSRF](https://blog.techbridge.cc/2017/02/25/csrf-introduction/)