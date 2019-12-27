import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseList, ExpensesList } from '../../components/ExpenseList';
import expenses from '../fixtures/expenses';

test('Should render ExpenseList with expenses', () => {
  const wrapper = shallow(<ExpensesList expenses={expenses} />);
  expect(wrapper).toMatchSnapshot();
});

test('Should render ExpenseList with empty list', () => {
  const wrapper = shallow(<ExpensesList expenses={[]} />);
  expect(wrapper).toMatchSnapshot();
});
