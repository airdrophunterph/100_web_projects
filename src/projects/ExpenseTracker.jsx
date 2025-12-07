import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ExpenseTracker = () => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('expenseTransactions');
    return saved ? JSON.parse(saved) : [];
  });
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');

  useEffect(() => {
    localStorage.setItem('expenseTransactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (e) => {
    e.preventDefault();
    if (!text || !amount) return;
    
    const transaction = {
      id: Date.now(),
      text,
      amount: type === 'income' ? Math.abs(parseFloat(amount)) : -Math.abs(parseFloat(amount)),
      date: new Date().toLocaleDateString()
    };
    
    setTransactions([transaction, ...transactions]);
    setText('');
    setAmount('');
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const income = transactions
    .filter(t => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);
  
  const expense = transactions
    .filter(t => t.amount < 0)
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);
  
  const balance = income - expense;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>
      
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">💰 Expense Tracker</h1>
        
        {/* Balance */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center mb-6">
          <div className="text-white/60 mb-2">Your Balance</div>
          <div className={`text-4xl font-bold ${balance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            ${balance.toFixed(2)}
          </div>
        </div>
        
        {/* Income/Expense */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
            <div className="text-white/60 text-sm">Income</div>
            <div className="text-2xl font-bold text-green-400">+${income.toFixed(2)}</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
            <div className="text-white/60 text-sm">Expense</div>
            <div className="text-2xl font-bold text-red-400">-${expense.toFixed(2)}</div>
          </div>
        </div>
        
        {/* Add Form */}
        <form onSubmit={addTransaction} className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-6">
          <h3 className="text-white font-bold mb-4">Add Transaction</h3>
          
          <div className="flex gap-2 mb-4">
            <button
              type="button"
              onClick={() => setType('income')}
              className={`flex-1 py-2 rounded-lg font-medium transition ${
                type === 'income' ? 'bg-green-500 text-white' : 'bg-white/10 text-white/60'
              }`}
            >
              + Income
            </button>
            <button
              type="button"
              onClick={() => setType('expense')}
              className={`flex-1 py-2 rounded-lg font-medium transition ${
                type === 'expense' ? 'bg-red-500 text-white' : 'bg-white/10 text-white/60'
              }`}
            >
              - Expense
            </button>
          </div>
          
          <input
            type="text"
            placeholder="Description"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 mb-3"
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            step="0.01"
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 mb-4"
          />
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-lg"
          >
            Add Transaction
          </button>
        </form>
        
        {/* History */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
          <h3 className="text-white font-bold mb-4">History</h3>
          {transactions.length === 0 ? (
            <div className="text-white/40 text-center py-4">No transactions yet</div>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {transactions.map((t) => (
                <div 
                  key={t.id} 
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    t.amount > 0 ? 'bg-green-500/20 border-l-4 border-green-500' : 'bg-red-500/20 border-l-4 border-red-500'
                  }`}
                >
                  <div>
                    <div className="text-white font-medium">{t.text}</div>
                    <div className="text-white/40 text-xs">{t.date}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={t.amount > 0 ? 'text-green-400' : 'text-red-400'}>
                      {t.amount > 0 ? '+' : ''}{t.amount.toFixed(2)}
                    </span>
                    <button
                      onClick={() => deleteTransaction(t.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
