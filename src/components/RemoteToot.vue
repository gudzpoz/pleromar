<template>
<div class="toot remote">
  <span>By <a :href="object.attributedTo">{{ object.attributedTo }}</a></span>
  <TootContent :object="object" />
</div>
</template>

<script>
import TootContent from './TootContent.vue'

export default {
  name: 'RemoteToot',
  components: {
    TootContent,
  },
  props: {
    url: String,
  },
  created () {
    this.update(this.url)
  },
  data () {
    return {
      object: {},
      actor: {},
    }
  },
  methods: {
    update (url) {
      fetch(url, {
        headers: {
          'Accept': 'application/activity+json',
        }
      }).then(res => res.json()).then(json => this.object = json)
    },
  },
  watch: {
    url (url) {
      this.update(url)
    },
  },
}
</script>

<style>
.remote {
    background-color: #f0f0f0;
}
</style>
