import { CommandInteraction, Guild } from "discord.js";
import { GuildMember, MessageEmbed } from "discord.js";
import type { ArgsOf } from "discordx";

import { Guard, Next, On, Once, Server, Ws } from "@discordx/socket.io";
import { Socket } from "socket.io";

import { bot } from "../main.js"

@Ws()
export class MusicSocket {
  @On("CHECK_GUILD")
  async onCheckGuild(
    [guildId]: [string],
    server: Server,
    socket: Socket,
  ): Promise<void> {
    if (guildId) {
      bot.guilds?.fetch(guildId).then((guild) => {
        if (guild.id == guildId) {
          server.emit("GUILD", guild.id);
        } else {
          server.emit("GUILD", null)
        }
      }).catch(() => {
        server.emit("GUILD", null)
      })
    }
  }

  @On("CHECK_CHANNEL")
  async onCheckChannel(
    [channelId]: [string],
    server: Server,
    socket: Socket,
  ): Promise<void> {
    if (channelId) {
      await bot.channels?.fetch(channelId).then((channel) => {
        if (channel?.id == channelId && channel.isVoice()) {
          server.emit("CHANNEL", channel.name);
        } else {
          server.emit("CHANNEL", null)
        }
      }).catch(() => {
        server.emit("CHANNEL", null)
      })
    }
  }
}