import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FinanceDashboard = () => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('financeTransactions');
    return saved ? JSON.parse(saved) : [
      { id: 1, type: 'income', category: 'Salary', amount: 5000, date: '2024-01-01' },
      { id: 2, type: 'expense', category: 'Rent', amount: 1500, date: '2024-01-02' },
      { id: 3, type: 'expense', category: 'Food', amount: 300, date: '2024-01-05' },
      { id: 4, type: 'expense', category: 'Transport', amount: 150, date: '2024-01-10' },
    ];
  });
  const [showAdd, setShowAdd] = useState(false);
  const [newTx, setNewTx] = useState({ type: 'expense', category: '', amount: '', date: '' });

  useEffect(() => {
    localStorage.setItem('financeTransactions', JSON.stringify(transactions));
  }, [transactions]);

  const categories = {
    income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'],
    expense: ['Rent', 'Food', 'Transport', 'Utilities', 'Entertainment', 'Shopping', 'Health', 'Other']
  };

  const addTransaction = () => {
    if (!newTx.category || !newTx.amount) return;
    setTransactions([{ ...newTx, id: Date.now(), amount: parseFloat(newTx.amount) }, ...transactions]);
    setNewTx({ type: 'expense', category: '', amount: '', date: '' });
    setShowAdd(false);
  };

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const balance = totalIncome - totalExpenses;

  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">💰 Finance Dashboard</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-green-500/20 backdrop-blur rounded-xl p-4">
            <div className="text-green-300 text-sm">Income</div>
            <div className="text-2xl font-bold text-green-400">${totalIncome.toLocaleString()}</div>
          </div>
          <div className="bg-red-500/20 backdrop-blur rounded-xl p-4">
            <div className="text-red-300 text-sm">Expenses</div>
            <div className="text-2xl font-bold text-red-400">${totalExpenses.toLocaleString()}</div>
          </div>
          <div className={`${balance >= 0 ? 'bg-emerald-500/20' : 'bg-orange-500/20'} backdrop-blur rounded-xl p-4`}>
            <div className="text-white/60 text-sm">Balance</div>
            <div className={`text-2xl font-bold ${balance >= 0 ? 'text-emerald-400' : 'text-orange-400'}`}>
              ${balance.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Expense Breakdown */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
            <h2 className="text-white font-bold mb-4">Expense Breakdown</h2>
            <div className="space-y-3">
              {Object.entries(expensesByCategory).sort((a, b) => b[1] - a[1]).map(([cat, amount]) => (
                <div key={cat}>
                  <div className="flex justify-between text-white mb-1">
                    <span>{cat}</span>
                    <span>${amount.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-teal-400 to-emerald-400"
                      style={{ width: `${(amount / totalExpenses) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white font-bold">Recent Transactions</h2>
              <button onClick={() => setShowAdd(!showAdd)} className="text-teal-400 text-sm">+ Add</button>
            </div>

            {showAdd && (
              <div className="bg-white/10 rounded-lg p-3 mb-4 space-y-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => setNewTx({ ...newTx, type: 'income', category: '' })}
                    className={`flex-1 py-2 rounded ${newTx.type === 'income' ? 'bg-green-500' : 'bg-white/10'} text-white text-sm`}
                  >Income</button>
                  <button
                    onClick={() => setNewTx({ ...newTx, type: 'expense', category: '' })}
                    className={`flex-1 py-2 rounded ${newTx.type === 'expense' ? 'bg-red-500' : 'bg-white/10'} text-white text-sm`}
                  >Expense</button>
                </div>
                <select
                  value={newTx.category}
                  onChange={(e) => setNewTx({ ...newTx, category: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-white/20 text-white text-sm"
                >
                  <option value="" className="bg-gray-800">Category</option>
                  {categories[newTx.type].map(c => <option key={c} value={c} className="bg-gray-800">{c}</option>)}
                </select>
                <input
                  type="number"
                  placeholder="Amount"
                  value={newTx.amount}
                  onChange={(e) => setNewTx({ ...newTx, amount: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-white/20 text-white text-sm"
                />
                <button onClick={addTransaction} className="w-full py-2 bg-teal-500 text-white rounded text-sm">Add</button>
              </div>
            )}

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {transactions.slice(0, 10).map(tx => (
                <div key={tx.id} className="flex justify-between items-center p-2 bg-white/10 rounded-lg">
                  <div>
                    <div className="text-white text-sm">{tx.category}</div>
                    <div className="text-white/40 text-xs">{tx.date}</div>
                  </div>
                  <div className={tx.type === 'income' ? 'text-green-400' : 'text-red-400'}>
                    {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceDashboard;
