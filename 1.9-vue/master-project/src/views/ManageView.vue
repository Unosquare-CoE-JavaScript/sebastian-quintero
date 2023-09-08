<script>
import AppUpload from '../components/AppUpload.vue'
import CompositionItem from '../components/CompositionItem.vue'
import { auth, songsCollection } from '../includes/fake-server'
import { useUserStore } from '../stores/user'

export default {
  name: 'ManageView',
  components: { AppUpload, CompositionItem },
  data() {
    return {
      songs: []
    }
  },
  methods: {
    updateSong(i, values) {
      this.songs[i].modified_name = values.modified_name
      this.songs[i].genre = values.genre
    },
    removeSong(i) {
      this.songs.splice(i, 1)
    },
    addSong(doc) {
      const song = {
        ...doc.data(),
        docId: doc.id
      }

      this.songs.push(song)
    }
  },
  async created() {
    const snapshot = await songsCollection.where('uid', '==', auth.currentUser.uid).get()

    snapshot.forEach(this.addSong)
  }
  // beforeRouteLeave(to, from, next) {
  //   this.$refs.upload.cancelUploads()
  //   next()
  // },
  // beforeRouteEnter(to, from, next) {
  //   const store = useUserStore()
  //   if (store.isLoggedIn) {
  //     next()
  //   } else {
  //     next({ name: 'home' })
  //   }
  // },
}
</script>

<template>
  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <AppUpload ref="upload" :addSong="addSong"></AppUpload>
      </div>
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <CompositionItem
              v-for="(song, i) in songs"
              :key="song.docId"
              :song="song"
              :updateSong="updateSong"
              :index="i"
              :removeSong="removeSong"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
