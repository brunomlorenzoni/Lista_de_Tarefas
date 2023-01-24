const express = require('express');
const router = express.Router();
const tasksController = require('./controllers/tasksController')
const tasksMiddleware = require('./middlewares/tasksMiddleware')


router.get('/tasks', tasksController.getAll);
router.post('/tasks', tasksMiddleware.validateTittleBody, tasksController.creatTask);
router.delete('/tasks/:id', tasksController.deleteTask)
router.put('/tasks/:id', tasksMiddleware.validateTittleBody, tasksMiddleware.validateStatusBody, tasksController.updateTask)

module.exports = router