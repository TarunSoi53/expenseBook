const express= require('express');
const bodyParser = require('body-parser');
const app= express();
const cors = require('cors');

const port = 3000|| process.env.PORT;
const expense = require('./routes/expenseRoutes');
const auth = require('./routes/authRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use (bodyParser.json());

app.use(cors());

app.use('/api/expense',expense);
app.use('/api/auth',auth);




app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})







