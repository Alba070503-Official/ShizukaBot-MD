import fs from 'fs';

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
    let uniqueUsers = new Map();

    let users = [...uniqueUsers.values()];
    let totalUsers = users.length;
    let totalusr = Object.keys(global.db.data.users).length;
    let rtotal = Object.entries(global.db.data.users).length || '0'
    let _uptime = process.uptime() * 1000;
    let uptime = clockString(_uptime);
    let username = conn.getName(m.sender);
    let name = conn.getName(m.sender);
    let locale = 'es';
    let d = new Date(new Date() + 3600000);
    let time = d.toLocaleTimeString(locale, {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });

    let totalreg = Object.keys(global.db.data.users).length;
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length;

    m.react("🐢");
    let menu = ``;

    let txt = `િ ฺ࣭࣪͘ \`ʜᴏʟᴀ\` p𝖾𝗋᷼𝗌᷼♤𝗇᷼𝗂𝗍α    𝗅𝗂𝗇𝖽α   (⁠◍⁠•⁠ᴗ⁠•⁠◍⁠)⁠✧⁠*⁠।
 b𝗂𝖾𝗇𝖾𝗇𝗂𝖽𝗈   𝖺   ყαҽɱσɾι Ⴆσƚ꒱㇀  🌸‛᩠⋆  ⪦┽  :
 •ㅤ༚      𝆹ㅤㅤ•ㅤ༚         𝆹ㅤㅤㅤ•ᨘ
`
    txt += '.͜°˖ `ᴄʀᴇᴀᴅᴏʀ ::`' + ` DevDiego\n`;
    txt += '.͜°˖ `ʙᴏᴛ ::`' + ` YaemoriBot-MD\n`;
    txt += '.͜°˖ `ꜰᴇᴄʜᴀ ::`' + ` ${moment.tz('America/Bogota').format('DD/MM/YY')}\n`;
    txt += '.͜°˖ `ᴘʀᴇꜰɪᴊᴏ ::`' + ` 「 ${usedPrefix} 」\n`;
    txt += '.͜°˖ `ᴜꜱᴜᴀʀɪᴏꜱ ::`' + ` ${rtotal}\n`;
    txt += '.͜°˖ `ᴄᴏɴᴛᴀᴄᴛᴏ ::` #owner\n\n';
    txt += '.͜°˖ `ᴀᴄᴛɪᴠᴏ ::`' + ` ${uptime}\n`;
    txt += "✬✭✰✬";

    let sections = [
        {
            title: `✎ SELECCIÓNA LO QUE NECESITES`,
            rows: [
                {title: "𓆩࿔ྀુ⃟🌹⃟𝘼𝙐𝙏𝙊 𝙑𝙀𝙍𝙄𝙁𝙄𝘾𝘼𝙍 ╎✅", rowId: `#reg ${name}.18`, description: "🗃 Verificacion Automáticamente"},
                {title: "𓆩࿔ྀુ⃟🌹⃟𝙈𝙀𝙉𝙐 𝘾𝙊𝙈𝙋𝙇𝙀𝙏𝙊 ╎ 🍿ꪳ͢", rowId: `#allmenu`, description: "🐢 Muestra el menú completo."},
                {title: "𓆩࿔ྀુ⃟🌹⃟𝙈𝙀𝙉𝙐 𝙉𝙎𝙁𝙒 ╎🔞", rowId: `#hornymenu`, description: "🔥 Muestra el menú +18."},
                {title: "𓆩࿔ྀુ⃟🌹⃟𝙂𝙄𝙏𝙃𝙐𝘽 ╎ ⭐️", rowId: `#sc`, description: "🍟 Muestra el github de la bot."},
                {title: "𓆩࿔ྀુ⃟🌹⃟𝙎𝙆𝙔 𝙐𝙇𝙏𝙍𝘼 𝙋𝙇𝙐𝙎 ╎ 💸", rowId: `#skyplus`, description: "⚡️ Super hosting, Sky Ultra Plus."},
                {title: "𓆩࿔ྀુ⃟🌹⃟𝙎𝙀𝙍𝘽𝙊𝙏 𝘾𝙊𝘿𝙀  ╎ ⚡️", rowId: `#code`, description: "🍟 Ser subbot mediante un codigo de 8 digitos."},
                {title: "𓆩࿔ྀુ⃟🌹⃟𝙂𝙍𝙐𝙋𝙊𝙎 ☁️", rowId: `#grupos`, description: "📲 Muestra los grupos principales de la bot."}
            ]
        }
    ];

    const listMessage = {
        text: txt,
        footer: ` 𓏲᭨ ̤̤֟✧⏤͟͞ू⃪٭ۣۜ ፝͜⁞M͢ᴇɴᴜs۫۫۫۫۫۫۫۫ ᭄፝🍟𑜟꙲𒁑⁩`,
        title: menu,
        buttonText: "Selecciona una opción",
        sections
    };

    await conn.sendMessage(m.chat, listMessage);
};

handler.tags = ['main'];
handler.help = ['menu'];
handler.command = ["menu", "help", "menú"];

export default handler;

function clockString(ms) {
    const h = Math.floor(ms / 3600000);
    const m = Math.floor(ms / 60000) % 60;
    const s = Math.floor(ms / 1000) % 60;
    return [h, m, s].map((v) => v.toString().padStart(2, '0')).join(':');
}
