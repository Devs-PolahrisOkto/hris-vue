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
};
