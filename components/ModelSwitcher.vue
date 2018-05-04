<template lang="pug">
  div.modelSwitcher
    h3.settingPanel__title.modelSwitcher__title 表示機種選択
    .modelSwitcher__inner
      .modelSwitcher__item.button--toggle.rounded.dam(@click="$emit('toggleDAM')" :class="{ enabled: showDAM }") DAM
      .modelSwitcher__item.button--toggle.rounded.joy(@click="$emit('toggleJOY')" :class="{ enabled: showJOY }") JOYSOUND
    p.statusMessage {{ statusMsg }}

</template>

<script>
export default {
  name: 'model-switcher',
  data () {
    return {
      statusMsg: ''
    }
  },
  props: {
    showDAM: Boolean,
    showJOY: Boolean
  },
  methods: {
    updateStatusMsg: function () {
      if (this.showDAM && this.showJOY) {
        this.statusMsg = 'DAM, JOYSOUND を同時表示中です。'
      } else if (!this.showJOY) {
        this.statusMsg = 'DAM のみ表示中です。'
      } else if (!this.showDAM) {
        this.statusMsg = 'JOYSOUND のみ表示中です。'
      }
    }
  },
  mounted: function () {
    this.updateStatusMsg()
  },
  watch: {
    showDAM: function () {
      this.updateStatusMsg()
    },
    showJOY: function () {
      this.updateStatusMsg()
    }
  }
}
</script>

<style scoped lang="stylus">
.modelSwitcher__inner
  display flex
  justify-content center

.modelSwitcher__item
  padding .5em .8em
  font-size 1.06em

  &.dam.enabled
    background-color #ad2d28

  &.joy.enabled
    background-color #194480

.settingPanel__title
  padding-top .46em
</style>
