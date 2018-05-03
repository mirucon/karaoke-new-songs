<template lang="pug">
  div.FooterAds
    adsbygoogle(
      ad-slot="3876574254" :ad-style="style"
    )
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

</style>
