window.addEventListener('load', ()=>{
// The line below to get data from the local storage
    todos = JSON.parse(localStorage.getItem('todos')) || []
    // getting the inputs from HTML 
    const nameInput = document.querySelector('#name')
    const newTodoForm = document.querySelector('#new-todo-form')

    // This will return the value of the 'username' key stored in local storage And set it as the value of nameInput, or null if the key is not found.
    const username = localStorage.getItem('username') || ''
    nameInput.value = username
    // When the value changes, the new value is saved to the 'username' key in the browser's local storage.
    nameInput.addEventListener('change', e =>{
        localStorage.setItem('username', e.target.value)
    })
    // this code allows users to add new todos to the list and saves them to local storage so they persist between page loads.
    newTodoForm.addEventListener('submit',e=>{
        e.preventDefault()
        const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime()
        }
        todos.push(todo)
        localStorage.setItem('todos', JSON.stringify(todos))
        e.target.reset()
        DisplayTodos()

    })
    DisplayTodos()
})

function DisplayTodos(){
    const todoList = document.querySelector('#todo-list')
    todoList.innerHTML =''
    // Creating the todo elements
    todos.forEach(todo=>{

        // creating the todo item (parent element)
        const todoItem = document.createElement('div')
        todoItem.classList.add('todo-item')

        // creating the todo item proprities(children elements)
        const label = document.createElement('label')
        const input = document.createElement('input')
        const span = document.createElement('span')
        const content = document.createElement('div')
        const actions = document.createElement('div')
        const edit = document.createElement('button')
        const deleteButton = document.createElement('button')
        // Setting properties to the input(checkbox)
        input.type = 'checkbox'
        input.checked = todo.done  
        // adding classes to the elements
        span.classList.add('bubble')
        if(todo.category == 'personal'){
            span.classList.add('personal')
        } else{
            span.classList.add('business')
        }
        content.classList.add('todo-content')
        actions.classList.add('actions')
        edit.classList.add('edit')
        deleteButton.classList.add('delete')
        
        content.innerHTML = `<input type="text" value="${todo.content}" readonly>`
        edit.innerHTML = 'Edit'
        deleteButton.innerHTML = 'Delete'

        // appending childen elements to parents elements
        label.appendChild(input)
        label.appendChild(span)
        actions.appendChild(edit)
        actions.appendChild(deleteButton)
        todoItem.appendChild(label)
        todoItem.appendChild(content)
        todoItem.appendChild(actions)

        // append todo item to our list
        todoList.appendChild(todoItem)
        
        // mark as done
        input.addEventListener('click',e=>{
            todo.done = e.target.checked
            localStorage.setItem('todos',JSON.stringify(todos))
            if(todo.done){
                todoItem.classList.add('done')
            } else{
                todoItem.classList.remove('done')
            }
            DisplayTodos()
        })
        if(todo.done){
            todoItem.classList.add('done')
        }
        edit.addEventListener('click',e=>{
            const input = content.querySelector('input')
            input.removeAttribute('readonly')
            input.focus()
            input.addEventListener('blur',e=>{
                input.setAttribute('readonly',true)
                todo.content = e.target.value
                localStorage.setItem('todos', JSON.stringify(todos))
                DisplayTodos()
            })
        })
        deleteButton.addEventListener('click', e=>{
            todos = todos.filter(t=> t != todo)
            localStorage.setItem('todos',JSON.stringify(todos))
            DisplayTodos()
        })
    })
}