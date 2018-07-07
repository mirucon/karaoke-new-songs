<template lang="pug">
  transition(name="fade")
    div.wrapper--loadingAnimation(v-show="processing")
      div.loadingAnimation__inner
        div.loadingAnimation__circleContainer
          div#circleContainerInner.loadingAnimation__circleContainerInner
            //div#circleLeft.circle.left
            div#circleMid.circle.middle
            //div#circleRight.circle.right
            div#bar.bar
      div.loadingAnimation__background
</template>

<script lang="ts">
import moment from 'moment'
import { mapState } from 'vuex'
import { TimelineMax } from 'gsap'

export default {
  name: 'LoadingAnimation',
  data: () => ({
    isWindowShown: true,
    startedTime: ''
  }),
  computed: mapState(['processing']),
  watch: {
    processing() {
      console.log('PROCESSING STATUS HAS BEEN SET TO: ' + this.processing)
    }
  },
  mounted() {
    const bar: HTMLElement = document.getElementById('bar')
    const tl: any = new TimelineMax({ repeat: -1 })
    tl.fromTo(
      bar,
      1,
      {
        left: '0',
        bottom: '0',
        width: '0',
        height: '0'
      },
      {
        left: 'auto',
        bottom: 'auto',
        width: '120px',
        height: '120px'
      }
    )
    tl.fromTo(
      bar,
      0.2,
      {
        width: '120px',
        height: '120px',
        opacity: 1
      },
      {
        width: '140px',
        height: '140px',
        opacity: 0
      }
    )
  }
}
</script>

<style scoped lang="stylus">
.wrapper--loadingAnimation
  display flex
  align-items center
  justify-content center
  position fixed
  top 0
  right 0
  left 0
  bottom 0
  z-index 99999
  opacity .99

.loadingAnimation__background
  position absolute
  top 0
  right 0
  left 0
  bottom 0
  z-index -1
  background-color #dddddd

.loadingAnimation__inner
  display flex
  align-items center
  justify-content center
  height 96%
  width 96%
  padding 1%
  border 3px solid #c9c9c9

.loadingAnimation__circleContainer
  display flex
  justify-content center
  align-items center
  width 220px
  height 220px
  background-color #dadada
  box-shadow 0 0 1px rgba(0, 0, 0, .06)

.loadingAnimation__circleContainerInner
  display flex
  justify-content center
  align-items center
  position relative

.circle
  position absolute
  width 24px
  height @width
  // margin 0 5px
  border solid #f9f9f9 2px
  background-color transparent
  border-radius 50%
  box-shadow 0 0 1px rgba(0, 0, 0, .03)
  &.left
    left -40px
    margin-left -11px
  &.middle
    left auto
  &.right
    right -40px

.bar-something
  position absolute
  width 120px
  height @width
  border 1px solid #e9e9e9
  border-radius 50%
  box-shadow 0 0 1px rgba(0, 0, 0, .03)
  z-index 999

.bar
  position absolute
  bottom -14px
  left 7px
  width 13px
  height 2px
  border 1px solid #f9f9f9
  border-radius 50%
  transform rotate(41deg)
  box-sizing border-box

.fade-enter-active
  opacity 1
  transition all .5s ease-out
.fade-leave-active
  opacity 0
  transition all .5s ease-out
</style>
