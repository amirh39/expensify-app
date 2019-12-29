import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseTotal } from '../../components/ExpenseTotal';

test('Should render ExpenseTotal correctly', () => {
  const demoExpenses = [
    {
      description: 'rent',
      amount: 10950
    },
    {
      description: 'coffee',
      amount: 195
    }
  ];
  const wrapper = shallow(<ExpenseTotal expenses={demoExpenses} />);
  expect(wrapper).toMatchSnapshot();
});
