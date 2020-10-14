## 什麼是 DNS？Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？
Domain Name System 域名管理系統，將用戶的域名轉向實際的 IP address，像是 google.com 就是 google 的域名，而當我們在瀏覽器中輸入 google.com，其實網路世界不知道 google.com 它是誰，電腦只認 IP 位置，所以就需要仰賴 DNS 將 google.com 轉化成 216.58.200.35:443，電腦才知道要跟誰拿資料、去哪個位址。

根據不同的網路供應商或業務範圍，會提供不同的 DNS 主機位址。以台灣為例，中華電信的 DNS 主機位址，因業務範圍涵蓋一般網路、行動通訊、數據通訊等，DNS 主機分為兩個：
dns.hinet.net，IP 位址為「168.95.1.1」。
hntp1.hinet.net，IP 位址為「168.95.192.1」。

以上是由網路供應商所提供的 DNS，而 Google 也有提供免費公開的 DNS ，對 Google 的好處以及對一般大眾的好處是什麼？

Google 的好處: 收集大數據資料（ 進而日後可提供更符合該地區性的資料 ）、
一般大眾的好處: 免費使用、號稱上網速度比較快（因直接取得 DNS 查詢結果，讀存快取）、提升網路安全（可以自動幫我們將惡意網站擋下來或做其他應用）

不過俗話說，不用錢的最貴，所以在考量是否要使用 Google 公開的 DNS 前，可以多參考一些資料，蠻推薦這篇文章[使用 Google Public DNS 服務，上網速度不一定會變快！](https://blog.miniasp.com/post/2009/12/08/Use-Google-Public-DNS-may-not-surfing-faster-as-you-expected) ，有很多細節執得我們去思考。

小題外話：
IP 位址又可分為 IPv4 與 Ipv6，因為 IPv4 不夠用了，而衍生出基於 IPv4 規則且可以使用的數量更多的 Ipv6。

IPv4：當前是主流IP地址，由 32 位組成 (2^32-1)。可以使用大約 43 億個地址。
它表示為由 3 個點分隔的 4 個部分的集合，每個部分都有 8 位數據，稱為八位位組。
例如：192.168.1.123

IPv6（Internet協議版本6）:基於IPv4平台開發的地址表示規則，以滿足 IPv4 限制。
它由128位組成 (2^128-1)，可以使用大約 340 個十億個 IP 地址，比 IPv4 還要多。
例如：0000：0000：0000：0000：0000：ffff：c0a8：017b

參考資料：
[台灣地區電信供應商 ISP 專用 DNS 主機／域名解析伺服器列表](https://www.vedfolnir.com/dns-server-of-isp-in-taiwan-26112.html)
[Google 更快更安全的 DNS 伺服器：8.8.8.8 與 8.8.4.4 （含 iPv6）](https://briian.com/6667/)
[IPv4到IPv6轉換器](https://zh-tw.rakko.tools/tools/23/)

## 什麼是資料庫的 lock？為什麼我們需要 lock？


有兩個事務在處理的過程中，試圖操作同個資料庫的同一個領域，資料會因兩個事務的操作彼此會相互影響，導致資料庫產生初的結果是錯誤的，為了避免這樣的狀況發生，而產生了 lock 這個語法。

lock 在資料的被讀取或是寫入的時候就會被做一個記號，這個記號用來告知該資料正在被讀取或是寫入的狀態。當我們使用 lock 後，如果同時有兩筆交易試圖操作同個資料庫的同一個領域時，資料庫會依據 lock 這個記號中的狀態是否要等待到該紀錄狀態結束，或是可以直接讀取該資料。

實際使用狀況：搶票系統

參考資料
[資料庫的交易鎖定 Locks](https://www.qa-knowhow.com/?p=383)

## NoSQL 跟 SQL 的差別在哪裡？
NoSQL(Not Only SQL): 非關聯式資料庫，與 SQL 關聯式資料庫儲存資料的方式不同，沒有 table schema 的概念（表格、欄、列），因此也沒有 join 這個用法 ，資料庫表現方式比較彈性，因此也衍伸出四大主流 NoSQL 資料庫：Key-Value資料庫、記憶體資料庫（In-memory Database）、圖學資料庫（Graph Database）、文件資料庫（Document Database）。

如果資料數比較龐大，相較 SQL 關聯式資料庫，更適合使用 NoSQL，因 SQL 關聯式資料庫多個 table 需要效能和容量較大的伺服器才能勝任， NoSQL 資料庫可以用更低的成本相同等級或更高的大型資料庫系統，如果遇到需要擴充資料庫的容量，只需要增加伺服器，反觀可減少長期維護資料庫的人力。

參考資料
[什麼是 NoSQL 資料庫？](https://aws.amazon.com/tw/nosql/)
[快速認識4類主流NoSQL資料庫](https://www.ithome.com.tw/news/92507)
[了解NoSQL不可不知的5項觀念](https://www.ithome.com.tw/news/92506)

## 資料庫的 ACID 是什麼？
是為了保證「 事務 transaction 」正確且可靠，可以將一個事務想像成一個任務或動作（交易），一個單位的事務必須具備四大特性，分別為

原子性（atomicity，或稱不可分割性）：要不就完整做完，要不就不做，沒有做到一半的任務，如果任務做到一半出錯，任務就回打回（這個動作稱之為「回滾」），資料狀態還是不變，不存在事情完成一半的狀態。

一致性（consistency）：在任務開始與完成後，資料庫必須是符合規範的狀態。

隔離性（isolation，又稱獨立性）：允許各個任務同時進行，但在任務未完成的資料並不會被其他的任務使用，直到這個任務完成。

持久性（durability）：任務完成後，對於資料的修改是永久性的，就算系統故障也不會不見。

參考資料
[維基百科－事務處理](https://zh.wikipedia.org/wiki/%E4%BA%8B%E5%8A%A1%E5%A4%84%E7%90%86)
[維基百科－ACID](https://zh.wikipedia.org/wiki/ACID)
