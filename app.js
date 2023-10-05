
const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const todo = require('./models/todo');

 const app = express();
 app.set('view engine', 'ejs');
 app.use(bodyParser.urlencoded({ extended: false }));
 app.set('views', "./views");



 app.use(express.urlencoded());
app.use(express.static('assets'));



const List = [
    {
        desc:"Go home",
        category:"personal",
        date:"03/11/2001"
    },
    {
        desc:"Go home",
        category:"work",
        date:"03/11/2001"
    }
]


app.get('/',async (req, res) => {
 
    try{
        const todos = await todo.find({});
        return res.render('todo',{
            title:"my todoList",
            T_List: todos
        });
       
    } catch(err){
        console.error('Error in fetching todo from db:', err);
        return res.status(500).send('Error fetching list');
    }

//    return res.render('todo',{
//     title:"my todoList",
//     T_List: List
//    });
});

app.post('/createTodo', async (req, res) => {
    try{
        const newTodo = await todo.create({
            desc: req.body.desc,
            category: req.body.category,
            date: req.body.date
        });
        console.log('*******', newTodo);
        return res.redirect('back');
    }catch(err){
        console.error('Error in creating the todo:', err);
        return res.status(500).send('Error creating the list');
    }
    // List.push(req.body);
    // return res.redirect('back');
})






app.get('/delete/',async function(req, res){
    // get the id from query in url
    let contactId = req.query.id;
     try{
        const removedContact = await todo.findByIdAndDelete(contactId);
        return res.redirect('back');
        // if (!removedContact) {
        //   return res.status(404).send('Contact not found');
        // }
     }catch (err) {
        console.error('Error in fetching contacts from db:', err);
        return res.status(500).send('Error fetching contacts');
    }
   

    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    // if(contactIndex != -1){
    //     contactList.splice(contactIndex, 1);
    // }

    // find the contact from database and delete
    
});

app.listen(port, function(err){
    if(err){
        console.log(`Error in the running server : ${err}`);
    }
    console.log(`server in running on port : ${port}`);
})
