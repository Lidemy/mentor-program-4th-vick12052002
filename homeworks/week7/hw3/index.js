document.addEventListener('DOMContentLoaded', () => {
  const toDoInput = document.getElementById('todo_input');
  const toDoList = document.getElementById('todo_list');
  console.log('ready');
  function addToDoItem(val, id) {
    if (val.length === 0) {
      // eslint-disable-next-line no-alert
      alert('type something!');
      return false;
    }
    const li = document.createElement('li');
    li.classList.add('todo_item');
    li.innerHTML = `<label for="${id}" class="todo_item_text">
    <input type="checkbox" name="${id}" id="${id}">
    <span class="checkbox"></span>${val}
    </label>
    <span class="btn_del"></span>`;
    return toDoList.appendChild(li);
  }
  function getList() {
    if (localStorage.getItem('data') === null) {
      const toDoListLocal = [];
      localStorage.setItem('data', JSON.stringify(toDoListLocal));
    }
    if (localStorage.getItem('data') !== null) {
      const toDoArray = JSON.parse(localStorage.getItem('data'));
      for (let i = 0; i < toDoArray.length; i += 1) {
        addToDoItem(toDoArray[i].value, toDoArray[i].id);
      }
    }
  }
  function getRandomId() {
    const i = Math.random(1) * 1000;
    return Math.floor(i);
  }
  function escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
  function addList(val, idNum) {
    const toDoArray = JSON.parse(localStorage.getItem('data'));
    const newLi = {
      id: idNum,
      value: val,
    };
    toDoArray.push(newLi);
    localStorage.setItem('data', JSON.stringify(toDoArray));
  }
  function delList(delId) {
    const toDoArray = JSON.parse(localStorage.getItem('data'));
    const newArray = [];
    for (let t = 0; t < toDoArray.length; t += 1) {
      if (toDoArray[t].id !== Number(delId)) {
        newArray.push(toDoArray[t]);
      }
    }
    localStorage.setItem('data', JSON.stringify(newArray));
  }
  getList();
  document.getElementById('todo_list').addEventListener('click', (e) => {
    const el = e.target;
    const li = el.closest('.todo_item');
    const checkbox = el.closest('input[type="checkbox"]');

    if (el.classList.contains('btn_del') && !(li.classList.contains('completed'))) {
      const id = li.childNodes[0].getAttribute('for');
      delList(id);
      li.remove();
    }
    if (checkbox !== null) {
      if (checkbox.checked) {
        li.classList.add('completed');
      } else {
        li.classList.remove('completed');
      }
    }
  }, true);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && toDoInput.value !== 0) {
      const id = getRandomId();
      addToDoItem(escapeHtml(toDoInput.value), id);
      addList(escapeHtml(toDoInput.value), id);
      document.getElementById('todo_input').value = '';
    }
  });
});
