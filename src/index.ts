import * as Discord from "discord.js";
import { MessageAttachment } from "discord.js";

const client = new Discord.Client();
const prefix = "!";

(async () => {
    try {
        await client.login(process.env.BOT_TOKEN);

        client.on("message", async function (message) {
            console.log(message);
            if (message.author.bot) return;
            if (!message.content.startsWith(prefix)) return;

            const commandBody = message.content.slice(prefix.length);
            const args = commandBody.split(" ");
            const command = args.shift()!.toLowerCase();

            if (command === "ping") {
                const timeTaken = Date.now() - message.createdTimestamp;
                await message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
            } else if (message.content === "!rip") {
                // Create the attachment using MessageAttachment
                const attachment = new MessageAttachment("https://i.imgur.com/w3duR07.png");
                // Send the attachment in the message channel
                await message.channel.send(attachment);
            }
        });

        client.on("ready", () => {
            console.log(`Logged in as ${client.user!.tag}!`);
        });
    } catch (error) {
        console.log(error.message);
    }
})();
