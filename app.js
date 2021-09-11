const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://guillermo:123@Localhost:27017/praacticasCRUD', {useNewUrlparser: true, useUnifiedTopology: true});

const connection=mongoose.connection;

connection.once('open',()=>{
    console.log('conexion exitosa');
});



connection.on('error', (err)=>{
    console.log('error en la conexion a la BD:',err);
});

const Todo =mongoose.model('Todo',{text: String, completed: Boolean});

app.get('/', (req, res) =>{
    res.json({response:'success'});
});

app.listen(3000, () =>{
    console.log('tu puta madre');
});