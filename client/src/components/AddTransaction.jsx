// AddTransaction.js
import React, { useState } from 'react';

function AddTransaction({ onAddTransaction }) {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(Date.now());
  

    const handleSubmit = (e, amountType) => {
        console.log('Submitting transaction');
        e.preventDefault();
        if (!amount || !description) {
            console.error('Error: Missing amount or description');
            return;
        }

        const newTransaction = {
            id: Date.now(),
            amount: parseFloat(amount),
            description,
            date: new Date().toLocaleDateString(),
            category,
            amountType,
        };

        onAddTransaction(newTransaction);
        setAmount('');
        setDescription('');
        setCategory('');
    };

    return (
        <form onSubmit={(e) => handleSubmit(e, 'sent')} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-300">Amount</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter amount"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300">Description</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter description"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300">date</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter date"
                    
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300">Category</label>
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter category"
                    required
                />
            </div>
            <div className="flex space-x-4">
                <button
                    type="submit"
                    onClick={(e) => handleSubmit(e, 'sent')}
                    className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 rounded-md text-white font-semibold transition duration-200"
                >
                    Send
                </button>
                <button
                    type="submit"
                    onClick={(e) => handleSubmit(e, 'received')}
                    className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 rounded-md text-white font-semibold transition duration-200"
                >
                    Receive
                </button>
            </div>
        </form>
    );
}

export default AddTransaction;