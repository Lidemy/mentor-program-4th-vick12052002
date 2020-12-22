## 請列出 React 內建的所有 hook，並大概講解功能是什麼

### 基礎的 Hook

`useState`
* 在 function component 內，用來管理資料的狀態
* 首次 render ， state 的值與 `initialState` 相同
* 更改狀態則用 `setState(xxx)` 
* 若資料狀態改變，預設情況下，則重新 render function 
```js
const [state, setState] = useState(initialState);
```

`useEffect`
* 在 component render 後，所執行的 function，等同於 `componentDidMount` 的功能
* 有兩個參數可以設定，第一個為要執行的 function，並在 function 中回傳 function 可做到 `componentWillUnmount` 的功能
* 第二個參數為 dependency array，這個 effect 中所仰賴的 state，當 dependency array 內的狀態改變，則觸發該 function，等同於`componentDidUpdate`，如果傳入 [] 空陣列，則該 effect 只會觸發一次，就像`componentDidMount`
* 通常在此向外部 API 拿取資料等
```js
useEffect(
  () => {
    const subscription = props.source.subscribe(); 
    return () => {
      subscription.unsubscribe(); //componentWillUnmount
    };
  },// componentDidMount
  [props.source], //componentDidUpdate
);
```

`useContext`
* 在最上層宣告需要在多個 component 中共同使用的 props，並透過`MyContext.Provider`將 component 包覆起來，讓下層的所有 component 可方便讀取到 props
* 讓上下跨多層的 component 間溝通更加容易，可避免 Props drilling （ 在多個 component 中 props 傳遞，讓 component 幫忙傳遞與自己不相關的資料 ）
* styled component 的 Theme Provider 實作原理

```js
const value = useContext(MyContext);
```


### 額外的 Hook

`useReducer`
* useState 的替代方案，適用於較複雜的 state 邏輯
* 當你需要複雜的 state 邏輯而且包括多個子數值或下一個 state 依賴之前的 state

```js
const [state, dispatch] = useReducer(reducer, initialArg, init);
// 第二參數傳入初始狀態
useReducer(reducer, { count: 0 });
// 第三參數傳入回傳初始狀態的函式，第二參數傳入此函式的參數
useReducer(reducer, 0, count => ({ count }));
```

`useCallback`
* 回傳一個 memoized 的 callback，可減少不必要的 render 
* 第二個參數與 `useEffect` 中的`dependency array`語法相似，不同的地方是 useCallback 會回傳一個函式，只有當 dependencies 有改變時，這個回傳的函式才會改變
* 如果 dependencies array 中的值在沒有被修改的情況下，它會幫我們記住 Object，防止 Object 被重新分配記憶體位址
* 讓 props 的 Object 能夠在父元件重新渲染時，不重新分配記憶體位址，讓 memo 不會因為重新分配記憶體位址造成渲染。
* `useCallback(fn, deps)` 相等於 `useMemo(() => fn, deps)`

`useMemo`
* 主要用在當元件重新渲染時，減少在元件中複雜的程式重複執行。
* useMemo 只會在依賴改變時才重新計算 memoized 的值
* 可以避免在每次 render 都進行昂貴的計算，如果沒有提供第二個參數，則每次都會 render

`const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);`


`useRef`
* 回傳一個 mutable 的 ref object，永遠指向同一個元素
* 透過 `___.current` 屬性可以取得預設值或更動後的值 ()
* 當我們在 React 組件中想要定義一些「變數」，但當這些變數改變時，又不需要像 state 一樣會重新導致畫面渲染的話，就很適合使用 useRef


`useImperativeHandle`
* 可以讓使用 ref 時能向父 component 暴露自定義的 instance 值
* useImperativeHandle 應與 forwardRef 一同使用，運用 forwardRef 來建立一個新的 React component 並將 ref 屬性轉交到底下的另外一個 component。

`useLayoutEffect`
* 與 `useEffect` 功能相同，只不過執行時間不同，`useLayoutEffect`是執行結束後，才 render 畫面
* 但可能會導致阻塞渲染，需謹慎使用

`useDebugValue`
* 用在 custom hooks 裡面，類似 console.log，會在 React DevTool 裡面顯示 custom hook 的名稱與 debug 的值
* 可以用來在 React DevTools 中顯示自訂義 hook 的標籤


資料來源：
[Hooks API 參考](https://zh-hant.reactjs.org/docs/hooks-reference.html#usecontext)
[React Hooks 筆記](https://medium.com/@scars.yao/react-hooks-%E7%AD%86%E8%A8%98-9f9d99c0b72e#d441)
[React 性能優化那件大事，使用 memo、useCallback、useMemo](https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/react-optimize-performance-using-memo-usecallback-usememo-a76b6b272df3)
## 請列出 class component 的所有 lifecycle 的 method，並大概解釋觸發的時機點

![](https://i2.wp.com/programmingwithmosh.com/wp-content/uploads/2018/10/Screen-Shot-2018-10-31-at-1.44.28-PM.png?resize=1024%2C567&ssl=1)

### Lifecycle Methods 可以分為三大類：

`Mounting` - 裝載，當元件被加入到 DOM 中時會觸發
`Updating` - 更新，當元件的 `props` 或 `state` 更新，重新渲染 (re-rendered) DOM 時會觸發
`Unmounting` - 卸載，當元件要從 DOM 中被移除時會觸發
`Error Handling` - 例外處理，當元件發生 JavaScript errors 時會觸發

Lifecycle Methods 如果是 will 開頭的，表示在某個事件發生「之前」，會執行這個方法；
如果是 did 開頭的，表示在某個事件發生「之後」，會執行這個方法

在 Mounting 掛載（建立）階段，會依序執行：

1. `constructor()`： Component 在建立的時候，如果有初始化 state 或綁定 method，就絕對需要寫 constructor，他可建構初始化物件，元件如有使用到 props 就必須寫` super(props)`繼承父類別，綁定 method。若無需要，則可略過。

```js
constructor(props) {
  super(props);
}
```

2. `static getDerivedStateFromProps()`：在 Component 被 render 前執行
3. `render()`
4. `componentDidMount()`：在 component 被 mount（ 加入 DOM tree 中 -> 初步 render 結束 ）後，簡單來說「 初次 render 後要執行的動作」，通常建議於此 call 外部的 API

在 Updating 更新階段，會依序執行：

1. `static getDerivedStateFromProps()`：在 Component 被 render 前執行
2. `shouldComponentUpdate()`：在新的 prop 或 state 被接收之後並在該 component 被 render 之前被呼叫，可判斷 `nextProps`、`nextState` 任一參數，決定是否再次 render，如果回傳 false 則不繼續 3 ~ 5 步驟，目的為「 效能最佳化 」
3. `render()`
4. `getSnapshotBeforeUpdate()`：在 render 後，更新 DOM 前被呼叫執行，
5. `componentDidUpdate()`：會在更新後馬上被呼叫，初次 render 時並不會被呼叫

`Unmounting` 可執行：

1. `componentWillUnmount()` :當元件要從 DOM 上移除時，React 會執行 `componentWillUnmount()`，在 `componentWillUnmount` 中可做資源清除的動作，例如：清除綁定 eventlistener、 cookie、local storage 等等。

`Error Handling` 錯誤邊界：
提供生命週期內遇到 JavaScript 錯誤訊息，將其錯誤訊息呈現在 UI 上

1. `static getDerivedStateFromError()`
2. `componentDidCatch()`

資料來源：
[React Lifecycle Methods – A Deep Dive](https://programmingwithmosh.com/javascript/react-lifecycle-methods/)
[React Life Cycle 生命週期更新版，父子元件執行順序](https://iamian.cc/reactlife/)

## 請問 class component 與 function component 的差別是什麼？

在 component 不需要使用 state 的前提下，只需要回傳簡單的內容或 render 內容，使用 function component 就可以了，function component 在程式碼上相較 class component 較為簡潔。

原本的 function component 內是不允許 state 存在，在 React 16.8 出現後，新增 hook 功能，可以在 function component 內透過 hook ，例如：useState 管理 state 、 useEffect 取代原 class component 中的 lifeCycle，且程式碼較為簡潔、可讀性較好

class component：可以做到的事比較多，可操作 state 、 自帶生命週期，class component 可以從 this.props.onChange 拿到最新的屬性
function component：程式碼簡潔、方便，不可操作 state，只可單純接收 props，並渲染資料（ React 16.8 前 ），透過 hook 可方便操作 state 等等， Function component 的每次 render，都是「 重新 」呼叫一次 function，會記住當下傳入的值

## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？
兩者差異在於「 資料是否受 react 控制 」
controlled component ：受控制
uncontrolled component ：不受控制

過去我們使用 jquery 讀取到 DOM 上 input element 的 value 值，再將該值做操作，這種方式就是表單資料不受 react 所控制，在 react 中要實踐該方式，可透過 `useRef`
```js
const refObj = useRef(initialValue);
const InputElement = () => (
  <input ref={refObj} />
)
```
useRef 內可以放進一個預設值（initialValue），useRef 會回傳一個物件（refObj），這個物件會一直指稱到同一個物件，在回傳的物件中，透過 `refObj.current` 屬性可以取得預設值或更動後的值 ()

適當使用時機：當我們在 React 組件中想要定義一些「變數」，但當這些變數改變時，又不需要像 state 一樣會重新導致畫面渲染的話，就很適合使用 useRef


react 是建議透過 react 來管理所有資料狀態，所以 controlled component 的做法是在表單元素上綁定 onChange 的事件，來取得當前的 value ，在立刻更新到指定 state 上，而 state 改變後，重新渲染畫面

適當使用時機：狀態改變會影響畫面渲染時，建議使用