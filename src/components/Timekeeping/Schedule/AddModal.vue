<template>
  <b-modal
    v-model="active"
    :width="1200"
    :can-cancel="['x']"
    :trap-focus="false"
  >
    <ValidationObserver ref="observer" v-slot="{ invalid, passes }">
      <form @submit.prevent="passes(submit)">
        <div class="modal-card">
          <header class="modal-card-head is-flex is-justify-content-space-between">
            <h6 class="is-size-6 has-text-weight-bold">
              Add Schedule
            </h6>
            <button
              type="button"
              class="delete"
              @click="$emit('close')"
            ></button>
          </header>
          <section class="modal-card-body py-6" style="height: 700px;">
            <text-field
              label="Schedule Name"
              rules="required"
              mode="eager"
            ></text-field>
            <div class="py-5">
              <template v-for="schedule in schedules">
                <div :key="schedule.id" class="columns">
                  <div class="column">{{ schedule.day }}</div>
                  <div class="column">
                    <b-clockpicker
                      placeholder="Time In"
                      label-position="on-border"
                      icon="clock"
                      editable>
                    </b-clockpicker>
                  </div>
                  <div class="column">
                    <b-clockpicker
                      placeholder="Time Out"
                      label-position="on-border"
                      icon="clock"
                      editable>
                    </b-clockpicker>
                  </div>
                  <div class="column">
                    <b-clockpicker
                      placeholder="Break In"
                      label-position="on-border"
                      icon="clock"
                      editable>
                    </b-clockpicker>
                  </div>
                  <div class="column">
                    <b-clockpicker
                      placeholder="Break In"
                      label-position="on-border"
                      icon="clock"
                      editable>
                    </b-clockpicker>
                  </div>
                </div>
              </template>
            </div>
          </section>
          <footer class="modal-card-foot">
            <b-button
              label="Close"
              @click="$emit('close')"
            />
            <b-button
              :disabled="invalid"
              native-type="submit"
              label="Save"
              type="is-primary"
            />
          </footer>
        </div>
      </form>
    </ValidationObserver>
  </b-modal>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
    },
  },

  data () {
    return {
      schedules: [
        {
          id: 1, day: 'Monday', timein: '7:00AM', timeout: '5:00 PM', breakin: '12:00 PM', breakout: '1:00 PM',
        },
        {
          id: 2, day: 'Tuesday', timein: '7:00AM', timeout: '5:00 PM', breakin: '12:00 PM', breakout: '1:00 PM',
        },
        {
          id: 3, day: 'Wednesday', timein: '7:00AM', timeout: '5:00 PM', breakin: '12:00 PM', breakout: '1:00 PM',
        },
        {
          id: 4, day: 'Thursday', timein: '7:00AM', timeout: '5:00 PM', breakin: '12:00 PM', breakout: '1:00 PM',
        },
        {
          id: 5, day: 'Friday', timein: '7:00AM', timeout: '5:00 PM', breakin: '12:00 PM', breakout: '1:00 PM',
        },
        {
          id: 6, day: 'Saturday', timein: '-', timeout: '-', breakin: '-', breakout: '-',
        },
        {
          id: 7, day: 'Sunday', timein: '-', timeout: '-', breakin: '-', breakout: '-',
        },
      ],
    };
  },
};
</script>
