<template lang="pug">
  header.header
    div.container
      h1.siteTitle <!--DAM 週間配信曲クイックビューワー-->

</template>

<script>
export default {
  name: 'app-header'
}
</script>

<style scoped lang="stylus">
.header
  margin-bottom 2em
  box-shadow 0 1px 0 rgba(0, 0, 0, 0)

.siteTitle
  display block
  padding .3em .5em
  color #222
  font-size 2em
  font-weight 600
  text-align center
</style>
