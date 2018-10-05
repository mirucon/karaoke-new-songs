<template>
  <section class="container">
    <div>
      <form-input
        :errors="[]"
        label="label"
      />
      <app-button
        text="テキスト"
      />
    </div>
  </section>
</template>

<script>
import moment from 'moment'
import AppLogo from '~/components/AppLogo.vue'
import FormInput from '~/components/molecules/FormInput'
import AppButton from '~/components/atoms/AppButton'

export default {
  components: {
    AppButton,
    FormInput,
    AppLogo
  },
  async fetch({ store }) {
    // Get next week's Tuesday if it is Thursday or later.
    let date = moment().utcOffset('+09:00')
    if (
      moment()
        .utcOffset('+09:00')
        .isoWeekday() > 3
    ) {
      date = date.add(1, 'weeks').day(2)
    } else {
      date = date.isoWeekday(2)
    }
    await store.dispatch('songs/getSingleWeekSongs', date.format('YYYY-MM-DD'))
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
