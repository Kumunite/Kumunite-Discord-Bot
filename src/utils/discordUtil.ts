import { Message, Role } from "discord.js";

class DiscordUtil {
    createRole = async () => {};

    addRole = async (message: Message) => {
        try {
            let roleName = message.content.split("")[1];
            let user = message.member;
            if (user) {
                let guild = user.guild;
                const roles = await guild.roles.fetch();
                const role = roles.cache.find((role: Role) => role.name === roleName);
                if (role != null) {
                    await user.roles.add(role, "New Members");
                }
                await user.send(`New role added:, ${roleName}`);
            } else {
                console.log(`${message.author} not a member`);
            }
        } catch (error) {
            console.log(error.message);
        }
    };
}

export const discordUtil = new DiscordUtil();
