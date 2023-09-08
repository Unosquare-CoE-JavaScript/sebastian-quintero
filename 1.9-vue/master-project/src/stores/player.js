import { defineStore } from 'pinia'
import { Howl } from 'howler'
import { formatTime } from '../includes/helper'

export const usePlayerStore = defineStore('player', {
  state: () => ({
    current_song: {},
    sound: {},
    seek: '00:00',
    duration: '00:00',
    playerProgress: '0%'
  }),
  actions: {
    async newSong(song) {
      if (song === this.current_song) {
        await this.toggleAudio()
        return
      }

      if (this.current_song.modified_name != null) {
        this.sound.stop()
      }

      this.current_song = song

      this.sound = new Howl({
        src: [song.url],
        html5: true
      })

      this.sound.play()

      this.sound.on('play', () => {
        requestAnimationFrame(this.progress)
      })
    },
    async toggleAudio() {
      if (this.sound.playing == null) {
        return
      }

      if (this.sound.playing()) {
        this.sound.pause()
      } else {
        this.sound.play()
      }
    },
    progress() {
      this.seek = formatTime(this.sound.seek())
      this.duration = formatTime(this.sound.duration())

      this.playerProgress = `${100 * (this.sound.seek() / this.sound.duration())}%`

      if (this.sound.playing()) {
        requestAnimationFrame(this.progress)
      }
    },
    updateSeek(event) {
      console.log('updateSeek')
      if (this.sound.playing == null) {
        return
      }

      const { x, width } = event.currentTarget.getBoundingClientRect()
      const clickX = event.clientX - x
      const percentage = clickX / width
      const seconds = this.sound.duration() * percentage

      this.sound.seek(seconds)
      this.sound.once('seek', this.progress)
    }
  },
  getters: {
    playing: (state) => {
      if (state.sound.playing == null) {
        return false
      }

      return state.sound.playing()
    }
  }
})
