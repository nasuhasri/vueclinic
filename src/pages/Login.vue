<template>
  <!-- <q-page class="flex flex-center">
    <h1>Testing</h1>
  </q-page> -->
  <div class="fullscreen row">
    <div class="col bg-blue-grey-1">
    </div>
    <!-- center the form -->
    <div class="fullscreen flex flex-center">
      <div class="q-pa-md" style="width: 400px">
        <q-card class="my-card">
          <img src="https://cdn.quasar.dev/img/mountains.jpg">

          <q-card-section>
            <div class="text-weight-bold text-center q-pb-lg q-gutter-sm">
              <div class="text-h4 text-primary">Hello!</div>
              <div class="text-caption">Sign In to your account</div>
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-form
              @submit="onSubmit"
              @reset="onReset"
              class="q-gutter-md"
            >
              <q-input
                filled
                v-model="name"
                label="Your name *"
                hint="Name and surname"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />

              <q-input
                filled
                type="number"
                v-model="age"
                label="Your age *"
                lazy-rules
                :rules="[
                  val => val !== null && val !== '' || 'Please type your age',
                  val => val > 0 && val < 100 || 'Please type a real age'
                ]"
              />

              <div>
                <q-btn label="Submit" type="submit" color="primary"/>
                <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
                <q-btn to="/menu" label="next" type="submit" color="primary"/>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>  
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: null,
      age: null,

      accept: false
    }
  },

  methods: {
    onSubmit () {
      if (this.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to accept the license and terms first'
        })
      }
      else {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted'
        })
      }
    },

    onReset () {
      this.name = null
      this.age = null
      this.accept = false
    }
  }
}
</script>
