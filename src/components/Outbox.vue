<template>
<div class="outbox">
  <TootItem v-for="toot in collection()" :key="toot.id" :toot="toot" :actor="actor" :publicOnly="publicOnly" :privateOnly="privateOnly" />
</div>
</template>

<script>
import TootItem from './Toot.vue'

export default {
  name: 'OutboxCollection',
  props: {
    outbox: Object,
    actor: Object,
    publicOnly: Boolean,
    privateOnly: Boolean,
  },
  data () {
    return {
    }
  },
  methods: {
    collection (paging, page) {
      var items = this.outbox.orderedItems
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
  computed: {
  },
  components: {
    TootItem,
  },
}
</script>

<style>

</style>
