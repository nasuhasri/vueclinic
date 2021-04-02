<template>
  <div class="fullscreeen">
    <div class="bg-blue-grey-1">
    </div>
    <!-- center the form -->
    <div class="q-pa-md flex flex-center">
      <q-card class="my-card q-gutter-sm">
        <!-- <img src="https://cdn.quasar.dev/img/mountains.jpg"> -->

        <q-card-section>
          <div class="text-weight-bold text-center q-pb-lg q-gutter-sm">
            <div class="text-h4 text-primary">Booking Page</div>
            <!-- <div class="text-h4 text-primary">{{ todaysDate }}</div> -->
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none q-gutter-md">
          <!-- Name -->
          <q-input filled v-model="form.name" label="Name" />

          <!-- IC -->
          <q-input filled v-model="form.ic" label="IC Number" />

          <!-- Clinics -->
          <q-select filled v-model="form.clinic" :options="options" label="Clinics" />

          <!-- Date and time -->
          <q-input filled v-model="form.todaysDate" label="Choose Date And Time">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-date 
                    v-model="form.todaysDate" 
                    mask="DD/MM/YYYY HH:mm"
                    :options="optDate"
                  >
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>

            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time 
                    v-model="form.todaysDate" 
                    mask="DD/MM/YYYY HH:mm" 
                    format24h
                    :hour-options="hourOptionsTime1"
                    :minute-options="minuteOptionsTime1"
                  >
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-card-section>

        <!-- <q-card-section class="q-pt-none q-gutter-sm">       
          <p>
            If you remember across sessions, you would have seen this {{countstore}} times.
          </p>
        </q-card-section> -->

        <q-card-section class="q-pt-none q-gutter-sm float-right">
          <q-btn @click="$router.go(-1)" color="primary" label="Back"/>
          <q-btn @click="reset" color="primary" icon-right="send" label="Reset" />
          <q-btn @click="addBooking" color="primary" icon-right="send" label="Submit" />
          <p v-if="submitStatus === 'ok'">Application successfully submitted!</p>
          <p v-if="submitStatus === 'error'">Please refresh and fill in the form</p>
        </q-card-section>
      </q-card>

      <q-dialog v-model="alert" persistent>
        <q-card>
          <q-card-section>
            <div class="text-h6">Notice</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            Estimated time wait: {{ waitingTime }} hour(s)
            <br>
            Please be patient. We will assist you shortly
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>  
  </div>
</template>

<script>
import data from "src/kkmelaka.json"
import { date } from 'quasar'
//import axios from "axios"

export default {
  data () {
    const options = []
    const numClinics = data.clinics.length

    for(let i=0; i<numClinics; i++) {
      options.push(data.clinics[i].name)
    }

    return {
      form: {
        name: '',
        ic: '',
        clinic: '',
        todaysDate: date.formatDate(Date.now, 'DD/MM/YYYY HH:mm'),
      },

      alert: false,

      // store data from json to variable
      clinics: data.clinics,
      // store list of clinics in options to be used
      options: Object.freeze(options),

      hourOptionsTime1: [ 8, 9, 10, 11, 12, 14, 15, 16 ],
      minuteOptionsTime1: [ 0, 30],

      estTime: null,
      numApp: 0,
      submitStatus: null,
      waitingTime: null
    }
  },

  computed: {
    countstore() {
      return localStorage.getItem("countstore")
    }
  },

  methods: {
    addBooking() {
      if(!this.form.name || !this.form.ic || !this.form.clinic || !this.form.todaysDate) {
        this.submitStatus = 'error'
        return
      }

      this.submitStatus = 'ok'
      
      let bookings = [{
          name: this.form.name,
          ic: this.form.ic,
          clinic: this.form.clinic,
          bookingDate: this.form.todaysDate
      }]

      if(localStorage.getItem('bookingsApp')) {
        localStorage.setItem('bookingsApp', JSON.stringify(bookings));
      }

      if(!localStorage.getItem("countstore")) {
        localStorage.setItem("countstore", 0)
      } else {
        localStorage.setItem("countstore", +localStorage.getItem("countstore") + 1)
      }

      this.numApp = localStorage.getItem("countstore")
      this.estTime = this.numApp * 30

      this.waitingTime = this.estTime / 60
      console.log(this.waitingTime + ' hour')
      this.alert = true
    },

    optDate (date) {
      // pastikan tarikh condition mengikut format asal
      return date >= '2021/04/01' && date <= '2021/04/30'
    },

    reset() {
      this.form = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 800px
}  
</style>