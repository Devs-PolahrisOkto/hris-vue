import moment from 'moment';

export default {
  methods: {
    formatDateToString (date) {
      if (this.$moment(date).isValid()) {
        return this.$moment(date).format('MM/DD/YYYY');
      }
      return '';
    },
    formatTimeToString (date) {
      if (this.$moment(date).isValid()) {
        return this.$moment(date).format('LT');
      }
      return '';
    },
  },

  filters: {
    formatDateToString (date) {
      if (moment(date).isValid()) {
        return moment(date).format('MM/DD/YYYY');
      }
      return '';
    },
    formatTimeToString (date) {
      if (moment(date).isValid()) {
        return moment(date).format('LT');
      }
      return '';
    },
  },
};
