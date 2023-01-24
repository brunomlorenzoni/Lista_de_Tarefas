const connection = require('./connection')

const getAll = async () => {
    const tasks = await connection.execute('SELECT * FROM tasks')
    return tasks[0]
}


const creatTask = async (task) => {
    const { title } = task
    const dateUTC = new Date(Date.now()).toUTCString()
    const creatTask = await connection.execute('INSERT INTO tasks(title, status, criando_quando) VALUES (?, ?, ?)', [title, 'pendente', dateUTC])
    return { insertId: creatTask[0].insertId };
}

const deleteTask = async (id) => {
    const removeTask = await connection.execute('DELETE FROM tasks WHERE ID = ?', [id])
    return removeTask
}

const updateTask = async (id, task) => { 
    const { title, status} = task
    const updatedTask = await connection.execute('UPDATE tasks SET title = ?, status = ? WHERE ID = ?', [title, status, id])
    return updatedTask
}


module.exports = {
    getAll,
    creatTask,
    deleteTask,
    updateTask,
}