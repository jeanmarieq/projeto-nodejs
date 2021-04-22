const express = require('express')
const app = express()
const { Sequelize, DataTypes } = require('sequelize')
const TarefaModel = require('./models/tarefa')

app.set ('view engine', 'ejs')

const sequelize = new Sequelize({ dialect: 'sqlite', storage: 'minha-database.db'}) 

const Tarefas = TarefaModel(sequelize, DataTypes)

app.use(express.json())

// Mostrar lista de tarefas
app.get('/tarefas', async (req, res) => {
    const lisTarefas = await Tarefas.findAll();
    res.json({ Tarefas: lisTarefas })
})

// Mostrar tarefa por ID
app.get('/tarefas/:id', async (req, res) => {
    const tarefaId = req.params.id
    const tarefa = await Tarefas.findByPk(tarefaId)
    res.json({ action: 'Mostrar Tarefa', Tarefas: tarefa })
})

// Criar tarefa
app.post('/tarefas', async (req, res) => {
    const novatarefa = await Tarefas.create({
        name: req.body.name
    })
   res.json({ novatarefa });
})

// Atualizar tarefa
app.put('/tarefas/:id', async (req, res) => {
    const tarefaId = req.params.id
    const lisTarefas = await Tarefas.findByPk(tarefaId)
    lisTarefas.update({
        name: req.body.name
    })
    res.send({ lisTarefas: lisTarefas })
})
  
// Apagar tarefa
app.delete('/tarefas/:id', async (req, res) => {
    const tarefaId = req.params.id
    const apagarTarefa = await Tarefas.destroy({ where: { id: tarefaId} })
  
    res.send({ action: 'Apagar tarefa', apagarTarefa: apagarTarefa})
})


app.listen(8080, () => {
    console.log('Iniciando o servidor express')
})