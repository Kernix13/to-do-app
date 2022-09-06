let input = document.querySelector("#new-to-do");
let todoItems = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

const list = document.querySelector('#todo-list');
const toggle = document.querySelector('#toggle');
localStorage.setItem('items', JSON.stringify(todoItems));
const hideInput = _ => {
  input.classList.toggle('hide');
  input.focus();
}

const addTodo = (text) => {
  const todo = {
    text,
    checked: false,
    id: Date.now()
  };

  todoItems.push(todo);

  // let todoFirst = text.split(" ")[0];
  // console.log(todoFirst);

  localStorage.setItem('items', JSON.stringify(todoItems));
  list.insertAdjacentHTML('beforeend', `
        <div class="list" data-key="${todo.id}" id="${todo.id}" >
        <span class="text">${todo.text}</span>
        <span class="trash" data-key="${todo.id}"><i class="delete-todo far fa-trash-alt"></i></span>
        </div>`
  );
}

// let words = y.split(/[^a-zA-Z'-]+/gi);

const toggleDone = key => {
  const index = todoItems.findIndex(item => item.id === Number(key));
  todoItems[index].checked = !todoItems[index].checked;

  const item = document.querySelector(`[data-key='${key}']`);
  if (todoItems[index].checked) {
    item.classList.add('done');
  } else {
    item.classList.remove('done');
  }
}

const deleteTodo = key => {
  todoItems = todoItems.filter(item => item.id !== Number(key));
  const item = document.querySelector(`[data-key='${key}']`);
  item.remove();
  if (todoItems.length === 0) list.innerHTML = '';
}

const saveData = dataArr => {

  dataArr.forEach(item => {

    let textFirstWord = item.text.split(" ")[0];
    let first = textFirstWord.length;
    // console.log(textFirstWord);
    let remainder = item.text.substr(first);
    // console.log(remainder);

    list.insertAdjacentHTML('beforeend', `
        <div class="list" data-key="${item.id}" id="${item.id}" >
        <span class="text"><span class="text__first-word">${textFirstWord} </span>${remainder}</span>
        <span class="trash" data-key="${item.id}"><i class="delete-todo far fa-trash-alt"></i></span>
        </div>`
    );
  });
}

toggle.addEventListener('click', _ => {
  hideInput();
});

saveData(todoItems);

/* ADD VIA ENTER OR SUBMIT BUTTON */
// Add to-do item with ENTER key
input.addEventListener('keypress', (event) => {
  if (event.keyCode === 13) {
    // HERE - need to split into an array so I can style words[0] by giving it a class
    const text = input.value.trim();
    if (text !== '') {
      addTodo(text);
      input.value = '';
      input.focus();
    }
  }
});

// Add to-do item on button submit / click
const createItem = document.getElementById("create_item")
createItem.addEventListener('click', (e) => {
  e.preventDefault

  const textBtn = input.value.trim();
  if (textBtn !== '') {
    addTodo(textBtn);
    input.value = '';
    input.focus();
  }

});

list.addEventListener('click', event => {
  if (event.target.classList.contains('text')) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }

  if (event.target.classList.contains('delete-todo')) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteTodo(itemKey);
    localStorage.setItem('items', JSON.stringify(todoItems));
    input.focus();
  }
});