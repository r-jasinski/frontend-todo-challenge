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

/**
 * Creates a list item element for a todo item.
 * The text content of the list item is set to the text of the todo item.
 * A 'click' event listener is added to the list item, which calls the handleClick function when the 'click' event is fired.
 *
 * @param {Todo} item - The todo item.
 * @returns {HTMLLIElement} The created list item element.
 */
const createLi = (item: Todo) => {
  const li = document.createElement('li')
  // TextContent is faster than innerHTML.
  li.textContent = item.text
  li.dataset.id = item.id
  li.addEventListener('click', (event) => handleClick(event))
  return li
}

/**
 * Handles the 'click' event on the todo items.
 * If the clicked item is found in the todos array, it checks if the item is in the completedItemsEl list.
 * If it is, it moves the item to the todoItemsEl list and marks it as not completed.
 * If it is not, it moves the item to the completedItemsEl list and marks it as completed.
 *
 * @param {MouseEvent} event - The click event.
 */
const handleClick = function (event: MouseEvent) {
  const target = event.target as HTMLLIElement
  const todo = todos.find((item) => item.id === target.dataset.id)
  if (!todo) return
  // Since the element is already in the DOM, it will be just moved. Removing and appending is not necessary.
  if (target.parentElement === completedItemsEl) {
    todoItemsEl.prepend(target)
    return todo.completed = false
  }
  completedItemsEl.prepend(target)
  todo.completed = true
}

/**
 * This function handles the 'keyup' event on the input element.
 * If the key pressed is 'Enter' and the input is not empty, it creates a new todo item,
 * adds it to the beginning of the todos array, creates a new list item for it,
 * and adds it to the beginning of the todoItemsEl list. It then clears the input.
 *
 * @param {KeyboardEvent} event - The keyup event.
 */
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

/**
 * Initializes the application.
 *
 * This function checks if the required DOM elements are present and adds an event
 * listener to the input element.
 * If the required DOM elements are not found, it logs an error to the console.
 * Otherwise, it adds a 'keyup' event listener to the input element.
 * The event listener calls the handleKeyUp function when the 'keyup' event is fired.
 */
const init = () => {
  if (!inputEl || !todoItemsEl || !completedItemsEl) {
    return console.error('Required DOM elements not found')
  }
  inputEl.addEventListener('keyup', (event) => handleKeyUp(event));
}

init();
