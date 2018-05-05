<template lang="pug">
  div.footerAds
    div.container
      // adsbygoogle(
        ad-slot="3876574254" :ad-style="style"
      // )
</template>

<script>
import AdsByGoogle from '@nuxtjs/google-adsense'

export default {
  name: 'footer-ads',
  components: {
    AdsByGoogle
  },
  data: () => ({
    style: {
      display: 'block',
      margin: '0 auto'
    }
  })
}
</script>

<style scoped lang="stylus">
.footerAds
  margin 10px 0
</style>
