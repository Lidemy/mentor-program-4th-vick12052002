## 為什麼我們需要 React？可以不用嗎？
React 主要的特點有 state、Virtual DOM、模組化元件的概念，以往我們煩瑣地操作 DOM 上的節點，而導致效能損耗，但 Virtual DOM 出現改變這樣的情況，Virtual DOM 的原理是將當前 state 的資料以 props 的方式由父元件傳送到每個子元件（也就是 components ），收到 props 後，會產生 Virtual DOM 並與前一個 state 的 Virtual DOM 比對，如果有改變的地方，就會實際改變 DOM ，而這樣的過程，減少了我們反覆的操作 DOM 。

第二點是模組化元件，我們可將反覆使用的元件模組化，區隔不同組件的程式碼。

第三點是單一資料流處理，因為畫面是由資料的狀態 state 來進行 render ，因此可避免畫面與資料不相同，但如果特地使用某些 hook 就不一定。

不必使用 React，我們當然可以做到相同功能、目的，但總歸一句使用什麼樣的工具，一切取自於你的目的、專案大小、自己的喜好、團隊規範。

## React 的思考模式跟以前的思考模式有什麼不一樣？
`畫面 -> 撈資料`
在尚未學習 React 以前，總是想著把畫面上的資料，以 DOM 節點的方式擷取下來，再進行操作。
`資料 -> 影響畫面 `
但學習 React 後，反而是將資料獨立出來，並透過操作資料的狀態(state)，來影響畫面的呈現，因此當資料變動時，畫面就一定會重新 render，確保資料與畫面一定同步。
`資料 -> 影響畫面 `
而且在寫 code 前可先思考哪些元件是可重復性使用的，可將原件獨立成 components 重複使用。

## state 跟 props 的差別在哪裡？
state 是個狀態，用儲存資料目前的狀態，因此在 react 中，有 useState 這個 hook ，可用來變動資料的狀態，當 state 變動後，依據當前 state ，components 會收到相對應的 props ，因而再次 render 畫面 。

components 藉由 props 來傳遞值（參數），在 components 中，是不得任意改變 props 的值，僅能從父元件中逐一向子元件傳遞 props，因此我們可以說 props 是唯獨的狀態。
