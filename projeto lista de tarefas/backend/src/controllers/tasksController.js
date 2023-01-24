const tasksModels = require('../models/taskModel')

const getAll = async (request, response) => {
    const tasks = await tasksModels.getAll()
    return response.status(200).json(tasks)
}

const creatTask = async (request, response) => {
    const creatTask = await tasksModels.creatTask(request.body)
    return response.status(200).json(creatTask)
}

const deleteTask = async (request, response) => {
    const { id } = request.params
    await tasksModels.deleteTask(id)
    return response.status(204).json()
}

const updateTask = async (request, response) => {
    const { id } = request.params
    await tasksModels.updateTask(id, request.body)
    return response.status(204).json()
}


module.exports = {
    getAll,
    creatTask,
    deleteTask,
    updateTask,
}