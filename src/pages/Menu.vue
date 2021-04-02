<template>
  <div class="fullscreeen">
    <div class="bg-blue-grey-1">
    </div>
    <!-- center the form -->
    <div class="q-pa-md flex flex-center">
      <q-card class="my-card bg-warning text-white">
        <!-- <img src="https://cdn.quasar.dev/img/mountains.jpg"> -->

        <q-card-section>
          <div class="text-weight-bold text-center q-pb-lg q-gutter-sm">
            <div class="text-h4 text-white">Active Cases</div>
            <div class="text-h4 text-white">{{ infoCovid.activeCases }}</div>
          </div>
        </q-card-section>
        
        <q-card-section class="bg-primary text-white">
          <div class="text-weight-bold text-center q-pb-lg q-gutter-sm">
            <div class="text-h4">Tested Positive</div>
            <div class="text-h4 text-white">{{ infoCovid.testedPositive }}</div>
          </div>
        </q-card-section>

        <q-card-section class="bg-positive text-white">
          <div class="text-weight-bold text-center q-pb-lg q-gutter-sm">
            <div class="text-h4">Recovered</div>
            <div class="text-h4 text-white">{{ infoCovid.recovered }}</div>
          </div>
        </q-card-section>

        <q-card-section class="bg-red-6 text-white">
          <div class="text-weight-bold text-center q-pb-lg q-gutter-sm">
            <div class="text-h4">Death</div>
            <div class="text-h4 text-white">{{ infoCovid.deceased }}</div>
          </div>
        </q-card-section> 

        <q-card-section class="bg-deep-purple-6 text-white">
          <div class="text-weight-bold text-center q-pb-lg q-gutter-sm">
            <div class="text-h4">In ICU</div>
            <div class="text-h4 text-white">{{ infoCovid.inICU }}</div>
          </div>
        </q-card-section> 

        <q-card-section class="bg-pink-6 text-white">
          <div class="text-weight-bold text-center q-pb-lg q-gutter-sm">
            <div class="text-h4">Respiratory Aid</div>
            <div class="text-h4 text-white">{{ infoCovid.respiratoryAid }}</div>
          </div>
        </q-card-section> 

        <!-- <q-card-section class="bg-indigo-6 text-white">
          <div class="text-weight-bold text-center q-pb-lg q-gutter-sm">
            <div class="text-h4">Another Data from Different API</div>
            <div class="text-h6 text-white">{{ infoC19 }}</div>
          </div>
        </q-card-section>  -->

        <q-card-section class="bg-secondary text-white">
          <div class="text-weight-bold text-center q-pb-lg q-gutter-sm">
            <q-btn @click="$router.go(-1)" color="primary" label="Back"/>
            <q-btn to="/booking" label="next" type="submit" color="primary"/>
          </div>
        </q-card-section>            
      </q-card>
    </div>  
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      info: null,
      infoCovid: [],
      infoC19: []
    }
  },

  methods: {
    async fetchData() {
      const options = {
        method: 'GET',
        url: 'https://covid-193.p.rapidapi.com/statistics',
        params: {country: 'malaysia'},
        headers: {
          'x-rapidapi-key': process.env.API_KEY,
          'x-rapidapi-host': 'covid-193.p.rapidapi.com'
        }
      };

      axios.request(options)
        .then((response => {
          this.infoC19 = response.data
          console.log(response.data);
          console.log(this.infoC19.country)
        }))
        .catch(function (error) {
          console.error(error + ' error here');
        });

      try {
        const url = `https://api.apify.com/v2/key-value-stores/6t65lJVfs3d8s6aKc/records/LATEST?disableRedirect=true.`
        const response = await axios.get(url)

        this.infoCovid = response.data
        console.log(results.activeCases + ' test')
      } catch (err) {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          console.log("Server Error:", err)
        } else if (err.request) {
          // client never received a response, or request never left
          console.log("Network Error:", err)
        } else {
          console.log("Client Error:", err)
        }
      }
    }
  },

  mounted () {
    axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => (this.info = response))

    this.fetchData()
  },
  
}
</script>


<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 800px
}  
</style>