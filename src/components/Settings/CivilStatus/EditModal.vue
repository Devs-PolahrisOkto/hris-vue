<template>
  <b-modal 
    v-model="active" 
    :width="640"
    :can-cancel="['x']"
  >
    <modal-form 
      :modal-form="civilStatusForm"
      @submit="update"
      @close="$emit('close')"
    >
      <template v-slot:header-title>
        Edit Civil Status
      </template>
    </modal-form>
  </b-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    ModalForm: () => import("@/components/Settings/Common/Form.vue"),
  },

  props: {
    active: {
      type: Boolean
    },
  },

  computed: {
    ...mapGetters({
      civilStatusForm: 'civilStatus/civilStatusForm'
    })
  },

  methods: {
    ...mapActions({
      updateCivilStatus: 'civilStatus/update',
    }),
    update(form) {
      this.updateCivilStatus(form).then(this.$emit('close'));
    }
  }
}
</script>
