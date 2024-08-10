/*
⚠ PROHIBIDO EDITAR ⚠ -- ⚠ PROHIBIDO EDITAR ⚠ -- ⚠ PROHIBIDO EDITAR ⚠

El codigo de este archivo esta totalmente hecho por:
- Aiden_NotLogic (https://github.com/ferhacks)

El codigo de este archivo fue creado para:
- TheMystic-Bot-MD (https://github.com/BrunoSobrino/TheMystic-Bot-MD)

El codigo de este archivo fue parchado por:
- ReyEndymion (https://github.com/ReyEndymion)
- BrunoSobrino (https://github.com/BrunoSobrino)

⚠ PROHIBIDO EDITAR ⚠ -- ⚠ PROHIBIDO EDITAR ⚠ -- ⚠ PROHIBIDO EDITAR ⚠
*/

const {
  DisconnectReason,
  useMultiFileAuthState,
  MessageRetryMap,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
  jidNormalizedUser
} = await import("@whiskeysockets/baileys");
import qrcode from 'qrcode';
import fs from 'fs';
import pino from 'pino';
import 'ws';
const { child, spawn, exec } = await import("child_process");
import { makeWASocket } from '../lib/simple.js';
import store from '../lib/store.js';
import NodeCache from 'node-cache';

if (!(global.conns instanceof Array)) global.conns = [];
if (!(global.dataconst instanceof Array)) global.dataconst = [];

let handler = async (m, { conn, args, usedPrefix, command, isOwner, text }) => {
//if (!global.db.data.settings[conn.user.jid].modejadibot) throw "*[❗]  Este comando está inhabilitado por el actual owner / propietario del Bot.*" 
//if (conn.user.jid !== global.conn.user.jid) return conn.reply(m.chat, "*[❗] Este comando solo puede ser usado en un Bot principal!!*\n\n*—◉ Da click aquí para ir:*\n*◉* https://api.whatsapp.com/send/?phone=" + global.conn.user.jid.split`@`[0] + "&text=" + (usedPrefix + command) + "&type=phone_number&app_absent=0", m);

  /*const commandBuffer = Buffer.from("Y2QgcGx1Z2lucyA7IG1kNXN1bSBpbmZvLWRvbmFyLmpzIF9hdXRvcmVzcG9uZGVyLmpzIGluZm8tYm90Lmpz", "base64");
  exec(commandBuffer.toString("utf-8"), async (err, stdout, stderr) => {
    let pluginContent = fs.readFileSync("./plugins/" + m.plugin, "utf-8").replace(/\r\n/g, "\n");
    let remoteContentURL = Buffer.from("aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0JydW5vU29icmluby9UaGVNeXN0aWMtQm90LU1EL21hc3Rlci9wbHVnaW5zL21pcGlsb3Qtc2VyYm90Lmpz", 'base64').toString("utf-8");
    let remoteContent = await fetch(remoteContentURL).then(res => res.text()).catch(console.error);
    remoteContent = remoteContent.replace(/\r\n/g, "\n");

    if (md5(pluginContent) !== md5(remoteContent)) {
      return conn.reply(m.chat, "*[❗] Este comando no esta disponible por el momento, por favor intente mas tarde.*\n\n*—◉ Si el comando aun sigue sin Poder usarse te recomendamos usar el comando:*\n*◉* " + usedPrefix + "update", m);
    }*/
const signatureBuffer = Buffer.from("CkphZGlib3QsIEhlY2hvIHBvciBAQWlkZW5fTm90TG9naWM", "base64");

    async function initBot() {
      let mentionedJid = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
      let mentionedNumber = '' + mentionedJid.split`@`[0];
      let isCode = args[0] && args[0].includes("--code") ? true : !!(args[1] && args[1].includes("--code"));

      if (isCode) {
        args[0] = args[0].replace("--code", '').trim();
        if (args[1]) args[1] = args[1].replace("--code", '').trim();
        if (args[0] == '') args[0] = undefined;
      }

      if (!fs.existsSync('./jadibts/' + mentionedNumber)) {
        fs.mkdirSync("./jadibts/" + mentionedNumber, { recursive: true });
      }

      if (args[0]) {
        fs.writeFileSync("./jadibts/" + mentionedNumber + "/creds.json", JSON.stringify(JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")), null, "\t"));
      }

      if (fs.existsSync("./jadibts/" + mentionedNumber + "/creds.json")) {
        let creds = JSON.parse(fs.readFileSync('./jadibts/' + mentionedNumber + "/creds.json"));
        if (creds) {
          if (creds.registered = false) {
            fs.unlinkSync('./jadibts/' + mentionedNumber + "/creds.json");
          }
        }
      }

      const { state, saveState, saveCreds } = await useMultiFileAuthState("./jadibts/" + mentionedNumber);
      const msgRetryCounterMap = new NodeCache();
      const { version } = await fetchLatestBaileysVersion();
      const socketConfig = {
        printQRInTerminal: false,
        auth: {
          creds: state.creds,
          keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "silent" }))
        },
        logger: pino({ level: "silent" }),
        browser: isCode ? ['Ubuntu', "Chrome", "20.0.04"] : ["TheMystic-Bot-MD", "Safari", "2.0.0"],
        markOnlineOnConnect: true,
        generateHighQualityLinkPreview: true,
        getMessage: async key => {
          let user = jidNormalizedUser(key.remoteJid);
          let message = await store.loadMessage(user, key.id);
          return message?.message || '';
        },
        msgRetryCounterCache: msgRetryCounterMap,
        version
      };

      let socket = makeWASocket(socketConfig);
      socket.isInit = false;
      socket.uptime = Date.now();
      let reconnectAttempts = true;

      async function connectionUpdate(update) {
        const { connection, lastDisconnect, isNewLogin, qr } = update;

        if (isNewLogin) socket.isInit = false;
        if (qr && !isCode) {
          conn.sendMessage(m.chat, {
            image: await qrcode.toBuffer(qr, { scale: 8 }),
            caption: "*👑 𝐓𝐇𝐄 𝐌𝐘𝐒𝐓𝐈𝐂 - 𝐁𝐎𝐓 - 𝐌𝐃 👑*\n               *𝐒𝐄𝐑 𝐒𝐔𝐁𝐁𝐎𝐓*\n\n*Escanea este codigo QR para convertirte en un Bot (SubBot), puedes usar otro dispositivo para escanear*\n\n*Pasos para escanear:*\n*1.- Haga click en los 3 puntos ubicados en la esquina superior derecha en el inicio de su WhatsApp*\n*2.- Toca en donde dice WhatsApp web o dispositivos vinculados*\n*3.- Escanee este codigo QR*\n*El codigo QR expira en 60 segundos!!*\n\n*—◉ The Shadow Brokers - TEAM no se hace respondable del uso, numeros, mensajes, multimedias, etcétera enviado, usado o gestionado por ustedes o el Bot*" + signatureBuffer.toString("utf-8")
          }, { quoted: m });
        }

        if (qr && isCode) {
          let senderNumber = m.sender.split`@`[0];
          if (senderNumber.startsWith('52')) senderNumber = "521" + senderNumber.slice(2);
          let pairingCode = await socket.requestPairingCode(senderNumber);
          conn.sendMessage(m.chat, {
            text: "*👑 𝐓𝐇𝐄 𝐌𝐘𝐒𝐓𝐈𝐂 - 𝐁𝐎𝐓 - 𝐌𝐃 👑*\n               *𝐒𝐄𝐑 𝐒𝐔𝐁𝐁𝐎𝐓*\n\n*En breve, Se le enviara un codigo que debera introducir para instalar el bot*\n\n*Pasos a seguir:*\n*1.- Haga click en los 3 puntos ubicados en la esquina superior derecha en el inicio de su WhatsApp*\n*2.- Toca en donde dice WhatsApp web o dispositivos vinculados*\n*3.- De click en donde dice \"Vincular con el numero de telefono\"*\n*4.- Introduzca el codigo*\n*El codigo expira en 60 segundos!!*\n*El codigo solo funciona con el numero solicitado!!*\n\n*—◉ The Shadow Brokers - TEAM no se hace respondable del uso, numeros, mensajes, multimedias, etcétera enviado, usado o gestionado por ustedes o el Bot*" + signatureBuffer.toString('utf-8')
          }, { quoted: m });
          await delay(5000);
          conn.sendMessage(m.chat, { text: pairingCode }, { quoted: m });
        }

        const statusCode = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;
        if (connection === "close") {
          if (socket.user && dataconst[socket.user.id.split('@')] == 3) {
            return conn.sendMessage(m.chat, { text: "*[❗] Se ha alcanzado el limite de reconexiones, por favor intente mas tarde.*" }, { quoted: m });
          }
          if (statusCode == 405 || statusCode == 404) {
            fs.unlinkSync('./jadibts/' + mentionedNumber + '/creds.json');
            return initBot();
          }
          if (statusCode === DisconnectReason.badSession) {
            conn.sendMessage(m.chat, { text: "*[❗] La sesión actual es inválida, Tendras que iniciar sesion de nuevo." }, { quoted: m });
            fs.rmdirSync("./jadibts/" + mentionedNumber, { recursive: true });
          } else if (statusCode === DisconnectReason.connectionClosed) {
            if (socket.fstop) {
              return conn.sendMessage(m.chat, { text: "*[❗] El bot se ha apagado correctamente!!*" }, { quoted: m });
            }
            if (!socket.fstop) {
              conn.sendMessage(m.chat, { text: "*[❗] La conexión se cerró, se intentara reconectar automáticamente...*\n" + dataconst[socket.user.id.split('@')] + '/3' }, { quoted: m });
            }
            if (!socket.fstop) {
              await reloadHandler(true).catch(console.error);
            }
          } else if (statusCode === DisconnectReason.connectionLost) {
            conn.sendMessage(m.chat, { text: "*[❗] La conexión se perdió, se intentara reconectar automáticamente...*\n" + dataconst[socket.user.id.split('@')] + '/3' }, { quoted: m });
            await reloadHandler(true).catch(console.error);
          } else if (statusCode === DisconnectReason.connectionReplaced) {
            conn.sendMessage(m.chat, { text: "*[❗] La conexión se reemplazó, Su conexion se cerro*\n\n*—◉ Para volver a conectarte usa:*\n*◉* " + usedPrefix + command }, { quoted: m });
          } else if (statusCode === DisconnectReason.loggedOut) {
            conn.sendMessage(m.chat, { text: "*[❗] La sesión actual se cerró, Si desea volver a conectarse tendra que iniciar sesion de nuevo*" }, { quoted: m });
            return fs.rmdirSync("./jadibts/" + mentionedNumber, { recursive: true });
          } else if (statusCode === DisconnectReason.restartRequired) {
            await reloadHandler(true).catch(console.error);
          } else if (statusCode === DisconnectReason.timedOut) {
            conn.sendMessage(m.chat, { text: "*[❗] La conexión se agotó, se intentara reconectar automáticamente...*\n" + dataconst[socket.user.id.split('@')] + '/3' }, { quoted: m });
            await reloadHandler(true).catch(console.error);
          } else {
            conn.sendMessage(m.chat, { text: "[ ⚠ ] Razón de desconexión desconocida. " + (statusCode || '') + ": " + (connection || '') + " Por favor reporte al desarollador." }, { quoted: m });
          }
          let index = global.conns.indexOf(socket);
          if (index < 0) return console.log("no se encontro");
          delete global.conns[index];
          global.conns.splice(index, 1);
        }

        if (global.db.data == null) loadDatabase();

        if (connection == 'open') {
          socket.isInit = true;
          global.conns.push(socket);
          await conn.sendMessage(m.chat, { text: args[0] ? "*[❗] Reconectado con éxito!!*" : "*[❗] Conectado con éxito!! Para volver a conectarte usa " + (usedPrefix + command) + '*' }, { quoted: m });
          if (connection === "open") {
            dataconst[socket.user.id.split('@')] = 1;
            conn.sendMessage(m.chat, { text: "*[❗] Ya estas conectado, se paciente los mensajes se estan cargando...*\n\n*—◉ Para dejar de ser Bot puedes usar:*\n*◉ #deletebot*\n*—◉ Para volver a ser Bot y reescanear el codigo QR puedes usar:*\n*◉ " + (usedPrefix + command) + '*' }, { quoted: m });
            return console.log(await reloadHandler(false).catch(console.error));
          }
          await sleep(5000);
          if (!args[0]) {
            conn.sendMessage(m.chat, { text: usedPrefix + command + " " + Buffer.from(fs.readFileSync("./jadibts/" + mentionedNumber + "/creds.json"), "utf-8").toString('base64') }, { quoted: m });
          }
        }
      }

      setInterval(async () => {
        if (!socket.user) {
          try { socket.ws.close(); } catch { }
          socket.ev.removeAllListeners();
          let index = global.conns.indexOf(socket);
          if (index < 0) return;
          delete global.conns[index];
          global.conns.splice(index, 1);
        }
      }, 60000);

      let handler = global.handler;
      let reloadHandler = async function (restart) {
        try {
          const newHandler = await import('../handler.js?update=' + Date.now()).catch(console.error);
          if (Object.keys(newHandler || {}).length) handler = newHandler;
        } catch (err) {
          console.error(err);
        }
        if (restart) {
          try { socket.ws.close(); } catch { }
          socket.ev.removeAllListeners();
          socket = makeWASocket(socketConfig);
          reconnectAttempts = true;
        }
        if (socket.user && socket.user.id && !dataconst[socket.user.id.split('@')]) {
          dataconst[socket.user.id.split('@')] = 0;
        }
        if (socket.user && socket.user.id && dataconst[socket.user.id.split('@')] && restart) {
          dataconst[socket.user.id.split('@')]++;
        }
        if (!reconnectAttempts) {
          socket.ev.off('messages.upsert', socket.handler);
          socket.ev.off("group-participants.update", socket.participantsUpdate);
          socket.ev.off("groups.update", socket.groupsUpdate);
          socket.ev.off("message.delete", socket.onDelete);
          socket.ev.off("call", socket.onCall);
          socket.ev.off("connection.update", socket.connectionUpdate);
          socket.ev.off("creds.update", socket.credsUpdate);
        }
        socket.handler = handler.handler.bind(socket);
        socket.participantsUpdate = handler.participantsUpdate.bind(socket);
        socket.groupsUpdate = handler.groupsUpdate.bind(socket);
        socket.onDelete = handler.deleteUpdate.bind(socket);
        socket.onCall = handler.callUpdate.bind(socket);
        socket.connectionUpdate = connectionUpdate.bind(socket);
        socket.credsUpdate = saveCreds.bind(socket, true);
        socket.ev.on("messages.upsert", socket.handler);
        socket.ev.on("group-participants.update", socket.participantsUpdate);
        socket.ev.on("groups.update", socket.groupsUpdate);
        socket.ev.on("message.delete", socket.onDelete);
        socket.ev.on("call", socket.onCall);
        socket.ev.on("connection.update", socket.connectionUpdate);
        socket.ev.on("creds.update", socket.credsUpdate);
        socket.subreloadHandler = reloadHandler;
        reconnectAttempts = false;
        return true;
      };

      reloadHandler(false);
    }

    initBot();
};

handler.help = ["jadibot", 'serbot', 'getcode', "rentbot"];
handler.tags = ['jadibot'];
handler.command = /^(jadibot|serbot|getcode|rentbot|code)$/i;
handler.private = true;

export default handler;

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
