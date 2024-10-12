import ws from 'ws';

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
    let d = new Date(new Date() + 3600000);  // Corrección en la creación del objeto Date
    let time = d.toLocaleTimeString(locale, {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });

    let totalreg = Object.keys(global.db.data.users).length;
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length;

    m.react("🐢");

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
    let listSections = [];

    listSections.push({
        title: `✎ SELECCIÓN LO QUE NECESITES`,
        highlight_label: `Popular YaemoriBot`,
        rows: [
            {
                header: "𓆩࿔ྀુ⃟🌹⃟𝘼𝙐𝙏𝙊 𝙑𝙀𝙍𝙄𝙁𝙄𝘾𝘼𝙍 ╎✅",
                title: "",
                description: `🗃 Verificación Automática`,
                id: `#reg ${name}.18`,
            },
            {
                header: "𓆩࿔ྀુ⃟🌹⃟𝙈𝙀𝙉𝙐 𝘾𝙊𝙈𝙋𝙇𝙀𝙏𝙊 ╎ 🍿ꪳ͢",
                title: "",
                description: `🐢 Muestra el menú completo.`,
                id: `#allmenu`,
            },
            {
                header: "𓆩࿔ྀુ⃟🌹⃟𝙈𝙀𝙉𝙐 𝙉𝙎𝙁𝙒 ╎🔞",
                title: "",
                description: `🔥 Muestra el menú +18.`,
                id: `#hornymenu`,
            },
            {
                header: "𓆩࿔ྀુ⃟🌹⃟𝙂𝙄𝙏𝙃𝙐𝘽 ╎ ⭐️",
                title: "",
                description: `🍟 Muestra el GitHub del bot.`,
                id: `#sc`,
            },
            {
                header: "𓆩࿔ྀુ⃟🌹⃟𝙎𝙆𝙔 𝙐𝙇𝙏𝙍𝘼 𝙋𝙇𝙐𝙎 ╎ 💸",
                title: "",
                description: `⚡️ Super hosting, Sky Ultra Plus.`,
                id: `#skyplus`,
            },
            {
                header: "𓆩࿔ྀુ⃟🌹⃟𝙎𝙋𝙀𝙀𝘿 ╎ 🌸",
                title: "",
                description: `🚀 Muestra su velocidad y más.`,
                id: `#speed`,
            },
            {
                header: "𓆩࿔ྀુ⃟🌹⃟𝙎𝙀𝙍𝘽𝙊𝙏 𝘾𝙊𝘿𝙀 ╎ ⚡️",
                title: "",
                description: `🍟 Ser subbot mediante un código de 8 dígitos.`,
                id: `#code`,
            },
            {
                header: "𓆩࿔ྀુ⃟🌹⃟𝙎𝙀𝙍𝘽𝙊𝙏 𝙌𝙍 ╎ 📂",
                title: "",
                description: `☁️ Ser subbot mediante un código QR.`,
                id: `#serbot`,
            },
            {
                header: "𓆩࿔ྀુ⃟🌹⃟𝙎𝙐𝘽𝘽𝙊𝙏𝙎 ╎ 🚩",
                title: "",
                description: `🟢 Muestra los subbots en línea.`,
                id: `#bots`,
            },
            {
                header: "𓆩࿔ྀુ⃟🌹⃟𝙂𝙍𝙐𝙋𝙊𝙎 ☁️",
                title: "",
                description: `📲 Muestra los grupos principales del bot.`,
                id: `#grupos`,
            },
        ],
    });

    let vid = "https://qu.ax/yddg.jpg";
    let img = "https://qu.ax/fprhC.jpg";
    let img2 = "https://qu.ax/uuYfC.jpg";

    // Selecciona una imagen aleatoria
    let randomImage = [vid, img, img2][Math.floor(Math.random() * 3)];

    // Enviar el menú
    await conn.sendListB(m.chat, menu, txt, ` 𓏲᭨ ̤̤֟✧⏤͟͞ू⃪٭ۣۜ ፝͜⁞M͢ᴇɴᴜs۫۫۫۫۫۫۫۫ ᭄፝🍟𑜟꙲𒁑⁩`, randomImage, listSections, esti);
};

handler.tags = ['main'];
handler.help = ['menu'];
handler.command = ["menu", "help", "menú"];

export default handler;

// Función para convertir el tiempo de actividad en formato legible
function clockString(ms) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor(ms / 60000) % 60;
  const s = Math.floor(ms / 1000) % 60;
  console.log({ ms, h, m, s });
  return [h, m, s].map((v) => v.toString().padStart(2, '0')).join(":");
}

// Configuración de saludos según la hora
var ase = new Date();
var hour = ase.getHours();
switch(hour){
  case 0: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌙'; break;
  case 1: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌙'; break;
  case 2: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌙'; break;
  case 3: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌙'; break;
  case 4: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌙'; break;
  case 5: hour = 'Bᴜᴇɴᴏs Días 🌅'; break;
  case 6: hour = 'Bᴜᴇɴᴏs Días 🌅'; break;
  case 7: hour = 'Bᴜᴇɴᴏs Días 🌅'; break;
  case 8: hour = 'Bᴜᴇɴᴏs Días 🌅'; break;
  case 9: hour = 'Bᴜᴇɴᴏs Días 🌅'; break;
  case 10: hour = 'Bᴜᴇɴᴏs Días 🌅'; break;
  case 11: hour = 'Bᴜᴇɴᴏs Días 🌅'; break;
  case 12: hour = 'Bᴜᴇɴᴏs Días 🌅'; break;
  case 13: hour = 'Bᴜᴇɴᴀs Tᴀʀᴅᴇs 🌞'; break;
  case 14: hour = 'Bᴜᴇɴᴀs Tᴀʀᴅᴇs 🌞'; break;
  case 15: hour = 'Bᴜᴇɴᴀs Tᴀʀᴅᴇs 🌞'; break;
  case 16: hour = 'Bᴜᴇɴᴀs Tᴀʀᴅᴇs 🌞'; break;
  case 17: hour = 'Bᴜᴇɴᴀs Tᴀʀᴅᴇs 🌞'; break;
  case 18: hour = 'Bᴜᴇɴᴀs Tᴀʀᴅᴇs 🌞'; break;
  case 19: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌙'; break;
  case 20: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌙'; break;
  case 21: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌙'; break;
  case 22: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌙'; break;
  case 23: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌙'; break;
  default: hour = 'Bᴜᴇɴᴀs 🌟'; break;
}
