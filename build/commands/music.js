import { Player, Queue } from "@discordx/music";
export class MyQueue extends Queue {
    channel;
    lastControlMessage;
    timeoutTimer;
    lockUpdate = false;
    constructor(player, guild, channel) {
        super(player, guild);
        this.channel = channel;
    }
}
export class MyPlayer extends Player {
    constructor() {
        super();
    }
}
