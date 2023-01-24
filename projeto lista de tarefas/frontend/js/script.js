const tbody = document.querySelector('tbody')
const addForm = document.querySelector('.add-form')
const inputTask = document.querySelector('.input-task')

const procuraTasks = async () => {
    const response = await fetch('http://localhost:3333/tasks')
    const tasks = await response.json()
    return tasks;
}

const addTask = async (event) => {
    event.preventDefault()

    const task = { title: inputTask.value }

    await fetch('http://localhost:3333/tasks', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
    })

    loadTasks()
    inputTask.value = ''

}

const deleteTask = async (ID) => {
    await fetch(`http://localhost:3333/tasks/${ID}`, {
        method: 'delete',
    })
    loadTasks()
}

const updateTask = async (task) => {

    const { ID, title, status } = task 

    await fetch(`http://localhost:3333/tasks/${ID}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, status}) 
    })

    loadTasks()
}

const formatDate = (dateUTC) => {
    const option = { dateStyle: 'long', timeStyle: 'short' }
    const date = new Date(dateUTC).toLocaleString('pt-br', option)
    return date
}

const createElement = (tag, innerText = '', innerHTML = '') => {
    const element = document.createElement(tag)

    if (innerText) {
        element.innerText = innerText
    }

    if (innerHTML) {
        element.innerHTML = innerHTML
    }

    return element
}

const createSelect = (value) => {
    const options =
        `
    <option value="pendente">pendente</option>
    <option value="em andamento">em andamento   </option>
    <option value="concluida">concluida</option>
    `

    const select = createElement('select', '', options)

    select.value = value
    return select

}

const createRow = (task) => {

    const { ID, title, criando_quando, status } = task

    const tr = createElement('tr')
    const tdTitle = createElement('td', title)
    const tdCriadoQuando = createElement('td', formatDate(criando_quando))
    const tdStatus = createElement('td')
    const tdActions = createElement('td')

    const select = createSelect(status)

    select.addEventListener('change', ({ target }) =>{
        updateTask({ID, title, status: target.value})
    })

    const editButton = createElement('button', '', '<span class="material-symbols-outlined">edit</span>')
    const deleteButton = createElement('button', '', '<span class="material-symbols-outlined">delete</span>')

    const editForm = createElement('form')
    const editInput = createElement('input')
    
    editInput.value = title
    editForm.appendChild(editInput)

    editForm.addEventListener('submit', (event) => {
    event.preventDefault()
    updateTask({ID, title: editInput.value, status})
    })

    editButton.classList.add('btn-action')
    deleteButton.classList.add('btn-action')

    deleteButton.addEventListener('click', () => {
        deleteTask(ID)
    })

    editButton.addEventListener('click', () => {
        tdTitle.innerText = ''
        tdTitle.appendChild(editForm)
    })


    tdStatus.appendChild(select)

    tdActions.appendChild(editButton)
    tdActions.appendChild(deleteButton)

    tr.appendChild(tdTitle)
    tr.appendChild(tdCriadoQuando)
    tr.appendChild(tdStatus)
    tr.appendChild(tdActions)

    return tr

}

const loadTasks = async () => {

    const tasks = await procuraTasks()

    tbody.innerHTML = ''
    tasks.forEach((task) => {
        const tr = createRow(task)
        tbody.appendChild(tr)
    });
}

addForm.addEventListener('submit', addTask)

loadTasks()






