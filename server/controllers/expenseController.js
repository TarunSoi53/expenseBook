const Expense= require('../models/expense');
const moment = require('moment');
//const mongooose = require('../config/index');
const mongoose = require('mongoose');

const getExpenses = async(req, res) => {
    try {
        console.log(req.user)
        const expenses = await Expense.find({ user: req.user });

        res.json(expenses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

const addExpense = async(req, res) => {
    const user_id=req.user;
    try {
        const { name, amount,category,amountType } = req.body;
        date = req.body.date;
        
        const expense = {
            name,
            category,
            amountType,
            amount,
            user: user_id
         }
        if(date){
            const parsedDate = moment(date, 'YYYY-MM-DD').toDate();
            expense.date=parsedDate
          }
        console.log(name, amount, date);
        const newExpense = new Expense(expense);
        await newExpense.save();
        res.json(newExpense);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

const updateExpense = async(req, res) => {
    try {
        const { id } = req.params;
        const { item, amount, date } = req.body;
        const updatedExpense = await Expense.findByIdAndUpdate(id, { item, amount, date }, { new: true });
        res.json(updatedExpense);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

const deleteExpense = async(req, res) => {
    try {
        const { id } = req.params;
        await Expense.findByIdAndDelete(id);
        res.json({ msg: "Expense deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

const getTotalExpence = async(req, res) => {
    try {
        const result = await Expense.aggregate([
            { $match: { user: new mongoose.Types.ObjectId(req.user) } },
            { 
                $group: {
                    _id: null,
                    totalSent: { 
                        $sum: { 
                            $cond: [{ $eq: ["$amountType", "sent"] }, "$amount", 0] 
                        } 
                    },
                    totalReceived: { 
                        $sum: { 
                            $cond: [{ $eq: ["$amountType", "received"] }, "$amount", 0] 
                        } 
                    }
                }
            }
        ]);
        console.log(result);
        
        const totals = result[0] || { totalSent: 0, totalReceived: 0 };
        const grossBalance = totals.totalReceived - totals.totalSent;
        
        res.json({
            totalSent: totals.totalSent,
            totalReceived: totals.totalReceived,
            grossBalance
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
    getTotalExpence
};
