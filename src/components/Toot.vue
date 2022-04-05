<template>
<div class="toot">
  <div v-if="toot.type === 'Create' && isPublic(toot)" class="create">
    <img class="icon" :src="actor.icon.url" />
    <div>
      <span class="user">{{ user }}</span>
      <mdicon class="scope" :name="iconify(scope(toot))" />
      <span class="link" v-if="toot.object.inReplyTo">In Reply To
        <a :href="toot.object.inReplyTo">{{ toot.object.inReplyTo }}</a>
      </span>
      <span class="date">{{ Date(toot.published).toLocaleString() }}</span>
      <TootContent :object="toot.object" />
    </div>
  </div>
  <div class="announce" v-else-if="toot.type === 'Announce' && isPublic(toot)">
    <img class="icon" :src="actor.icon.url" />
    <div class="announce-content">
      Announced: <a :href="toot.object">{{ toot.object }}</a>
      (<span class="date">{{ Date(toot.published).toLocaleString() }}</span>)
      <RemoteToot :url="toot.object" />
    </div>
  </div>
</div>
</template>

<script>
import RemoteToot from './RemoteToot.vue'
import TootContent from './TootContent.vue'

export default {
  name: 'TootItem',
  components: {
    RemoteToot,
    TootContent,
  },
  props: {
    toot: Object,
    actor: Object,
    publicOnly: Boolean,
    privateOnly: Boolean,
  },
  methods: {
    scope (toot) {
      const pub = 'https://www.w3.org/ns/activitystreams#Public'
      const followers = this.actor.followers
      if (toot.to?.includes(pub)) {
        return 'public'
      } else if (toot.cc?.includes(pub)) {
        return 'unlisted'
      } else if (toot.to?.includes(followers)) {
        return 'followers'
      } else {
        return 'private'
      }
    },
    isPublic (toot) {
      const publicScopes = ['public', 'unlisted']
      var scope = this.scope(toot)
      if (this.publicOnly) {
        if (publicScopes.includes(scope)) {
          return true
        } else {
          return false
        }
      } else {
        if (this.privateOnly) {
          return !publicScopes.includes(scope)
        } else {
          return true
        }
      }
    },
    iconify (type) {
      return {
        'public': 'web',
        'unlisted': 'lock-open-variant',
        'followers': 'lock',
        'private': 'email',
      }[type]
    },
  },
  computed: {
    domain () {
      return (new URL(this.actor.id)).host
    },
    user () {
      return `${this.actor.preferredUsername}@${this.domain}`
    },
  },
}
</script>

<style>
div.create, div.announce {
    display: flex;
    flex-direction: row;
    background-color: #eee;
    margin: 0.2em;
    border-radius: 0.2em;
    padding: 0.4em;
}
img.icon {
    border-radius: 100%;
    width: 3rem;
    height: 3rem;
    margin-right: 1em;
}
.announce img.icon {
    width: 1.2rem;
    height: 1.2rem;
    margin-right: 0.3em;
}
.date {
    text-align: right;
}
span.link, span.user, span.scope, span.date {
    display: inline-block;
    background-color: white;
    padding: 0 0.4em 0 0.4em;
    border-radius: 0.2em;
    margin-right: 1em;
}
span.scope svg {
    max-height: 1.1em;
    color: gray;
}
</style>
