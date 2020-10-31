const { createStore } = window.Redux;
//reducer
//state
//store

const initialState = JSON.parse(localStorage.getItem('todo_list')) || [];

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TODO':{
      const newList = [...state];
      newList.push(action.payload);
      return newList;
    }
    default:
      return state;
  }
  
}

const store = createStore(todoReducer);

const renderTodoList = (todoList) => {
  if(!Array.isArray(todoList) || todoList.length === 0) return;

  const ulElement = document.querySelector('#todoList');
  if(!ulElement) return;

  ulElement.innerHTML = '';
  for (const todo of todoList) {
    const liElement = document.createElement('li');
    liElement.textContent = todo;

    ulElement.appendChild(liElement);
  }
}

const initialTodo = store.getState();

renderTodoList(initialTodo);

//handle submit form

const todoFormElement = document.querySelector('#todoForm');
if(todoFormElement){
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const todoTextElement = document.querySelector('#todoText');

    const action = {
      type: 'ADD_TODO',
      payload: todoTextElement.value
    }

    store.dispatch(action);
    todoTextElement.value = '';
  }

  todoFormElement.addEventListener('submit', handleFormSubmit);
}

store.subscribe(() => {
  const newTodoList = store.getState();
  renderTodoList(newTodoList);
  console.log(newTodoList);

  localStorage.setItem('todo_list', JSON.stringify(newTodoList));
})
