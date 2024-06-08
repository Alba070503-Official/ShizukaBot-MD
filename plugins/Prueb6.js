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

  const fkontak2 = {'key': {'participants': '0@s.whatsapp.net', 'remoteJid': 'status@broadcast', 'fromMe': false, 'id': 'Halo'}, 'message': {'contactMessage': {'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}, 'participant': '0@s.whatsapp.net'};
      conn.sendMessage(m.chat, {image: img, caption: str.trim(), mentions: [...str.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + '@s.whatsapp.net')}, {quoted: fkontak2});
    }
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

  let listSections = []    
listSections.push({
title: '',
rows: [{ header: "Menu Completo", title: "", id: `.menu`, description: `Para ver todos los comandos\n` }, { header: "SudBot", title: "", id: `.serbot --code`, description: `Para volverte sudbot 🤖\n` },
{ header: "Velocidad", title: "", id: `.ping`, description: `Ver velocidad del bot\n` },
{ header: "Play", title: "", id: `.play`, description: `Para descargar musica 🎧\n` },
{ header: "creador", title: "", id: `.owner`, description: `comunicate con mi creador ⚙️` }
]});

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

  
  await conn.sendList(m.chat, '👋🏻 Hola¡! Bienvenido A Mi Sub Menú\n\n*Creador:* Alba070503\n*Versión:* 1.0.0\n\n💮 si hay algún error puedes contactarme, usa el comando: #owner\n\nGracias¡! 🔴', null, `Selecione la opción correcta (⁠・⁠∀⁠・⁠)`, listSections, { mentions: [m.sender]}, {quoted: m})
  } catch (e) {
    conn.reply(m.chat, '❎ Lo sentimos, el menú tiene un error.', m)
    throw e
  }
}

handler.command = ["menu4"];

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
