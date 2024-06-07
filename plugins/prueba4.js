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

  
await conn.reply(m.chat, '⏱ _Cargando Menu_', m )
  m.react("✨");

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
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${username}\nitem1.TEL;waid=${m.sender.split("@")[0]}:${m.sender.split("@")[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
      },
    },
  };
  let menu = ``;

  let menu2 = `
*╭─╮︹︹︹⊹︹︹︹⊹︹︹︹⊹*
*┆  ${username}*
*╰─ ⊹꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦⊹*

╭─╮︹︹︹⊹︹︹︹⊹︹︹︹⊹─╮
┆   *🌹 ɪɴғᴏ  ᴅᴇ ʟᴀ ʙᴏᴛ 🍒*
┝╾─────────────────╯
┆⏱ *𝘓𝘭𝘦𝘷𝘰 𝘈𝘤𝘵𝘪𝘷o: ${uptime}*
┆Este menu esta en fase prueba 
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
        header: "owner",
        title: "Información del creado",
        description: `verifica si quieres hablar con mi creador`,
        id: `${usedPrefix}owner`,
      },
    ],
  });

  let img = "https://i.ibb.co/wstbFdW/file.jpg";
  let img2 = "https://i.ibb.co/gwm5mXm/file.png";
  let img3 = "https://i.ibb.co/0s8V5FM/file.png";
  let img4 = "https://i.ibb.co/d6svLy0/file.jpg";
  let img5 = "https://telegra.ph/file/2885253414cbf7b0878f3.jpg";
  let img6 = "https://telegra.ph/file/ce57807eed899516484c7.jpg";
  let img7 = "https://telegra.ph/file/63fd2e414b81fb8161d3a.jpg";
  let img8 = "https://telegra.ph/file/3594f35921ce75d5c5e16.jpg";
  let img9 = "https://telegra.ph/file/4f89789a5b1f874622ffd.jpg";
  let img10 = "https://i.ibb.co/SKm0T9S/file.jpg";
  let img11 = "https://telegra.ph/file/20633f54b3d054c95cd58.jpg";

  
  await conn.sendList(m.chat, menu, menu2, `Click Aqui`, [img, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11].getRandom(), listSections,);
};

handler.command = ["menu"];

export default handler;

function clockString(ms) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor(ms / 60000) % 60;
  const s = Math.floor(ms / 1000) % 60;
  console.log({ ms, h, m, s });
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(":");
}


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
