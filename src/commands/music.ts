import { Player, Queue } from "@discordx/music";
import type {
  Guild,
  TextBasedChannel,
} from "discord.js";
import { Message } from 'discord.js';

export class MyQueue extends Queue {
  lastControlMessage?: Message;

  timeoutTimer?: NodeJS.Timeout;

  lockUpdate = false;

  constructor(player: Player, guild: Guild, public channel?: TextBasedChannel) {
    super(player, guild);
  }
}

export class MyPlayer extends Player {
  empty?: String;

  constructor() {
    super();

    this.empty = undefined;
  }
}