<template>
  <b-modal
    v-model="active"
    :width="640"
    :can-cancel="['x']"
  >
    <modal-form
      :modal-form="departmentForm"
      @submit="save"
      @close="$emit('close')"
    >
      <template v-slot:header-title>
        Add Department
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
      departmentForm: 'department/departmentForm',
    }),
  },

  methods: {
    ...mapActions({
      saveDepartment: 'department/save',
    }),
    save (form) {
      this.saveDepartment(form).then(this.$emit('close'));
    },
  },
};
</script>
