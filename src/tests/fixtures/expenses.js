import moment from 'moment';

export default [
  {
    id: '1',
    description: 'Rent',
    amount: 109500,
    createdAt: 0,
    note: ''
  },
  {
    id: '2',
    description: 'Gum',
    amount: 195,
    createdAt: moment(0)
      .subtract(4, 'days')
      .valueOf(),
    note: ''
  },
  {
    id: '3',
    description: 'Credit Card',
    amount: 209500,
    createdAt: moment(0)
      .add(4, 'days')
      .valueOf(),
    note: ''
  }
];
