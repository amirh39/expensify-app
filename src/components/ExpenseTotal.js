import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';

export const ExpenseTotal = ({ expenses }) => {
  const expenseCount = expenses.length;
  const expenseWord = expenseCount > 1 ? 'expenses' : 'expense';
  return (
    <div className='page-header'>
      <div className='content-container'>
        <h1 className='page-header__title'>
          Viewing <span>{expenseCount}</span> {expenseWord}. Totaling{' '}
          <span>
            {numeral(expenses.map(expense => expense.amount).reduce((sum, value) => sum + value, 0) / 100).format(
              '$0,0.00'
            )}
          </span>
        </h1>
        <div className='page-header__actions'>
          <Link to='create' className='button'>
            Add Expense
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStatoToProps = state => ({
  expenses: selectExpenses(state.expenses, state.filters)
});

export default connect(mapStatoToProps)(ExpenseTotal);
