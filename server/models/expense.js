const mongooose = require('../config/index');


const expenseSchema = new mongooose.Schema({
    name: String,
    amount: Number,
    description: String,
    category: String,
    amountType: String,
    date: {type:Date, default: Date.now},
    user: { type: mongooose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongooose.model('Expense', expenseSchema);
