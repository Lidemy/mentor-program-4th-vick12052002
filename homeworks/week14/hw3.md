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
搶票系統


## NoSQL 跟 SQL 的差別在哪裡？
NoSQL: 非關連式資料庫，SQL 關連式資料庫與儲存資料的方式不同，沒有 table schema 的概念，因此也沒有 join 這個用法 ，資料庫表現方式比較彈性，


## 資料庫的 ACID 是什麼？
是為了保證「 事務 transaction 」正確且可靠，衍伸出必須具備四大特性，分別為

一個事務

原子性（atomicity，或稱不可分割性）
一致性（consistency）
隔離性（isolation，又稱獨立性）
持久性（durability）
