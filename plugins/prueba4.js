let handler = async (m, { conn, usedPrefix, text, args, command }) => {
  let totalusr = Object.keys(global.db.data.users).length;
    let _uptime = process.uptime() * 1000;
    let uptime = clockString(_uptime);
    let username = conn.getName(m.sender);
let locale = 'es'
let d = new Date(new Date + 3600000)
let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    }) 

  
await conn.reply(m.chat, '⏱ _Cargando Menu_', m, )
  //m.react("✨");

  let sbot =
    conn.user.jid == global.conn.user.jid
      ? ""
      : `Sᴏʏ Sᴜʙʙᴏᴛ Dᴇ:  Wa.me/${global.conn.user.jid.split`@`[0]}`;

  global.fcontact = {
    key: {
      fromMe: false,
      participant: `0@s.whatsapp.net`,
      remoteJid: "status@broadcast",
    },
    message: {
      contactMessage: {
        displayName: `\n|━━━〔 ${wm} 〕━━━| \nAqui tienes el menu : ${username}`,
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${username}\nitem1.TEL;waid=${m.sender.split("@")[0]}:${m.sender.split("@")[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
      },
    },
  };
  let menu = ``;

  let menu2 = `
*╭─╮︹︹︹⊹︹︹︹⊹︹︹︹⊹*
*┆ ${greeting}  ${username}*
*╰─ ⊹꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦⊹*

╭─╮︹︹︹⊹︹︹︹⊹︹︹︹⊹─╮
┆   *🌹 ɪɴғᴏ  ᴅᴇ ʟᴀ ʙᴏᴛ 🍒*
┝╾─────────────────╯
┆👥*𝘜𝘴𝘶𝘢𝘳𝘪𝘰𝘴: ${totalusr}* 
┆⏱ *𝘓𝘭𝘦𝘷𝘰 𝘈𝘤𝘵𝘪𝘷𝘢: ${uptime}*
┆${sbot}
╰ׄ┄ׅׄ─ׅׄ┄ׅׄ─ׂׅ┄ׅׄ─ׂׅ┄ׅׄ─ׅׄ┄ׅׄ─ׂׅ┄ׅׄ─ׂׅ┄ׅׄ─ׅׄ─ׂׅ┄ׅׄ─ׂ╯`;

  let listSections = [];

  listSections.push({
    title: `AVISO: LA BOT TODAVIA ESTA EN BETA`,
    rows: [
      {
        header: "allmenu",
        title: "Menu Completo",
        description: `para ver todos los comandos`,
        id: `${usedPrefix}allmenu`,
      },
      {
        header: ".",
        title: ".",
        description: `.`,
        id: `${usedPrefix}test`,
      },
    ],
  });

  let img = "https://i.ibb.co/wstbFdW/file.jpg";
  let img2 = "https://i.ibb.co/gwm5mXm/file.png";
  let img3 = "https://i.ibb.co/0s8V5FM/file.png";
 
  await conn.sendList(m.chat, menu, menu2, `Click Aqui`, [img, img2, img3].getRandom(), listSections, estilo, );
};

handler.command = ["menu3"];

export default handler;

function clockString(ms) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor(ms / 60000) % 60;
  const s = Math.floor(ms / 1000) % 60;
  console.log({ ms, h, m, s });
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(":");
}

var estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: packname, orderTitle: 'Bang', thumbnail: yoshiImg, sellerJid: '0@s.whatsapp.net' }}}

  var ase = new Date();
  var hour = ase.getHours();
switch(hour){
  case 0: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌙'; break;
  case 1: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 💤'; break;
  case 2: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🦉'; break;
  case 3: hour = 'Bᴜᴇɴᴏs Dɪᴀs ✨'; break;
  case 4: hour = 'Bᴜᴇɴᴏs Dɪᴀs 💫'; break;
  case 5: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌅'; break;
  case 6: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌄'; break;
  case 7: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌅'; break;
  case 8: hour = 'Bᴜᴇɴᴏs Dɪᴀs 💫'; break;
  case 9: hour = 'Bᴜᴇɴᴏs Dɪᴀs ✨'; break;
  case 10: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌞'; break;
  case 11: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌨'; break;
  case 12: hour = 'Bᴜᴇɴᴏs Dɪᴀs ❄'; break;
  case 13: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌤'; break;
  case 14: hour = 'Bᴜᴇɴᴀs Tᴀʀᴅᴇs 🌇'; break;
  case 15: hour = 'Bᴜᴇɴᴀs Tᴀʀᴅᴇs 🥀'; break;
  case 16: hour = 'Bᴜᴇɴᴀs Tᴀʀᴅᴇs 🌹'; break;
  case 17: hour = 'Bᴜᴇɴᴀs Tᴀʀᴅᴇs 🌆'; break;
  case 18: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌙'; break;
  case 19: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌃'; break;
  case 20: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌌'; break;
  case 21: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌃'; break;
  case 22: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌙'; break;
  case 23: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌃'; break;
}
  var greeting = hour;