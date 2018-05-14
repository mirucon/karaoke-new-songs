<template>
  <div>
    <nuxt/>
  </div>
</template>

<style lang="stylus">
html
  font-family -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", Meiryo, sans-serif
  font-size 16px
  line-height 1.6
  word-spacing 1px
  -ms-text-size-adjust 100%
  -webkit-text-size-adjust 100%
  -moz-osx-font-smoothing grayscale
  -webkit-font-smoothing antialiased
  box-sizing border-box

*, *:before, *:after
  margin 0
  padding 0
  box-sizing border-box

.container
  max-width 800px
  margin 0 auto

/* CSS icon */
.icon--caret
  display inline-block
  position: relative
  top 7px
  width: 10px
  height: 18px
  color #fff
  vertical-align middle
  transition all .2s
  &::before, &::after
    content ''
    position: absolute
    right 2px
    margin auto
    width 12px
    height 2px
    box-shadow: inset 0 0 0 32px $accent
    transform-origin right

  &.right
    transition all .2s
    &::before
      transform rotate(45deg)
    &::after
      transform rotate(-45deg)
  &.left
    transition all .2s
    right .16em
    &::before
      transform rotate(135deg)
    &::after
      transform rotate(-135deg)

.icon--clear
  position absolute
  right 0
  z-index 1
  cursor: pointer

  .top, .bottom
    position absolute
    top calc(50% - 1px)
    left calc(50% - 9px)
    width 60%
    height 1px
    background-color: #aaa;
    transition .2s all
  .top
    transform rotate(45deg)
  .bottom
    transform rotate(135deg)

  &:hover
    .top, .bottom
      background-color: #000;

/* Button style */
.hidden
  position absolute !important;
  clip rect(1px 1px 1px 1px)
  clip rect(1px, 1px, 1px, 1px)

.button--toggle
  padding .4em .5em
  border-radius 1px
  background-color #aaa
  user-select none
  cursor pointer
  transition background-color .2s

  &:not(:last-child)
    margin-right .3em

  &.enabled
    background-color #39c
    color #fff

  &.rounded
    border-radius 1.8em

  &.outlined
    border-color transparent
    color #666
    &.enabled
      border 1px solid
      background-color #fff
      color #111

.button--green
  display inline-block
  margin-top .8em
  padding 10px 24px
  border 1px solid #00619F
  border-radius 4px
  color #00619F
  text-decoration none
  transition .2s

  &:hover
    color #fff
    background-color #00619F

@media print
  .next, .prev, .searchBox, .searchBox__label, .backToTop, .settingPanel, *[class^='toggle--']
    display none
</style>
