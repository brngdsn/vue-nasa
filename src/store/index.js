import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apikey: '',
    apodDate: moment().format('YYYY-MM-DD'),
    apod: {
      body: {
        title: '',
        url: '',
        hdurl: '',
        explanation: '',
        date: ''
      }
    }
  },
  getters: {
    getApikey: state => state.apikey,
    getApod: state => state.apod,
    getApodDate: state => state.apodDate
  },
  mutations: {
    mutApikey (state, apikey) {
      state.apikey = apikey
    },
    mutApod (state, apod) {
      state.apod = apod
    },
    mutApodDate (state, apodDate) {
      state.apodDate = apodDate
    }
  },
  actions: {}
})
