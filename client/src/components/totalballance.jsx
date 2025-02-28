import React from 'react';
import TransactionList from './TransactionList';

const TotalBalance = ({ transactions }) => {
  const totalBalance = transactions.reduce((acc, transaction) => {
    if (!transaction) return acc; // Check if transaction is defined
    return transaction.amountType === 'received'
      ? acc + transaction.amount 
      : acc - transaction.amount;
  }, 0);

  return (
    <div className="bg-gray-800 z-30 p-2 m-4 fixed top-0 right-0 rounded-lg shadow-lg backdrop-blur-sm bg-opacity-50 border border-gray-700">
      <h3 className="text-lg font-semibold">
        Total Balance: <span className={totalBalance >= 0 ? 'text-green-400' : 'text-red-400'}>
          ₹{totalBalance.toFixed(2)}
        </span>
      </h3>
    </div>
  );
}

export default TotalBalance;
