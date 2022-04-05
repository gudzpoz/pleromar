<template>
<div class="toot">
  <div v-if="object.summary">{{ object.summary }}</div>
  <button class="expand" v-show="isCollapsed()" @click="expand">Expand</button>
  <div v-show="!isCollapsed()">
    <p v-html="content"></p>
    <div class="media">
      <div v-for="i in object.attachment" :key="i.name">
        <p>{{ i.name }}</p>
        <img v-if="i.mediaType.startsWith('image')" :src="i.url" loading="lazy" />
        <video v-else-if="i.mediaType.startsWith('video')" :src="i.url" controls />
        <audio v-else-if="i.mediaType.startsWith('audio')" controls>
          <source :src="i.url" />
        </audio>
        <div v-else>Unable to display media of {{ i.mediaType }}.</div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'TootContent',
  props: {
    object: Object,
  },
  data () {
    return {
      expanded: false,
    }
  },
  methods: {
    expand () {
      this.expanded = true
    },
    isCollapsed () {
      if (this.object.sensitive && !this.expanded) {
        return true
      } else {
        this.expanded = true
        return false
      }
    },
  },
  computed: {
    content () {
      var str = this.object.content
      if (this.object.tag) {
        for (var tag of this.object.tag) {
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
div.media {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
div.media img, div.media video {
    max-width: 16em;
}
.emoji {
    width: 2em;
}
.media>div {
    background-color: #fff;
    border-radius: 0.5em;
    padding: 1em;
    margin: 0.3em;
}
.media>div>p {
    background-color: #eee;
    border-radius: 0.2em;
    padding: 0.2em 1em 0.2em 1em;
    margin: 0.1em;
}
</style>
