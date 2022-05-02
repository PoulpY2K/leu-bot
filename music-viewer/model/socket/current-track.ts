import User from "./user"

export default interface CurrentTrack {
  id: string
  title: string
  shortUrl: string
  author: {
    name: string
    url: string
    channelID: string
  }
  bestThumbnail: {
    url: string | null
    width: number
    height: number
  }
  duration: string | null
  playbackDuration: number
  user: User
}