import React from 'react';

function TransactionList({ transactions, onDelete }) {
  return (
    <div className="space-y-2">
      {transactions.length === 0 && (
        <p className="text-gray-400">No transactions available.</p>
      )}

      {transactions.slice().reverse().map((transaction) => (
        <div
          key={transaction.id}
          className={`p-4 rounded-lg ${
            transaction.type === 'income' 
              ? ' bg-[#21531053] bg-opacity-50 border-green-700' 
              : /*bg-red-900*/ ' bg-[#53101053] bg-opacity-50 border-red-700'
          } border`}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">{transaction.description}</p>
              <p className="text-sm text-gray-400">{transaction.date}</p>
            </div>
            <div className="flex items-center space-x-4">
              <p className={`font-semibold ${
                transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
              }`}>
                ₹{transaction.amount.toFixed(2)}
              </p>
              <button
                onClick={() => onDelete(transaction.id)}
                className="text-gray-400 hover:text-white transition duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TransactionList;
