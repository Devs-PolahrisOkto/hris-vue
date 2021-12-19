<template>
  <div class="is-flex is-justify-content-center is-align-items-center is-flex-direction-column p-5">
    <no-record-illustration></no-record-illustration>
    <div class="has-text-weight-light p-5">No records.</div>
  </div>
</template>

<script>
export default {
  components: {
    NoRecordIllustration: () => import('@/components/Illustrations/NoRecordIllustration'),
  },
};
</script>
