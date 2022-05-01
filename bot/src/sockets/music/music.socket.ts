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

  @On("GET_TRACK")
  async onStatus(
    [guildId]: [string],
    server: Server,
    socket: Socket,
  ): Promise<void> {
    const queue = this.player.getQueue(await bot.guilds.fetch(guildId));

    if (queue.isPlaying && queue.currentTrack?.metadata.isYoutubeTrack()) {
      server.emit("TRACK", queue.currentTrack.metadata.info);
    } else {
      server.emit("TRACK", null)
    }
  }
}