import * as Discord from "discord.js";
import { Message, GuildMember, PartialGuildMember } from "discord.js";
import { discordUtil } from "./utils/discordUtil";

const client = new Discord.Client();
const prefix = "!";

// eslint-disable-next-line no-unused-vars
const initialize = async () => {
    try {
        await client.login(process.env.BOT_TOKEN);

        client.on("message", async (message: Message) => {
            if (message.author.bot) return;
            if (!message.content.startsWith(prefix)) return;

            if (message.content.startsWith("!help")) {
                await discordUtil.help(message);
            }

            if (message.content.startsWith("!addRole")) {
                await discordUtil.createRole();
            }

            if (message.content.startsWith("!listRoles")) {
                await discordUtil.listRoles(message);
            }

            if (message.content.startsWith("!addMajor")) {
                await discordUtil.addRole(message);
            }

            if (message.content.startsWith("!removeMajor")) {
                await discordUtil.removeRole(message);
            }
        });

        // client.on("ready", () => {
        //     console.log(`Logged in as ${client.user!.tag}!`);
        // });

        client.on("guildMemberAdd", async (member: GuildMember | PartialGuildMember) => {
            try {
                const roles = await member.guild.roles.fetch();
                const newbieRole = roles.cache.find((r) => r.name === "newbie");
                if (newbieRole != null) {
                    await member.roles.add(newbieRole, "New Members");
                }
                await member.send(
                    ""
                );
            } catch (error) {
                console.log(error.message);
            }
        });
    } catch (error) {
        console.log(error.message);
    }
};

initialize()
    .then(() => {})
    .catch((error) => {
        console.log(error);
    });
