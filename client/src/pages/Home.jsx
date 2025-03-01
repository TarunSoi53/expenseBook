// Home.js
import React, { useState, useEffect } from 'react';
import AddTransaction from '../components/AddTransaction';
import TransactionList from '../components/TransactionList';
import postTransction from '../data/dataControlers';
import fetchTransactions from '../data/featchdata';
import TotalBalance from '../components/totalballance';


function Home({ transactions, setTransactions }) {
    const handleAddTransaction = async (transaction) => {
        const responseData = await postTransction(transaction);
        console.log('Response data:', responseData);

        if (responseData.success) {
            setTransactions((prevTransactions) => [
                ...prevTransactions,
                responseData.data,
            ]);
            console.log('Transactions value after update:', [...transactions, responseData.data]);
        } else {
            console.error('Error adding transaction:', responseData.error);
        }
    };

    const handleDeleteTransaction = (id) => {
        setTransactions(transactions.filter((t) => t.id !== id));
    };


    

    return (
        <div className="container   mx-auto p-4">
            <TotalBalance transactions={transactions}/>
            <div className="grid mt-22 grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#2929297d] p-6 rounded-lg shadow-lg backdrop-blur-lg bg-opacity-50">
                    <h2 className="text-xl font-bold mb-4">Add Transaction</h2>
                    <AddTransaction onAddTransaction={handleAddTransaction} />
                </div>
            </div>

            <div className="bg-[#2929297d] p-6 rounded-lg shadow-lg backdrop-blur-lg bg-opacity-50">
                <h2 className="text-xl font-bold mb-4">Transactions</h2>
                <TransactionList transactions={transactions} onDelete={handleDeleteTransaction} />
            </div>
        </div>
    );
}

export default Home;  