## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼
VARCHAR :可變最大長度（0 ~ 65,535)，盡可能使用這種型態，因可自由設定最大長度限制，可省去不必要的儲存空間，按「 字符長度 」占用空間，但會有1-2字節來記錄數據大小，支援索引（）。

TEXT:可存最大長度（65,535)，按照「 字符數量 」來佔用空間，但是記錄在數據之外，不占用數據的空間，不可放上索引（全文索引除外）。

[Difference between VARCHAR and TEXT in MySQL](https://stackoverflow.com/questions/25300821/difference-between-varchar-and-text-in-mysql)

## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又是怎麼把 Cookie 帶去 Server 的？

在網路的世界裡，HTTP 必須是無狀態 (Stateless) 的，發送每一個 request 都被視為唯一且獨立的（互不影響），但有時候我們需要 Client 端知道某些資訊，例如：我已經登入會員，依照 Stateless 的情況，Client 端是不知道是否登入的狀態，因此需要靠瀏覽器中的 Cookie 與 Session 來儲存狀態。

1. 瀏覽器發送 Request 到 Server 端，Server 要在瀏覽器上設置 Cookie （例如'user':'123'），因此在 Response 中設定 Set-Cookie header
2. 目前瀏覽器已儲存了'user'這個 key 在 Cookie 中
3. Client 端在 Request 的 header 內夾帶 Cookie 的資料‘user‘:’123‘，在 Server 端接收到 Cookie 指定的 Key 且 Value 與資料庫的內容核對正確後， Server 端回傳 Response 就會依據 Cookie 內的資料，顯示目前是會員登入的狀態 (Server 端依據 Cookie 來顯示狀態)。

## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？
1. 明文密碼：只要有心人士可以成功讀取到資料庫內的資料，就密碼外洩
2. 註冊會員表單內容，帳號或密碼如果有人惡意填寫一些破壞程式碼，可能會造成資料庫資料外洩、網頁掛掉
