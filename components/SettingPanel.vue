<template lang="pug">
  div.settingPanel
    .settingPanel__bar
      .toggle--settingPanel(@click="click" :class="{ isOpen: showSettingPanel, isClosed: !hasOpenedOnce }")
        font-awesome-icon.icon(:icon="slidersH" size="2x")
        span.label 設定
    transition(name="fadeLeft")
      div.settingPanel__inner(v-show="showSettingPanel" :class="{ isOpen: showSettingPanel }")
        span.icon--clear.settingPanel__close(@click="click")
          span.top
          span.bottom
        model-switcher(@toggleDAM="$emit('toggleDAM')" @toggleJOY="$emit('toggleJOY')" :showDAM="showDAM" :showJOY="showJOY")
</template>

<script>
import ModelSwitcher from '~/components/ModelSwitcher.vue'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faSlidersH from '@fortawesome/fontawesome-free-solid/faSlidersH'

export default {
  name: 'setting-panel',
  components: {
    FontAwesomeIcon,
    ModelSwitcher
  },
  props: {
    showDAM: Boolean,
    showJOY: Boolean
  },
  data () {
    return {
      showSettingPanel: false,
      hasOpenedOnce: false
    }
  },
  computed: {
    slidersH () {
      return faSlidersH
    }
  },
  methods: {
    click: function () {
      this.showSettingPanel = !this.showSettingPanel
      if (!this.hasOpenedOnce) {
        this.hasOpenedOnce = true
      }
    }
  }
}
</script>

<style lang="stylus">
$settingWidthDesktop = 360px
$desktopMin = 641px
$mobileMax = 1023px

@media screen and (max-width $mobileMax)
  @keyframes moveLeft
    0%
      right 0
    100%
      right 100%
  @keyframes moveRight
    0%
      right 100%
    100%
      right 0
@media screen and (min-width $desktopMin)
  @keyframes moveLeft
    0%
      right 0
    100%
      right $settingWidthDesktop
  @keyframes moveRight
    0%
      right $settingWidthDesktop
    100%
      right 0

@media screen and (max-width $mobileMax)
  @keyframes fadeInLeft
    0%
      right -100%
      left auto
    99%
      left auto
    100%
      right 0
      left 0
  @keyframes fadeOutLeft
    0%
      left 0
    1%
      left auto
    100%
      right -100%
      left auto
@media screen and (min-width $desktopMin)
  @keyframes fadeInLeft
    0%
      right -($settingWidthDesktop)
    100%
      right 0
  @keyframes fadeOutLeft
    0%
      right 0
    100%
      right -($settingWidthDesktop)

.settingPanel__bar
  display flex
  justify-content center
  position fixed
  right 0
  bottom 0
  left 0
  z-index 100
  background-color #a24c4c
  color #fff

  @media screen and (min-width $desktopMin)
    flex-direction column
    top 0
    bottom 0
    left initial

  & > *[class^='toggle--']
    display flex
    flex-flow column wrap
    justify-content center
    position fixed
    right 0
    bottom 40px
    padding 6px 16px
    background-color #a24c4c
    color #fff
    opacity .68
    transition .2s all
    user-select none
    cursor pointer
    box-shadow 0 0 1px rgba(0, 0, 0, .14)
    .icon
      transform scale(.8)
    .label
      text-align center
      font-size .8em
      color #ddd

    &:not(.isClosed)
      animation .7s moveRight forwards

    &:hover
      background-color #a24c4c - #111
    &.isOpen
      background-color #a24c4c - #222
      animation .7s moveLeft forwards
    &:not(.isOpen):hover
      padding-right 18px
      padding-left @padding-right

    @media screen and (min-width $desktopMin)
      bottom 100px

.settingPanel__inner
  position fixed
  top 0
  right 0
  left 0
  z-index 100
  width 100vw
  height 120vh
  padding 1em .3em 0
  background-color #ffffffef
  text-align center
  box-shadow 0 0 2px rgba(0, 0, 0, .14)
  transition .7s all

  & > *:not(:first-child)
    padding 1.6em 0
    border-bottom 1px solid #ddd

  &.fadeLeft-enter-active
    animation fadeInLeft .7s forwards
  &.fadeLeft-leave-active
    animation fadeOutLeft .7s
  .fadeLeft-enter, .fadeLeft-leave-to
    right -100%
    left auto

  p
    padding-top .8em
    color #555
    font-size .98em

  @media screen and (min-width $desktopMin)
    left auto
    height 100%
    width $settingWidthDesktop

.settingPanel__close
  width 50px
  height 50px
  .top, .bottom
    left calc(50% - 14px)
</style>
