```js
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // ??
obj2.hello() // ??
hello() // ??
```

可以看成
```js
obj2 = {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }

hello = function() {
      console.log(this.value)
    }
```
`obj.inner.hello()` 和 `obj2.hello()` 其實指向的儲存記憶體是一樣的，因為`obj2 = obj.inner` 因此都是 `obj.inner`，故他們都會印出 `obj.inner`內的value 為 2

而 `hello()` 就只是個
```js
 function() {
      console.log(this.value)
    }
```
，所以他的 this.value 也只會是 undefined
 

因此
`obj.inner.hello()`  會輸出 2
`obj2.hello()`  會輸出 2
`hello()`  會輸出 undefined