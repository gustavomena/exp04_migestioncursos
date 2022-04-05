
const express = require('express')
const app = express()

const{nuevoCurso, getCursos, editCurso, deleteCurso}= require('./base')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.listen(3000, () => console.log("UP port 3000"));



app.get('/', (req, res) => {
    res.sendFile(__dirname+'/index.html')
})


app.post('/curso', async (req, res) => {
    const { nombre, nivelTecnico, fechaInicio, duracion } = req.body
    const respuesta = await nuevoCurso(nombre, nivelTecnico, fechaInicio, duracion);
    res.send(respuesta)
})

app.get('/cursos', async (req, res) => {
    const respuesta = await getCursos()
    res.send(respuesta)
})


app.put('/curso', async (req, res) => {
    const { id, nombre, nivelTecnico, fechaInicio, duracion } = req.body;
    const respuesta = await editCurso(id, nombre, nivelTecnico, fechaInicio, duracion)
    res.send(respuesta)
})


app.delete('/cursos/:id', async (req, res) => {
    const { id } = req.params;
    const respuesta = await deleteCurso(id)
    respuesta > 0 
        ? res.send(`el curso ${id} fue eliminado con exito`)
        :res.send('no existe un curso con ese id')
})

