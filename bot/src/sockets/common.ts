import { CommandInteraction, Guild } from "discord.js";
import { GuildMember, MessageEmbed } from "discord.js";
import type { ArgsOf } from "discordx";

import { Guard, Next, On, Once, Server, Ws } from "@discordx/socket.io";
import { Socket } from "socket.io";

import { bot } from "../main.js"

@Ws()
export class MusicSocket {
  @On("CHECK_GUILD")
  async onStatus(
    [guildId]: [string],
    server: Server,
    socket: Socket,
  ): Promise<void> {
    const guild = await bot.guilds.fetch(guildId);

    if (guild.id == guildId) {
      server.emit("GUILD", guild.id);
    } else {
      server.emit("GUILD", null)
    }
  }
}