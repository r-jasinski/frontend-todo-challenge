import '../styles/style.css'

type Todo = {
  id: string
  text: string
  completed: boolean
}

const todos: Todo[] = [];

const inputEl = document.getElementById('add-todo-input') as HTMLInputElement;;
const todoItemsEl = document.getElementById('todo-items') as HTMLUListElement;
const completedItemsEl = document.getElementById('completed-items') as HTMLUListElement;

const createLi = (item: Todo) => {
  const li = document.createElement('li')
  // faster than innerHTML.
  li.textContent = item.text
  li.dataset.id = item.id
  li.addEventListener('click', (event) => handleClick(event))
  return li
}

const handleClick = function (event: MouseEvent) {
  const target = event.target as HTMLLIElement
  const todo = todos.find((item) => item.id === target.dataset.id)
  if (!todo) return
  // since the element is already in the DOM, it will be just moved. Removing and appending is not necessary.
  if (target.parentElement === completedItemsEl) {
    todoItemsEl.prepend(target)
    return todo.completed = false
  }
  completedItemsEl.prepend(target)
  todo.completed = true
}

const handleKeyUp = (event: KeyboardEvent) => {
  const key = event.key;
  const target = event.target as HTMLInputElement;
  const text = target.value.trim();
  if (key !== 'Enter' || !text) return;
  const item = { id: new Date().getTime().toString(), text, completed: false };
  todos.unshift(item);
  const li = createLi(item);
  todoItemsEl.prepend(li);
  target.value = '';
}

const init = () => {
  if (!inputEl || !todoItemsEl || !completedItemsEl) {
    return console.error('Required DOM elements not found')
  }
  inputEl.addEventListener('keyup', (event) => handleKeyUp(event));
}

init();
