import * as Discord from "discord.js";
import { MessageAttachment, Message, GuildMember, PartialGuildMember } from "discord.js";

const client = new Discord.Client();
const prefix = "!";

export const initialize = async () => {
    try {
        await client.login(process.env.BOT_TOKEN);

        client.on("message", async (message: Message) => {
            if (message.author.bot) return;
            if (!message.content.startsWith(prefix)) return;

            const commandBody = message.content.slice(prefix.length);
            const args = commandBody.split(" ");
            const command = args.shift()!.toLowerCase();

            if (command === "test") {
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

            if (message.content.startsWith("!kick")) {
                const user = message.mentions.users.first();
                if (user) {
                    const member = message.guild != null ? message.guild.member(user) : null;
                    if (member) {
                        member
                            .kick("Optional reason that will display in the audit logs")
                            .then(() => {
                                message.reply(`Successfully kicked ${user.tag}`);
                            })
                            .catch((err) => {
                                message.reply("I was unable to kick the member");
                                console.error(err);
                            });
                    } else {
                        await message.reply("That user isn't in this guild!");
                    }
                } else {
                    await message.reply("You didn't mention the user to kick!");
                }
            }

            if (message.content.startsWith("!addMajor")) {
            }

            if (message.content.startsWith("!addMinor")) {
                try {
                    const user = message.mentions.users.first();
                    let roles = await member.guild.roles.fetch();
                    let newbieRole = roles.cache.find((r) => {
                        return r.name == "newbie";
                    });
                    if (newbieRole != null) {
                        await member.roles.add(newbieRole, "New Members");
                    }
                } catch (e) {
                    console.log(e.message);
                }
            }
        });

        client.on("ready", () => {
            console.log(`Logged in as ${client.user!.tag}!`);
        });

        client.on("guildMemberAdd", async (member: GuildMember | PartialGuildMember) => {
            try {
                let roles = await member.guild.roles.fetch();
                let newbieRole = roles.cache.find((r) => {
                    return r.name == "newbie";
                });
                if (newbieRole != null) {
                    await member.roles.add(newbieRole, "New Members");
                }
                member.send(`Welcome to the server, ${member}`);
            } catch (e) {
                console.log(e.message);
            }
        });

        client.on("message", async (message: Message) => {});
    } catch (error) {
        console.log(error.message);
    }
};
