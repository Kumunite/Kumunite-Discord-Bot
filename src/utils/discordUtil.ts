import { Message, Role } from "discord.js";

class DiscordUtil {
    availableRoles = [
        "PSYC",
        "ECON",
        "BUSAD",
        "INTL",
        "ARHA",
        "PHIL",
        "CLTR",
        "MAVA",
        "SOCI",
        "HIST",
        "LAW",
        "PHYS",
        "CHEM",
        "MATH",
        "MBGE",
        "MEDI",
        "NURS",
        "CHBI",
        "COMP",
        "ELEC",
        "INDR",
        "MECH",
    ];
    createRole = async () => {};

    help = async (message: Message) => {
        try {
            let user = message.member;
            if (user) {
                await user.send(`Available methods: \n\t!listRoles\n\t!addMajor {major name}\n\t!removeMajor {major name}`);
            } else {
                console.log(`${message.author} not a member`);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    listRoles = async (message: Message) => {
        try {
            let user = message.member;
            if (user) {
                await user.send(`Roles: ${this.availableRoles}`);
            } else {
                console.log(`${message.author} not a member`);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    addRole = async (message: Message) => {
        try {
            let roleName = message.content.split(" ")[1];
            let user = message.member;
            if (this.availableRoles.indexOf(roleName) != -1) {
                if (user) {
                    let guild = user.guild;
                    const roles = await guild.roles.fetch();
                    const role = roles.cache.find((role: Role) => role.name === roleName);
                    if (role != null) {
                        await user.roles.add(role, "Major added");
                        await user.send(`New role added: ${roleName}`);
                    } else {
                        await user.send(`Could not find the role: ${roleName}`);
                    }
                } else {
                    console.log(`${message.author} not a member`);
                }
            } else {
                console.log(`${message.author} not a valid role`);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    removeRole = async (message: Message) => {
        try {
            let roleName = message.content.split(" ")[1];
            let user = message.member;
            if (this.availableRoles.indexOf(roleName) != -1) {
                if (user) {
                    let guild = user.guild;
                    const roles = await guild.roles.fetch();
                    const role = roles.cache.find((role: Role) => role.name === roleName);
                    if (role != null) {
                        await user.roles.remove(role, "Major removed");
                        await user.send(`Role removed: ${roleName}`);
                    } else {
                        await user.send(`Could not find the role: ${roleName}`);
                    }
                } else {
                    console.log(`${message.author} not a member`);
                }
            } else {
                console.log(`${message.author} not a valid role`);
            }
        } catch (error) {
            console.log(error.message);
        }
    };
}

export const discordUtil = new DiscordUtil();
