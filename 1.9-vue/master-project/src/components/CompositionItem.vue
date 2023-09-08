<script>
import { storage } from '../includes/fake-server'
import { songsCollection } from '../includes/fake-server'

export default {
  name: 'CompositionItem',
  props: {
    song: {
      type: Object,
      required: true
    },
    updateSong: {
      type: Function,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    removeSong: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      schema: {
        title: 'required|min:3|max:100',
        genre: 'alpha_spaces'
      },
      showForm: false,
      in_submission: false,
      show_alert: false,
      alert_variant: 'bg-blue-500',
      alert_message: 'Please wait! Updating song info.'
    }
  },
  computed: {
    initialValues() {
      return { title: this.song.modified_name, genre: this.song.genre }
    }
  },
  methods: {
    async edit(values) {
      this.in_submission = true
      this.show_alert = true
      this.alert_variant = 'bg-blue-500'
      this.alert_message = 'Please wait! Updating song info.'

      const updatedValues = {
        modified_name: values.title,
        genre: values.genre
      }

      try {
        await songsCollection.doc(this.song.docId).update(updatedValues)
      } catch (err) {
        console.error(err)
        this.in_submission = false
        this.alert_variant = 'bg-red-500'
        this.alert_message = 'Something went wrong! Try again later'
        return
      }

      this.updateSong(this.index, updatedValues)

      this.in_submission = false
      this.alert_variant = 'bg-green-500'
      this.alert_message = 'Success!'
    },
    async deleteSong() {
      const storageRef = storage.ref()
      const songRef = storageRef.child(`songs/${this.song.original_name}`)

      await songRef.delete()

      await songsCollection.doc(this.song.docId).delete()

      this.removeSong(this.index)
    }
  }
}
</script>

<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div v-show="!showForm">
      <h4 class="inline-block text-2xl font-bold">{{ song.modified_name }}</h4>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
        @click.prevent="deleteSong"
      >
        <i class="fa fa-times"></i>
      </button>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
        @click.prevent="showForm = !showForm"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <div v-show="showForm">
      <div
        v-if="show_alert"
        class="text-white text-center font-bold p-4 mb-4"
        :class="alert_variant"
      >
        {{ alert_message }}
      </div>
      <VeeForm :validation-schema="schema" :initial-values="initialValues" @submit="edit">
        <div class="mb-3">
          <label class="inline-block mb-2">Song Title</label>
          <VeeField
            name="title"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Song Title"
          />
          <ErrorMessage name="title" class="text-red-600" />
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">Genre</label>
          <VeeField
            name="genre"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Genre"
          />
          <ErrorMessage name="genre" class="text-red-600" />
        </div>
        <button type="submit" class="py-1.5 px-3 rounded text-white bg-green-600">Submit</button>
        <button
          type="button"
          class="py-1.5 px-3 rounded text-white bg-gray-600"
          @click.prevent="showForm = !showForm"
        >
          Go Back
        </button>
      </VeeForm>
    </div>
  </div>
</template>
