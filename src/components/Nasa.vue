<template><div class="nasa">

  <section class="section">
    <div class="container"
      style="max-width:600px;">

      <div class="notification">
        <!--<img src="../assets/logo-nasa.png" style="opacity:.1;" />-->
        <strong>NASA</strong>
      </div>

      <div class="field is-grouped">
        <p class="control is-large"
          :class="{
            'is-loading': busy
          }"
          >
          <input class="input is-large" type="text" placeholder="API Key"
            v-model="apikey"
            v-on:keyup.enter="onExplore"
            :disabled="busy"
            :class="{
              'is-loading': busy,
              'is-danger': error
            }"
            >
        </p>
        <!--<p class="control">
          <router-link tag="a" class="button is-primary"
            :to="{
              name: 'NasaApiKey',
              params: {
                apikey: apikey
              }
            }"
            >
            Accept
          </router-link>
        </p>-->
      </div>

      <!--<div class="field">
        <p>
          <pre>apikey={{apikey}}</pre>
        </p>
      </div>-->

      <div class="field">
        <p class="control">
          <button class="button is-primary"
            style="width:100%;"
            :class="{
              'is-loading': busy,
              'is-danger': error
            }"
            :disabled="busy"
            @click="onExplore()"
            >Explore
          </button>
        </p>
      </div>

      <!--<div class="field">
        <p>
          <pre>{{getApod}}</pre>
        </p>
      </div>-->

      <div class="field" v-if="success">
        <div class="card">
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img :src="getApod.url" alt="Image">
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">{{getApod.title}}</p>
                <p class="subtitle is-6">
                  <span class="tag is-info nasa-link"
                    @click="onPage('left')"
                    >
                    <i class="fa fa-arrow-left" aria-hidden="true"></i>
                  </span>
                  {{getApod.date}}
                  <span class="tag is-info nasa-link"
                    @click="onPage('right')"
                    >
                    <i class="fa fa-arrow-right" aria-hidden="true"></i>
                  </span>
                </p>
              </div>
            </div>

            <div class="content">
              {{getApod.explanation}}
              <!--Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Phasellus nec iaculis mauris. <a>@bulmaio</a>.
              <a>#css</a> <a>#responsive</a>-->
              <!--<br>-->
              <!--<small>{{getApod.date}}</small>-->
            </div>
          </div>
          <div class="card-image">
            <figure class="image is-4by3">
              <img :src="getApod.hdurl" alt="Image">
            </figure>
          </div>
        </div>
      </div>

      <article class="message is-danger" v-else-if="error">
        <div class="message-header">
          <p><strong>Sorry</strong>! <a href="https://api.nasa.gov/index.html#apply-for-an-api-key">Learn more</a></p>
          <button class="delete"></button>
        </div>
        <div class="message-body">
          Terribly sorry, but you need a valid <strong>API Key</strong> to explore NASA API.. You can apply for one <a href="https://api.nasa.gov/index.html#apply-for-an-api-key">here</a>.
        </div>
      </article>

      <router-view></router-view>
    
    </div>
  </section>

</div></template>

<script>
  import moment from 'moment'
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  export default {
    name: 'nasa',
    data () {
      return {
        apikey: '',
        success: false,
        error: false,
        busy: false
      }
    },
    computed: {
      ...mapGetters([
        'getApikey',
        'getApod',
        'getApodDate'
      ])
    },
    methods: {
      ...mapMutations([
        'mutApikey',
        'mutApod',
        'mutApodDate'
      ]),
      ...mapActions([
        // actions
      ]),
      onPage (pageDirection) {
        switch (pageDirection) {
          case 'left':
            if (this.getApodDate !== moment().format('YYYY-MM-DD')) {
              this.mutApodDate(moment(this.getApodDate).add(1, 'd').format('YYYY-MM-DD'))
              this.onExplore()
            }
            break
          case 'right':
            this.mutApodDate(moment(this.getApodDate).subtract(1, 'd').format('YYYY-MM-DD'))
            this.onExplore()
            break
        }
      },
      async onExplore () {
        this.busy = true
        try {
          const response = await this.$http
            .get(`https://api.nasa.gov/planetary/apod?api_key=${this.apikey}&date=${this.getApodDate}`)
          console.log(response)
          this.mutApikey(this.apikey)
          this.mutApod(response.data)
          this.error = false
          this.success = true
        } catch (e) {
          this.error = e
          this.success = false
        }
        this.busy = false
      },
      async fetch () {
        this.busy = true
        await Promise.resolve()
        this.busy = false
      }
    },
    async created () {
      this.fetch()
    },
    mounted () {
      console.log('* Mounted Nasa!')
      this.apikey = this.getApikey
    }
  }
</script>

<style scoped>
  .nasa {

  }
  .field:not(:last-child) {
      margin-bottom: 0.75rem;
  }
  .nasa-link:hover {
    cursor:pointer;
    background-color:orangered;
    opacity:.75;
  }
</style>
