<template lang="pug">
  div.modelSwitcher
    h3.settingPanel__title.modelSwitcher__title 表示機種選択
    .modelSwitcher__inner
      .modelSwitcher__item.button--toggle.rounded.dam(@click="toggleDAM" :class="{ enabled: settings.showDAM }") DAM
      .modelSwitcher__item.button--toggle.rounded.joy(@click="toggleJOY" :class="{ enabled: settings.showJOY }") JOYSOUND
    p.statusMessage {{ statusMsg }}

</template>

<script lang="ts">
import { mapState } from 'vuex'

export default {
  name: 'ModelSwitcher',
  data: () => ({
    statusMsg: ''
  }),
  computed: {
    ...mapState(['settings'])
  },
  mounted: function() {
    this.updateStatusMsg()
  },
  methods: {
    updateStatusMsg() {
      if (this.settings.showDAM && this.settings.showJOY) {
        this.statusMsg = 'DAM, JOYSOUND を同時表示中です。'
      } else if (!this.settings.showJOY) {
        this.statusMsg = 'DAM のみ表示中です。'
      } else if (!this.settings.showDAM) {
        this.statusMsg = 'JOYSOUND のみ表示中です。'
      }
    },
    toggleDAM() {
      this.$store.commit('setSettings', {
        showDAM: !this.settings.showDAM
      })
      if (!this.settings.showDAM && !this.settings.showJOY) {
        this.$store.commit('setSettings', {
          showJOY: true
        })
      }
      this.updateStatusMsg()
    },
    toggleJOY() {
      this.$store.commit('setSettings', {
        showJOY: !this.settings.showJOY
      })
      if (!this.settings.showDAM && !this.settings.showJOY) {
        this.$store.commit('setSettings', {
          showDAM: true
        })
      }
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
