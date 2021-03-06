module.exports = (client) => {
    client.permlevel = (message) => {
        let permlvl = 0;
        const permOrder = client.config.permLevels.slice(0).sort((p, c) => (p.level < c.level ? 1 : -1));
        while (permOrder.length) {
            const currentLevel = permOrder.shift();
            if (currentLevel.check(message)) {
                permlvl = currentLevel.level;
                break;
            }
        }
        return permlvl;
    };

    client.log = (type, msg, title) => {
        if (!title) title = `Log`;
        console.log(`[${type}] [${title}] ${msg}`);
    };

    client.awaitReply = async (msg, question, limit = 60000) => {
        const filter = m => m.author.id = msg.author.id;
        await msg.channel.send(question);
        try {
            const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: [`time`] });
            return collected.first().content;
        } catch (e) {
            return false;
        }
    };

    client.clean = async (client, text) => {
        if (text && text.constructor.name == `Promise`) {
            text = await text;
        }
        if (typeof evaled !== `string`) {
            text = require(`util`).inspect(text, { depth: 0 });
        }

        text = text
            .replace(/`/g, `\`${String.fromCharCode(8203)}`)
            .replace(/@/g, `@${String.fromCharCode(8203)}`)
            .replace(client.token, `mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0`);
        return text;
    };

    String.prototype.toProperCase = function () {
        return this.replace(/([^\W_]+[^\s-]*) */g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    };

    client.wait = require(`util`).promisify(setTimeout);
};
