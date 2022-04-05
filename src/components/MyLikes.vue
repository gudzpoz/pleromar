<template>
<div class="likes">
  <div class="like create" v-for="toot in collection()" :key="toot">
    <span class="link"><a :href="toot">{{ toot }}</a></span>
    <RemoteToot :url="toot" />
  </div>
</div>
</template>

<script>
import RemoteToot from './RemoteToot.vue'

export default {
  name: 'MyLikes',
  props: {
    likes: Object,
  },
  components: {
    RemoteToot,
  },
  data () {
    return {
    }
  },
  methods: {
    collection (paging, page) {
      var items = this.likes.orderedItems
      if (items) {
        if (paging) {
          return items.slice(paging * page, paging * (page + 1))
        } else {
          return items
        }
      } else {
        return []
      }
    },
  },
}
</script>

<style scoped>
div.create.like {
    flex-direction: column;
}
</style>
