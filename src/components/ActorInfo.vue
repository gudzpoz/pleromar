<template>
<div class="info">
  <div class="background">
    <img :src="actor.image.url" />
  </div>
  <div class="header">
    <div class="icon">
      <img class="icon info-icon" :src="actor.icon.url" />
    </div>
    <div class="names">
      <span class="name">{{ actor.name }}</span>
      <span class="id">@{{ actor.preferredUsername }}@{{ host }}</span>
    </div>
  </div>
  <p class="summary" v-html="summary"></p>
  <table>
    <tr v-for="p in properties" :key="p.name">
      <th><b>{{ p.name }}</b></th>
      <td v-html="p.value"></td>
    </tr>
  </table>
</div>
</template>

<script>
export default {
  name: 'ActorInfo',
  props: {
    actor: Object,
  },
  data () {
    return {
    }
  },
  methods: {
  },
  computed: {
    host () {
      return (new URL(this.actor.id)).host
    },
    properties () {
      return this.actor.attachment.filter(i => i.type === 'PropertyValue')
    },
    summary () {
      var str = this.actor.summary
      if (this.actor.tag) {
        for (var tag of this.actor.tag) {
          if (tag.type === 'Emoji') {
            str = str.replaceAll(
              tag.name, `<img class="emoji" src="${tag.icon.url}" loading="lazy" />`
            )
          }
        }
      }
      return str
    },
  },
}
</script>

<style>
.background {
    min-height: 300px;
    width: 100%;
    border-radius: 2em 2em 0 0;
}
.background img {
    width: 100%;
    max-height: 400px;
    object-fit: cover;
    object-position: top;
}
div.icon {
    width: 12em;
    height: 6em;
    margin-left: 3em;
}
img.icon.info-icon {
    width: 12em;
    height: 12em;
    position: relative;
    top: -6em;
}
.info {
    border-radius: 2em;
    background-color: #eee;
    padding-bottom: 2em;
}
.header {
    display: flex;
    flex-direction: row;
}
.header .names {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin-left: 3em;
}
.header span {
    display: block;
    font-size: 1.3em;
    font-family: sans-serif;
}
.summary {
    padding: 0 3em 0 3em;
}
table {
    width: 100%;
}
</style>
