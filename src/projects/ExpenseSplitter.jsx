import { useState } from 'react';
import { Link } from 'react-router-dom';

const ExpenseSplitter = () => {
  const [people, setPeople] = useState(['']);
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ description: '', amount: '', paidBy: '', splitAmong: [] });
  const [step, setStep] = useState(1);

  const addPerson = () => setPeople([...people, '']);
  const updatePerson = (idx, name) => {
    const updated = [...people];
    updated[idx] = name;
    setPeople(updated);
  };
  const removePerson = (idx) => setPeople(people.filter((_, i) => i !== idx));

  const validPeople = people.filter(p => p.trim());

  const addExpense = () => {
    if (!newExpense.description || !newExpense.amount || !newExpense.paidBy || newExpense.splitAmong.length === 0) return;
    setExpenses([...expenses, { ...newExpense, id: Date.now(), amount: parseFloat(newExpense.amount) }]);
    setNewExpense({ description: '', amount: '', paidBy: '', splitAmong: [] });
  };

  const toggleSplit = (person) => {
    const current = newExpense.splitAmong;
    const updated = current.includes(person) ? current.filter(p => p !== person) : [...current, person];
    setNewExpense({ ...newExpense, splitAmong: updated });
  };

  const calculateBalances = () => {
    const balances = {};
    validPeople.forEach(p => balances[p] = 0);

    expenses.forEach(exp => {
      const splitAmount = exp.amount / exp.splitAmong.length;
      balances[exp.paidBy] += exp.amount;
      exp.splitAmong.forEach(p => balances[p] -= splitAmount);
    });

    return balances;
  };

  const balances = calculateBalances();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-green-900 to-teal-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-lg mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">💸 Expense Splitter</h1>

        {/* Steps */}
        <div className="flex justify-center gap-4 mb-8">
          {[1, 2, 3].map(s => (
            <button
              key={s}
              onClick={() => s <= (validPeople.length > 1 ? 3 : 1) && setStep(s)}
              className={`w-10 h-10 rounded-full ${step === s ? 'bg-emerald-500' : 'bg-white/20'} text-white font-bold`}
            >
              {s}
            </button>
          ))}
        </div>

        {step === 1 && (
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Add People</h2>
            {people.map((p, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={p}
                  onChange={(e) => updatePerson(i, e.target.value)}
                  placeholder={`Person ${i + 1}`}
                  className="flex-1 px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30"
                />
                {people.length > 1 && (
                  <button onClick={() => removePerson(i)} className="px-3 text-red-400">×</button>
                )}
              </div>
            ))}
            <button onClick={addPerson} className="w-full mt-2 py-2 bg-white/20 text-white rounded-lg">+ Add Person</button>
            <button
              onClick={() => setStep(2)}
              disabled={validPeople.length < 2}
              className="w-full mt-4 py-3 bg-emerald-500 text-white rounded-lg font-bold disabled:opacity-50"
            >
              Next →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Add Expenses</h2>
            <input
              type="text"
              placeholder="Description"
              value={newExpense.description}
              onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 mb-2"
            />
            <input
              type="number"
              placeholder="Amount"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 mb-2"
            />
            <select
              value={newExpense.paidBy}
              onChange={(e) => setNewExpense({ ...newExpense, paidBy: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 mb-2"
            >
              <option value="" className="bg-gray-800">Paid by...</option>
              {validPeople.map(p => <option key={p} value={p} className="bg-gray-800">{p}</option>)}
            </select>
            <div className="mb-4">
              <div className="text-white/60 mb-2">Split among:</div>
              <div className="flex flex-wrap gap-2">
                {validPeople.map(p => (
                  <button
                    key={p}
                    onClick={() => toggleSplit(p)}
                    className={`px-3 py-1 rounded-lg ${newExpense.splitAmong.includes(p) ? 'bg-emerald-500' : 'bg-white/20'} text-white`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={addExpense} className="w-full py-2 bg-emerald-500 text-white rounded-lg font-bold mb-4">Add Expense</button>

            {expenses.length > 0 && (
              <div className="space-y-2 mb-4">
                {expenses.map(exp => (
                  <div key={exp.id} className="bg-white/10 rounded-lg p-3 flex justify-between">
                    <div>
                      <div className="text-white">{exp.description}</div>
                      <div className="text-white/40 text-sm">{exp.paidBy} paid • Split: {exp.splitAmong.length}</div>
                    </div>
                    <div className="text-emerald-400 font-bold">${exp.amount.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            )}

            <button onClick={() => setStep(3)} disabled={expenses.length === 0} className="w-full py-3 bg-white/20 text-white rounded-lg disabled:opacity-50">
              Calculate →
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Settlement</h2>
            <div className="space-y-3">
              {Object.entries(balances).map(([person, balance]) => (
                <div key={person} className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                  <span className="text-white">{person}</span>
                  <span className={balance >= 0 ? 'text-green-400' : 'text-red-400'}>
                    {balance >= 0 ? '+' : ''}{balance.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <button onClick={() => { setStep(1); setExpenses([]); }} className="w-full mt-6 py-3 bg-white/20 text-white rounded-lg">
              Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseSplitter;
