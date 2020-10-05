import * as Discord from "discord.js";
import { MessageAttachment, Message } from "discord.js";

const client = new Discord.Client();
const prefix = "!";

(async () => {
    try {
        await client.login(process.env.BOT_TOKEN);

        client.on("message", async function (message: Message) {
            if (message.author.bot) return;
            if (!message.content.startsWith(prefix)) return;

            const commandBody = message.content.slice(prefix.length);
            const args = commandBody.split(" ");
            const command = args.shift()!.toLowerCase();

            if (command === "ping") {
                try {
                    const timeTaken = Date.now() - message.createdTimestamp;
                    await message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
                } catch (error) {
                    await message.reply(`!!ERROR: ${error.message}`);
                }
            } else if (message.content === "!rip") {
                try {
                    const attachment = new MessageAttachment("https://i.imgur.com/w3duR07.png");
                    await message.channel.send(attachment);
                } catch (error) {
                    await message.reply(`!!ERROR: ${error.message}`);
                }
            }
        });

        client.on("ready", () => {
            console.log(`Logged in as ${client.user!.tag}!`);
        });
    } catch (error) {
        console.log(error.message);
    }
})();
