import type { CommandInteraction, Guild } from "discord.js";
import { GuildMember, MessageEmbed } from "discord.js";
import type { ArgsOf } from "discordx";

import { Guard, Next, On, Once, Server, Ws } from "@discordx/socket.io";
import { Socket } from "socket.io";

import type { MyQueue } from "../../music.js"
// eslint-disable-next-line import/no-unresolved
import { MyPlayer } from "../../music.js";

@Ws()
export class MusicSocket {
  @On("chat message")
  @Guard(([message]: [string], server: Server, socket: Socket, next: Next) => {
    console.log(message, typeof server, typeof socket, typeof next);
    return next();
  })
  onChatMsg(
    [message]: [string],
    server: Server,
    socket: Socket,
    arg4: unknown
  ): void {
    console.log(message, typeof server, typeof socket, typeof arg4);
    server.emit("chat message", message);
  }
}