import { CommandInteraction, Guild } from "discord.js";
import { GuildMember, MessageEmbed } from "discord.js";
import type { ArgsOf } from "discordx";

import { Guard, Next, On, Once, Server, Ws } from "@discordx/socket.io";
import { Socket } from "socket.io";

import type { MyQueue } from "../../music.js"
// eslint-disable-next-line import/no-unresolved
import { MyPlayer } from "../../music.js";

import { bot } from "../../main.js"

@Ws()
export class MusicSocket {
  player;

  constructor() {
    this.player = new MyPlayer();
  }

  @On("GET_CHANNEL")
  async onGetConnectionState(
    [guildId]: [string],
    server: Server,
    socket: Socket,
  ): Promise<void> {
    if (guildId) {
      await bot.guilds?.fetch(guildId).then((guild => {
        const queue = this.player.getQueue(guild);

        guild.channels?.fetch(queue.voiceChannelId!).then((channel) => {
          if (channel?.isVoice()) { server.emit("CHANNEL", channel.name); }
        }).catch(() => {
          server.emit("CHANNEL", null);
        })
      })).catch(() => {
        server.emit("CHANNEL", null);
      })
    }
  }

  @On("CONNECT_VOICE")
  async onConnectVoice(
    [ids]: [{ guildId: string, channelId: string }],
    server: Server,
    socket: Socket,
  ): Promise<void> {
    if (ids.guildId) {
      const guild = await bot.guilds?.fetch(ids.guildId)
      const channel = await bot.channels?.fetch(ids.channelId)

      if (guild && channel && channel.isVoice()) {
        const queue = this.player.getQueue(guild);

        queue.join(channel).then(() => {
          server.emit("VOICE_CONNECTED", channel.name)
        }).catch(() => {
          server.emit("VOICE_CONNECTED", null)
        })
      } else {
        server.emit("VOICE_CONNECTED", null)
      }
    }
  }

  @On("GET_TRACK")
  async onGetTrack(
    [guildId]: [string],
    server: Server,
    socket: Socket,
  ): Promise<void> {
    if (guildId) {
      const guild = await bot.guilds?.fetch(guildId)

      if (guild) {
        const queue = this.player.getQueue(guild);

        if (queue.isPlaying && queue.currentTrack?.metadata.isYoutubeTrack()) {
          server.emit("TRACK", Object.assign(queue.currentTrack.metadata.info, { playbackDuration: queue.currentTrack.playbackDuration, user: queue.currentTrack.metadata.options?.user }));
        } else {
          server.emit("TRACK", null)
        }
      } else {
        server.emit("TRACK", null)
      }
    }
  }
}