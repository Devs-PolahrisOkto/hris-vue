<template>
  <b-modal
    v-model="active"
    :width="800"
    :can-cancel="['x']"
    :trap-focus="false"
  >
    <ValidationObserver ref="observer" v-slot="{ invalid, passes }">
      <form @submit.prevent="passes(submit)">
        <div class="modal-card">
          <header class="modal-card-head is-flex is-justify-content-space-between">
            <h6 class="is-size-6 has-text-weight-bold">
              Add Work Shift
            </h6>
            <button
              type="button"
              class="delete"
              @click="$emit('close')"
            ></button>
          </header>
          <section class="modal-card-body py-6" style="height: 600px;">
            <div class="columns">
              <div class="column">
                <date-picker-field
                  v-model="form.date"
                  label-position="on-border"
                  label="Date"
                  rules="required"
                  mode="eager"
                ></date-picker-field>
              </div>
            </div>
            <h5 class="is-size-6 mb-3">Time In & Time Out</h5>
            <div class="columns">
              <div class="column">
                <clock-picker-field
                  v-model="form.timeIn"
                  placeholder="From"
                  label-position="on-border"
                  label="From"
                  rules="required"
                  mode="eager"
                  icon="clock"
                ></clock-picker-field>
              </div>
              <div class="column">
                <clock-picker-field
                  v-model="form.timeOut"
                  placeholder="To"
                  label-position="on-border"
                  label="To"
                  rules="required"
                  mode="eager"
                  icon="clock"
                ></clock-picker-field>
              </div>
            </div>
            <h5 class="is-size-6 mb-3">Morning Break Time</h5>
            <div class="columns">
              <div class="column">
                <clock-picker-field
                  v-model="form.morningBreakIn"
                  placeholder="From"
                  label-position="on-border"
                  label="From"
                  icon="clock"
                ></clock-picker-field>
              </div>
              <div class="column">
                <clock-picker-field
                  v-model="form.morningBreakOut"
                  placeholder="To"
                  label-position="on-border"
                  label="To"
                  icon="clock"
                ></clock-picker-field>
              </div>
            </div>
            <h5 class="is-size-6 mb-3">Lunch Break Time</h5>
            <div class="columns">
              <div class="column">
                <clock-picker-field
                  v-model="form.lunchBreakIn"
                  placeholder="From"
                  label-position="on-border"
                  label="From"
                  icon="clock"
                ></clock-picker-field>
              </div>
              <div class="column">
                <clock-picker-field
                  v-model="form.lunchBreakOut"
                  placeholder="To"
                  label-position="on-border"
                  label="To"
                  icon="clock"
                ></clock-picker-field>
              </div>
            </div>
            <h5 class="is-size-6 mb-3">Afternoon Break Time</h5>
            <div class="columns">
              <div class="column">
                <clock-picker-field
                  v-model="form.afternoonBreakIn"
                  placeholder="From"
                  label-position="on-border"
                  label="From"
                  icon="clock"
                ></clock-picker-field>
              </div>
              <div class="column">
                <clock-picker-field
                  v-model="form.afternoonBreakOut"
                  placeholder="To"
                  label-position="on-border"
                  label="To"
                  icon="clock"
                ></clock-picker-field>
              </div>
            </div>
          </section>
          <footer class="modal-card-foot is-flex is-justify-content-flex-end">
            <b-button
              label="Cancel"
              @click="$emit('close')"
            />
            <b-button
              :disabled="invalid"
              native-type="submit"
              label="Add"
              type="is-primary"
            />
          </footer>
        </div>
      </form>
    </ValidationObserver>
  </b-modal>
</template>

<script>
import WorkShiftRepresentation from '@/api/representations/WorkShiftRepresentation';

export default {
  props: {
    active: {
      type: Boolean,
    },
  },

  data () {
    return {
      form: new WorkShiftRepresentation(),
    };
  },

  methods: {
    submit () {
      this.$emit('submit', this.form);
      this.$emit('close');
      this.form = new WorkShiftRepresentation();
    },
  },
};
</script>
