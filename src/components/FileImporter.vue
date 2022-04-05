<template>
<div :class="selected ? 'importer selected' : 'importer empty'">
  <label>
    <div><b>Select <code>{{ file }}</code>:</b></div>
    <input type="file" name="name" @change="commit" />
    <div class="message">{{ message }}</div>
  </label>
</div>
</template>

<script>
export default {
  name: 'file-importer',
  props: {
    modelValue: Object,
    file: String,
  },
  data () {
    return {
      selected: false,
      message: '',
    }
  },
  methods: {
    commit (e) {
      var files = e.target.files
      if (files) {
        if (files[0].name === this.file) {
          this.readAsText(files[0], (result) => {
            this.$emit('update:modelValue', JSON.parse(result))
            this.selected = true
            this.message = ''
          })
        } else {
          this.selected = false
          this.message = `Filename does not match ${this.file}`
        }
      } else {
        this.selected = false
      }
    },
    readAsText (file, callback) {
      var reader = new FileReader()
      reader.onload = () => callback(reader.result)
      reader.onerror = () => callback(null)
      reader.readAsText(file, "UTF-8")
    },
  },
}
</script>

<style>
div.importer {
    display: flex;
    flex-direction: column;
    text-align: left;
    width: fit-content;
    background-color: #eee;
    padding: 1em;
    border-radius: 1em;
    margin: 0.5em;
    transition: all 1s;
}
div.importer.selected {
    background-color: #dfd;
    opacity: 0;
}
div.message {
    color: red;
}
</style>
