## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫


## `include`、`require`、`include_once`、`require_once` 的差別


## 請說明 SQL Injection 的攻擊原理以及防範方法
*攻擊原理*：在為設定過濾惡意程式碼的情況下，資料庫伺服器會直接接收使用者所輸入的 SQL 指令並執行攻擊代碼，使攻擊者能夠取得最高權限，得以擅自竊取、修改、挪用或刪除資料的可能。
*防範方法*：
1. prepared statement


##  請說明 XSS 的攻擊原理以及防範方法
全名為 Cross-site scripting 跨網站指令碼，是一種網站應用程式的安全漏洞攻擊，是代碼注入的一種。它允許惡意使用者將程式碼注入到網頁上，其他使用者在觀看網頁時就會受到影響。這類攻擊通常包含了HTML以及使用者端手稿語言。

*攻擊原理*：通過網頁開發時留下的漏洞，利用資安漏洞注入惡意程式碼在網頁上，使用戶載入並執行攻擊者惡意製造的網頁程式，通常是使用 JavaScript 來這惡意輸入，其實也可使用 Java、HTML 等等方式造成使用戶的資料外洩、攻擊者可得到更高權限（進行一些操作）、私密網頁內容、對談、cookie 等

*防範方法*：
1. 過濾特殊字元：可以利用後端程式語言所提供的語法，將內容進行過濾。例如：PHP`htmlentities()`或是`htmlspecialchars()`、Python 的`cgi.escape()`、ASP 的 `Server.HTMLEncode()`等等
2. 使用 HTTP 的 header 指定類型：可以使用 HTTP  header 指定內容的類型，使得輸出的內容避免被作為 HTML 解析

資料來源：[跨網站指令碼](https://zh.wikipedia.org/wiki/%E8%B7%A8%E7%B6%B2%E7%AB%99%E6%8C%87%E4%BB%A4%E7%A2%BC)