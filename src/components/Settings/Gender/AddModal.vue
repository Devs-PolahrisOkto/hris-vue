<template>
  <b-modal 
    v-model="active" 
    :width="640"
    :can-cancel="['x']"
  >
    <modal-form 
      :modal-form="genderForm"
      @submit="save"
      @close="$emit('close')"
    >
      <template v-slot:header-title>
        Add Gender
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
      genderForm: 'gender/genderForm'
    })
  },

  methods: {
    ...mapActions({
      saveGender: 'gender/save',
    }),
    save(form) {
      this.saveGender(form).then(this.$emit('close'));
    }
  }
}
</script>
