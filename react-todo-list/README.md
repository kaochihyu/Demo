## React Redux Todo List 
以 React Redux 製作的 todo list
* [Demo](https://kaochihyu.github.io/react-redux-todo-list/)

![Imgur](https://imgur.com/GfwDl2z.gif)

### Todo List 功能
* 基本功能 (新增、編輯、刪除 todo)
* 儲存、取消編輯
* 標記完成/未完成
* 清除已完成 todo 
* 標記所有 todo 已完成
* 篩選 todo 狀態(全部、完成、未完成)
* 計算完成率

![Imgur image](https://imgur.com/UDLb509.jpeg)

### 使用技術
* 以 React 為主
* 以 JSX 語法撰寫元件
* 搭配使用 styled-components 進行樣式撰寫
* 使用 redux store 管理狀態
* 使用 reducer 更新狀態 
* 使用 redux hooks 連結 react、redux

### 專案結構
* src/
  * components/
    * App/
      * App.js
      * App.test.js
      * index.js
      * AddTodo.js
      * Template.js
  * redux/
    * actions.js
    * selectors.js
    * actionTypes.js
    * store.js
    * reducers/
      * index.js
      * filters.js
      * todos.js
  * index.js
