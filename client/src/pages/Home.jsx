import React, { useState } from 'react';
import AddTransaction from '../components/AddTransaction';
import TransactionList from '../components/TransactionList';
import { useEffect } from 'react';
import fetchTransactions from '../data/featchdata';


function Home({transactions, setTransactions}) {
 
 

  const handleAddTransaction = (transaction) => {
    console.log("Adding transaction:", transaction);
    setTransactions([...transactions, transaction]);
  };


  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  // const totalBalance = transactions.reduce((acc, transaction) => {
  //   return transaction.type === 'income' 
  //     ? acc + transaction.amount 
  //     : acc - transaction.amount;
  // }, 0);

  console.log("Transactions type:", typeof transactions);
  console.log("Transactions value:", transactions);


  useEffect(() =>{
    const getTransactions = async () => {
      const transactionsFromServer = await fetchTransactions()
      setTransactions(transactionsFromServer)
    }
    getTransactions();
  },[])


  return ( 

    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#2929297d] p-6 rounded-lg shadow-lg backdrop-blur-lg bg-opacity-50">
          <h2 className="text-xl font-bold mb-4">Add Transaction</h2>
          <AddTransaction onAddTransaction={handleAddTransaction} />
        </div>
      </div>

      <div className="bg-[#2929297d] p-6 rounded-lg shadow-lg backdrop-blur-lg bg-opacity-50">
        <h2 className="text-xl font-bold mb-4">Transactions</h2>
        <TransactionList 
          transactions={transactions} 
          onDelete={handleDeleteTransaction} 
        />
      </div>

     
    </div>
  );
}

export default Home;
