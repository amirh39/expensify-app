import moment from 'moment';
import { setTextFilter, setStartDate, setEndDate, sortByDate, sortByAmount } from '../../actions/filters';

test('Should run SET_TEXT_FILTER', () => {
  const action = setTextFilter('Rent');
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: 'Rent'
  });
});

test('Should run SET_TEXT_FILTER', () => {
  const action = setTextFilter();
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: ''
  });
});

test('Should run SORT_BY_DATE', () => {
  const action = sortByDate();
  expect(action).toEqual({
    type: 'SORT_BY_DATE'
  });
});

test('Should run SORT_BY_AMOUNT', () => {
  const action = sortByAmount();
  expect(action).toEqual({
    type: 'SORT_BY_AMOUNT'
  });
});

test('Should run SET_START_DATE', () => {
  const action = setStartDate(moment(0));
  expect(action).toEqual({
    type: 'SET_START_DATE',
    startDate: moment(0)
  });
});

test('Should run SET_END_DATE', () => {
  const action = setEndDate(moment(0));
  expect(action).toEqual({
    type: 'SET_END_DATE',
    endDate: moment(0)
  });
});
