/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable no-useless-escape */
// 在一開始輸入檔案就先設定一個 object 存放 todo 項目
let todoList = [];
const id = window.location.search;
function escape(toOutput) {
  return toOutput.toString().replace(/\&/g, '&amp;')
    .replace(/\</g, '&lt;')
    .replace(/\>/g, '&gt;')
    .replace(/\'/g, '&quot;')
    .replace(/\'/g, '&#x27')
    .replace(/\//g, '&#x2F');
}
function appendDOMitem(val, todoId, is_deleted, is_completed) {
  const toDoContainer = $('.todos');
  const element = `<li class="list-group-item  todoItem ${is_deleted ? 'is_deleted' : ''} ${is_completed ? 'order-1' : ''}" todo-id="${escape(todoId)}">
  <div class="d-flex justify-content-between align-items-center"" >
    <span class="${is_completed ? 'done' : ''}">${escape(val)}</span>
    <div class="btn-group " role="group" >
      <button type="button" class="btn btn-primary finish-btn">${is_completed ? 'unfinished' : 'finish'}</button>
      <button type="button" class="btn btn-success mx-1 edit-btn">edit</button>
      <button type="button" class="btn btn-info del-btn">delete</button>
    </div>
  </div>
</li>`;
  toDoContainer.append(element);
  $('.is_deleted').hide();
}
function save(tokenId, data) {
  const url = `http://mentor-program.co/mtr04group5/alirong/week12/hw2/api_add_todo.php${tokenId}`;
  $.ajax({
    type: 'POST',
    url,
    dataType: 'json',
    data: {
      content: data,
    },
    success: (res) => {
      window.location = `index.html?id=${res.token_id}`;
      alert(res.message);
    },
    error: () => {
      alert('error');
    },
    // eslint-disable-next-line consistent-return
  });
}
function convertType(array, isJSONType) {
  if (isJSONType) {
    return JSON.parse(array);
  }
  return JSON.stringify(array);
}
function handelUpdateTodoContent(e, container, tokenId) {
  e.preventDefault();
  const updateValue = $('.update-item-form input[type=text]').val();
  if (updateValue === '') {
    alert('請輸入更新資料');
  } else {
    const nowSpan = `<span>${escape(updateValue)}</span> `;
    container.find('.update-item-form').replaceWith(nowSpan);
    todoList[tokenId].content = updateValue;
  }
}
function editTodoItem(e) {
  const target = $(e.target);
  const todoItem = target.closest('.todoItem');
  // 如果項目已完成，不可更改名稱
  if (todoItem.hasClass('order-1')) {
    return;
  }
  const todoId = todoItem.attr('todo-id');
  const content = todoItem.find('span').html();
  const span = todoItem.find('span');
  const form = ` <form class="update-item-form d-flex" method="POST"  >
  <div class="form-group d-flex mb-0 flex-column flex-sm-row">
    <input type="text" class="form-control-lg  mr-0 mr-sm-1 flex-grow-0 bg-light flex-sm-grow-1"  value=${content}>
    <button type="submit" class="btn btn-primary flex-grow-0 flex-sm-grow-0 mt-2">Submit</button>
  </div>
</form>`;
  span.replaceWith(form);
  $('.update-item-form').submit((event) => {
    handelUpdateTodoContent(event, todoItem, todoId);
  });
}
function handleTodos(event, hideTarget, showTarget) {
  event.preventDefault();
  $('.nav-link').removeClass('active');
  $(event.target).addClass('active');
  if (hideTarget) {
    hideTarget.hide();
    showTarget.show();
  } else {
    $('.todoItem').show();
  }
  $('.is_deleted').hide();
}
$(document).ready(() => {
  function render() {
    $('.todos').empty();
    for (let i = 0; i < todoList.length; i += 1) {
      const todoId = String(todoList[i].id);
      const content = String(todoList[i].content);
      const { is_deleted } = todoList[i];
      const { is_completed } = todoList[i];
      appendDOMitem(content, todoId, is_deleted, is_completed);
    }
  }
  if (id) {
    $.getJSON(`http://mentor-program.co/mtr04group5/alirong/week12/hw2/api_todos.php${id}`,
      (data) => {
        const todos = convertType(data.discussions[0].content, true);
        todoList = todos;
        render();
      });
  }

  function addTodoItem(e) {
    e.preventDefault();
    const inputValue = $('input[type=text]').val();
    if (inputValue === '') {
      alert('請填入資料');
    } else {
      const todoId = todoList.length;
      const todoObj = {
        id: todoId,
        content: inputValue,
        is_deleted: false,
        is_completed: false,
      };
      todoList.push(todoObj);
      render();
      $('input[type=text]').val('');
    }
  }
  function deleteTodoItem(e) {
    const target = $(e.target);
    const todoId = target.closest('.todoItem').attr('todo-id');
    todoList[todoId].is_deleted = true;
    render();
  }
  function isDoneTodoItem(e) {
    const target = $(e.target);
    const todoId = target.closest('.todoItem').attr('todo-id');
    if (todoList[todoId].is_completed) {
      todoList[todoId].is_completed = false;
    } else {
      todoList[todoId].is_completed = true;
    }
    render();
  }
  const toDoContainer = $('.todos');
  $('.all-tasks').addClass('active');
  // 判斷項目完成
  $('.todos').on('click', '.finish-btn', isDoneTodoItem);
  // 編輯項目內容
  $('.todos').on('click', '.edit-btn', editTodoItem);
  // 刪除項目
  $('.todos').on('click', '.del-btn', deleteTodoItem);
  // 新增項目
  $('.add-list-form').submit(addTodoItem);
  // 清除紀錄與資料
  $('.clear-btn').on('click', () => {
    toDoContainer.empty();
    todoList = [];
  });
  // 儲存資料
  $('.save-btn').on('click', () => {
    const data = convertType(todoList, false);
    save(id, data);
  });
  // 篩選狀態
  $('.completed').on('click', (e) => {
    handleTodos(e, $('.todoItem:not(.order-1)'), $('.order-1'));
  });
  $('.working').on('click', (e) => {
    handleTodos(e, $('.order-1'), $('.todoItem:not(.order-1)'));
  });
  $('.all-tasks').on('click', (e) => {
    handleTodos(e, null);
  });
});
