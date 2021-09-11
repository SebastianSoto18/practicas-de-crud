const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { redirect } = require('statuses');
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

app.post('/add', (req, res) =>{
    const todo=new Todo({text: req.body.text, completed: false});

    todo.save()
    .then(doc =>{
        console.log('dato insertado', doc);
        res.json({response: 'succes'});
    })
    .catch(err =>{
        console.log('error al insertar', err.message);
    });
});

app.get('/getall', (req,res) =>{
    Todo.find({},'text completed').then(doc =>{
        res.json({response:'succes',data:doc});
    }).catch(err =>{
        console.log('error al consultar elemento', err.message);
    });
});

app.get('/complete/:id/:status', (req,res) =>{
    const id=req.params.id;
    const status=req.params.status ='true'; //convertir a boolean un parametro

    Todo.findByIdAndUpdate({_id:id},{$set:{completed:status}}).then(doc=>{
            res.json({response:'succes'});
    }).catch(err =>{
            res.json({response:'error'});
    })
});

app.get('/delete/:id', (req,res) =>{
    const id=req.params.id;
    

    Todo.findByIdAndDelete({_id:id}).then(doc=>{
            res.json({response:'succes'});
    }).catch(err =>{
            res.json({response:'error'});
    })
});

app.listen(3000, () =>{
    console.log('tu puta madre');
});