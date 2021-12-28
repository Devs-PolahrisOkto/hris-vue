<template>
  <b-modal
    v-model="active"
    :width="640"
    :can-cancel="['x']"
  >
    <modal-form
      :modal-form="form"
      @submit="save"
      @close="$emit('close')"
    >
      <template v-slot:header-title>
        Add Employment Type
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
      form: 'employmenttype/form',
    }),
  },

  methods: {
    ...mapActions({
      saveEmploymentType: 'employmenttype/save',
    }),
    save (form) {
      this.saveEmploymentType(form).then(this.$emit('close'));
    },
  },
};
</script>
