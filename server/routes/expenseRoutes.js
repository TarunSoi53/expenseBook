const express= require('express');
const { getExpenses,addExpense,updateExpense,deleteExpense,getTotalExpence } = require('../controllers/expenseController');
const userAuthnicate = require('../middlewares/userAuthinicate');


const router = express.Router();

router.get('/getExpenses',userAuthnicate, getExpenses);
router.post('/addExpense',userAuthnicate,addExpense);
router.put('/updateExpense/:id',userAuthnicate,updateExpense);
router.delete('/deleteExpense/:id',userAuthnicate,deleteExpense);



router.get("/totalExpence",userAuthnicate,getTotalExpence);
module.exports = router;
