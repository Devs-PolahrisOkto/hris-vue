<template>
  <div class="is-flex is-justify-content-center is-align-items-center is-flex-direction-column p-5">
    <no-record-illustration :width="width" :height="height"></no-record-illustration>
    <div class="has-text-weight-light p-5">No records.</div>
  </div>
</template>

<script>
export default {
  components: {
    NoRecordIllustration: () => import('@/components/Illustrations/NoRecordIllustration'),
  },

  props: {
    width: {
      type: [ Number, String ],
      default: 280,
    },
    height: {
      type: [ Number, String ],
      default: 280,
    },
  },
};
</script>
