<template lang="pug">
  div.settingPanel
    .toggle--modalSwitcher.toggle--settingPanel(@click="click" :class="{ isOpen: showSettingPanel, isClosed: !hasOpenedOnce }")
      img.icon(:src="sliderH" width="32" height="32")
      span.label 設定
    transition(name="fadeLeft")
      div.modalWindow.settingPanel__inner(v-show="showSettingPanel" :class="{ isOpen: showSettingPanel }")
        span.icon--clear.modalWindow__close.settingPanel__close(@click="click")
          span.top
          span.bottom
        model-switcher
</template>

<script>
import ModelSwitcher from '~/components/ModelSwitcher.vue'
import sliderHIcon from '~/assets/icon/sliders-h.svg'

export default {
  name: 'SettingPanel',
  components: {
    ModelSwitcher
  },
  data: () => ({
    showSettingPanel: false,
    hasOpenedOnce: false,
    sliderH: sliderHIcon
  }),
  methods: {
    click() {
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
      right -30px
    1%
      right 0
    100%
      right 100%
  @keyframes moveRight
    0%
      right 100%
    95%
      right 0
    100%
      right -30px
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

.toggle--modalSwitcher
  display flex
  flex-flow column wrap
  align-items center
  justify-content center
  position fixed
  right -30px
  bottom 10px
  z-index 60
  width 66px
  height 63px
  padding 6px 12px
  color #fff
  opacity .68
  line-height 1.3
  transition .2s all, .7s opacity
  user-select none
  cursor pointer
  box-shadow 0 0 1px rgba(0, 0, 0, .14)
  .icon
    transform scale(.8)
    filter invert(100%)
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
    opacity 1
    animation .7s moveLeft forwards
  &:not(.isOpen):hover
    width 68px
    padding-right 18px
    padding-left @padding-right

  @media screen and (min-width $desktopMin)
    right 0

  @media only screen and (device-width 375px) and (device-height 812px) and (-webkit-device-pixel-ratio 3)
    bottom 40px

.toggle--settingPanel
  background-color #a24c4c

.modalWindow
  position fixed
  top 0
  right 0
  left 0
  z-index 100
  width 100vw
  height 120vh
  padding 1em .3em 22vh .3em
  background-color #ffffffef
  text-align center
  overflow-y auto
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
    margin-top .8em
    color #555
    font-size .98em
  h3
    margin-bottom .8em

  @media screen and (min-width $desktopMin)
    left auto
    height 100%
    width $settingWidthDesktop
    padding-bottom 1em

.modalWindow__close
  width 50px
  height 50px
  .top, .bottom
    left calc(50% - 14px)
</style>
