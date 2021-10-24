export default {
  computed: {
    isMobile() {
      return this.$screen.breakpoint === 'mobile' || this.$screen.breakpoint === 'tablet';
    },
    isDesktop() {
      return this.$screen.breakpoint === 'desktop' || this.$screen.breakpoint === 'widescreen' || this.$screen.breakpoint === 'fullhd';
    },
  }
}
