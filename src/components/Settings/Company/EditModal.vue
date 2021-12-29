<template>
  <b-modal
    v-model="active"
    :width="640"
    :can-cancel="['x']"
  >
    <modal-form
      :modal-form="form"
      @submit="update"
      @close="$emit('close')"
    >
      <template v-slot:header-title>
        Edit Company
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
      form: 'company/form',
    }),
  },

  methods: {
    ...mapActions({
      updateCompany: 'company/update',
    }),
    update (form) {
      this.updateCompany(form).then(this.$emit('close'));
    },
  },
};
</script>
