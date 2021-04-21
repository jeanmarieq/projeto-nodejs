const express = require('express')
const app = express()
const { Sequelize } = requiere('sequelize')

const sequelize = new Sequelize({ 
    dialect: 'sqlite',
    storage: 'minha-database.db'
}) 

app.set ('engine', 'ejs')

// listar tarefas
app.get('/tarefas', (req, res) => {
    res.json({action: 'Listing tasks'})
})

// Criar tarefa
app.post('/tarefas', (req, res) => {
    const body = req.body

    res.json(body)
})

app.listen(8080, () => {
    console.log('Iniciando o servidor express')
})