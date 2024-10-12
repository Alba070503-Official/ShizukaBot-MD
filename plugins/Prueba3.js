let handler = async (m, { conn, usedPrefix, text, args, command }) => {
    let uniqueUsers = new Map();

    let users = [...uniqueUsers.values()];
    let totalUsers = users.length;
    let totalusr = Object.keys(global.db.data.users).length;
    let rtotal = Object.entries(global.db.data.users).length || '0';
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

    // Definir el título del menú
    let menu = '𝙈𝙀𝙉𝙐 𝙋𝙍𝙄𝙉𝘾𝙄𝙋𝘼𝙇';

    // Estructura del mensaje de texto
    let txt = `િ ฺ࣭࣪͘ \`ʜᴏʟᴀ\` p𝖾𝗋᷼𝗌᷼♤𝗇᷼𝗂𝗍α    𝗅𝗂𝗇𝖽α   (⁠◍⁠•⁠ᴗ⁠•⁠◍⁠)⁠✧⁠*⁠。\n`;
    txt += `b𝗂𝖾𝗇𝖾𝗇𝗂𝖽𝗈   𝖺   ყαҽɱσɾι Ⴆσƚ꒱㇀  🌸‛᩠⋆  ⪦┽  :\n`;
    txt += `•ㅤ༚      𝆹ㅤㅤ•ㅤ༚         𝆹ㅤㅤㅤ•ᨘ\n`;
    txt += '.͜°˖ `ᴄʀᴇᴀᴅᴏʀ ::` DevDiego\n';
    txt += '.͜°˖ `ʙᴏᴛ ::` YaemoriBot-MD\n';
    txt += `.͜°˖ \`ꜰᴇᴄʜᴀ ::\` ${moment.tz('America/Bogota').format('DD/MM/YY')}\n`;
    txt += `.͜°˖ \`ᴘʀᴇꜰɪᴊᴏ ::\` 「 ${usedPrefix} 」\n`;
    txt += `.͜°˖ \`ᴜꜱᴜᴀʀɪᴏꜱ ::\` ${rtotal}\n`;
    txt += '.͜°˖ `ᴄᴏɴᴛᴀᴄᴛᴏ ::` #owner\n\n';
    txt += `.͜°˖ \`ᴀᴄᴛɪᴠᴏ ::\` ${uptime}\n`;
    txt += "✬✭✰✬";

    // Secciones del menú
    let sections = [
        {
            title: "Menú Principal",
            rows: [
                { title: "Auto Verificar", rowId: `${usedPrefix}reg ${name}.18` },
                { title: "Menú Completo", rowId: `${usedPrefix}allmenu` },
                { title: "Menú NSFW", rowId: `${usedPrefix}hornymenu` },
                { title: "GitHub", rowId: `${usedPrefix}sc` },
                { title: "Sky Ultra Plus", rowId: `${usedPrefix}skyplus` },
                { title: "Velocidad", rowId: `${usedPrefix}speed` },
                { title: "Subbot por Código", rowId: `${usedPrefix}code` },
                { title: "Subbot por QR", rowId: `${usedPrefix}serbot` },
                { title: "Subbots", rowId: `${usedPrefix}bots` },
                { title: "Grupos", rowId: `${usedPrefix}grupos` },
            ],
        },
    ];

    // Enviar el menú interactivo usando sendMessage
    await conn.sendMessage(m.chat, {
        text: txt,
        title: menu,
        buttonText: "Selecciona una opción",
        sections: sections
    });
};

// Función para convertir el tiempo en formato legible
function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
    return [h, ' Horas ', m, ' Minutos ', s, ' Segundos '].map(v => v.toString().padStart(2, 0)).join('');
}

handler.help = ['menu', 'help', '?'];
handler.tags = ['main', 'info'];
handler.command = /^(menu|help|\?)$/i;

export default handler;
