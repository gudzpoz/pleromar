<template>
<div v-if="!markedDone && !done" class="controls">
  <h1>Pleroma Backup Explorer</h1>
  <h2>--And Static Archive Generator</h2>
  <label class="privacy-checkbox">
    <input type="checkbox" v-model="showPrivate" />
    Show Private Contents?
  </label>
  (<label class="privacy-checkbox">
    <input type="checkbox" v-model="privateOnly" />
    Private Contents Only?
  </label>)
  <button @click="markedDone = true">I'm Done</button>
  <div class="importers">
    <FileImporter v-for="(obj, f) in data" :file="f" :key="f" v-model="data[f]" />
  </div>
</div>
<ActorInfo v-if="data['actor.json'].id" :actor="data['actor.json']" />
<div class="labels">
  <input class="selection-radios" type="radio" v-model="show" value="outbox" name="selection-radios" id="outbox-radio" />
  <label v-if="data['actor.json'].id && data['outbox.json'].id" for="outbox-radio">
    Toots
  </label>
  <input class="selection-radios" type="radio" v-model="show" value="likes" name="selection-radios" id="likes-radio" />
  <label v-if="data['likes.json'].id" for="likes-radio">
    Likes
  </label>
  <input class="selection-radios" type="radio" v-model="show" value="bookmarks" name="selection-radios" id="bookmarks-radio" />
  <label v-if="data['bookmarks.json'].id" for="bookmarks-radio">
    Bookmarks
  </label>
</div>
<OutboxCollection v-if="data['actor.json'].id"
                  :outbox="data['outbox.json']"
                  :actor="data['actor.json']"
                  :publicOnly="!showPrivate"
                  :privateOnly="showPrivate && privateOnly"
                  v-show="show === 'outbox'"
                  id="outbox" />
<MyLikes :likes="data['likes.json']" v-show="show === 'likes'"
         id="likes" />
<MyLikes :likes="data['bookmarks.json']" v-show="show === 'bookmarks'"
         id="bookmarks" />
</template>

<script>
import FileImporter from './components/FileImporter.vue'
import OutboxCollection from './components/Outbox.vue'
import MyLikes from './components/MyLikes.vue'
import ActorInfo from './components/ActorInfo.vue'
export default {
  name: 'App',
  components: {
    FileImporter,
    OutboxCollection,
    MyLikes,
    ActorInfo,
  },
  data () {
    return {
      data: {
        'outbox.json': {},
        'likes.json': {},
        'bookmarks.json': {},
        'actor.json': {},
      },
      showPrivate: false,
      show: 'outbox',
      markedDone: false,
      privateOnly: false,
    }
  },
  computed: {
    done () {
      for (var i in this.data) {
        if (Object.keys(this.data[i]).length === 0) {
          return false
        }
      }
      return true
    },
  },
}
</script>

<style>
#app {
    font-family: Nimbus Roman, serif;
}
h1, h2 {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
h1 {
    text-align: center;
}
h2, .controls {
    text-align: right;
    display: block;
}
div.importers {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
}
div.labels {
    width: 100%;
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    text-align: center;
    margin: 0.5em 0 0.5em 0;
}
.labels input {
    display: none;
}
.labels label {
    display: block;
    padding: 0.5em;
    border-radius: 0.2em;
    border: 1px solid #eee;
}
.labels input:checked+label {
    background: #ddd;
    border: none;
}
</style>
