import moment from 'moment';

function formatDateToString (date) {
  if (moment(date).isValid()) {
    return moment(date).format('MM/DD/YYYY');
  }
  return '';
}

function formatTimeToString (date) {
  if (moment(date).isValid()) {
    return moment(date).format('LT');
  }
  return '';
}

function formatDateTime (date) {
  if (moment(date).isValid()) {
    return moment(date).format('YYYY-MM-DD hh:mm:ss');
  }
  return null;
}

export {
  formatDateToString,
  formatTimeToString,
  formatDateTime,
};
