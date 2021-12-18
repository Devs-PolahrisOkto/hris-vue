<template>
  <b-modal
    v-model="active"
    :width="640"
    :can-cancel="['x']"
  >
    <modal-form
      :modal-form="bankForm"
      @submit="save"
      @close="$emit('close')"
    >
      <template v-slot:header-title>
        Add Bank
      </template>
    </modal-form>
  </b-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    ModalForm: () => import('@/components/Settings/Common/Form.vue'),
  },

  props: {
    active: {
      type: Boolean,
    },
  },

  computed: {
    ...mapGetters({
      bankForm: 'bank/bankForm',
    }),
  },

  methods: {
    ...mapActions({
      saveBank: 'bank/save',
    }),
    save (form) {
      this.saveBank(form).then(this.$emit('close'));
    },
  },
};
</script>
