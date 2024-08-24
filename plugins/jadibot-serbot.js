/*
⚠ PROHIBIDO EDITAR ⚠ -- ⚠ PROHIBIDO EDITAR ⚠ -- ⚠ PROHIBIDO EDITAR ⚠

El codigo de este archivo esta totalmente hecho por:
- [TuNombre] (https://github.com/TuPerfilGitHub)

El codigo de este archivo fue creado para:
- [TuBotName] (https://github.com/TuBotRepo)

⚠ PROHIBIDO EDITAR ⚠ -- ⚠ PROHIBIDO EDITAR ⚠ -- ⚠ PROHIBIDO EDITAR ⚠
*/

const {
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
  DisconnectReason,
  jidNormalizedUser
} = await import("@whiskeysockets/baileys");
import fs from 'fs';
import pino from 'pino';
import NodeCache from 'node-cache';
import { makeWASocket } from '../lib/simple.js';
import store from '../lib/store.js';

if (!(global.conns instanceof Array)) global.conns = [];
if (!(global.dataconst instanceof Array)) global.dataconst = [];

let handler = async (m, { conn, args, usedPrefix, command, isOwner, text }) => {
    async function initBot() {
        let mentionedJid = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
        let mentionedNumber = '' + mentionedJid.split`@`[0];
        let isCode = command.includes("code");

        if (isCode) {
            args[0] = args[0] ? args[0].replace("code", '').trim() : '';
        }

        if (!fs.existsSync('./jadibts/' + mentionedNumber)) {
            fs.mkdirSync("./jadibts/" + mentionedNumber, { recursive: true });
        }

        if (args[0]) {
            fs.writeFileSync("./jadibts/" + mentionedNumber + "/creds.json", JSON.stringify(JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")), null, "\t"));
        }

        if (fs.existsSync("./jadibts/" + mentionedNumber + "/creds.json")) {
            let creds = JSON.parse(fs.readFileSync('./jadibts/' + mentionedNumber + "/creds.json"));
            if (creds && creds.registered === false) {
                fs.unlinkSync('./jadibts/' + mentionedNumber + "/creds.json");
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
            browser: ["Shizuka-Bot-MD", "Safari", "2.0.0"],
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
            const { connection, lastDisconnect, qr } = update;

            if (qr && isCode) {
                let senderNumber = m.sender.split`@`[0];
                if (senderNumber.startsWith('52')) senderNumber = "521" + senderNumber.slice(2);
                let pairingCode = await socket.requestPairingCode(senderNumber);
                conn.sendMessage(m.chat, {
                    text: "*🍁 ShizukaBot-MD 🍁*\n\n*Ser Bot Por Codigo*\n\n*En breve, Se le enviara un codigo que debera introducir para instalar el bot*\n\n*Pasos a seguir:*\n*1.- Haga click en los 3 puntos ubicados en la esquina superior derecha en el inicio de su WhatsApp*\n*2.- Toca en donde dice WhatsApp web o dispositivos vinculados*\n*3.- De click en donde dice \"Vincular con el numero de telefono\"*\n*4.- Introduzca el codigo*\n*El codigo expira en 60 segundos!!*\n*El codigo solo funciona con el numero solicitado!!*\n\n**ੈ✩‧₊˚ 『SpaceNight Team』 *ੈ✩‧₊˚ no se hace respondable del uso, numeros, mensajes, multimedias, etcétera enviado, usado o gestionado por ustedes o el Bot*"
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
                    conn.sendMessage(m.chat, { text: "*[❗] La sesión actual es inválida, Tendras que iniciar sesion de nuevo.*" }, { quoted: m });
                    fs.rmdirSync("./jadibts/" + mentionedNumber, { recursive: true });
                } else if (statusCode === DisconnectReason.connectionClosed) {
                    if (!socket.fstop) {
                        conn.sendMessage(m.chat, { text: "*[❗] La conexión se cerró, se intentara reconectar automáticamente...*\n" + dataconst[socket.user.id.split('@')] + '/3' }, { quoted: m });
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
                    socket.sendMessage(m.chat, { text: "*[❗] Ya estás conectado*\n\n*Sé paciente, los mensajes se están cargando...*\n\n*—◉ Puedes verificar la conexión enviando mensajes a este chat.*" }, { quoted: m });
                    if (!global.db.data.chats[socket.user.jid]) global.db.data.chats[socket.user.jid] = {};
                    if (!global.db.data.chats[socket.user.jid].autodownload) global.db.data.chats[socket.user.jid].autodownload = true;
                }
            }
        }

        async function reloadHandler(reconnect = false) {
            if (socket.isInit && reconnectAttempts) {
                if (!dataconst[socket.user.id.split('@')]) dataconst[socket.user.id.split('@')] = 1;
                if (dataconst[socket.user.id.split('@')] == 3) {
                    return;
                } else if (dataconst[socket.user.id.split('@')]) {
                    dataconst[socket.user.id.split('@')] += 1;
                }
                socket = makeWASocket(socketConfig);
                socket.ev.on("connection.update", connectionUpdate);
                socket.ev.on("creds.update", saveState);
                reconnectAttempts = false;
            }
        }

        socket.ev.on("connection.update", connectionUpdate);
        socket.ev.on("creds.update", saveState);

        setTimeout(async () => {
            if (!socket.isInit) {
                socket.ws.close();
                socket.ev.removeAllListeners("connection.update");
                socket.ev.removeAllListeners("creds.update");
                conn.sendMessage(m.chat, { text: "*[❗] Tiempo de conexión agotado, intenta nuevamente.*" }, { quoted: m });
                if (fs.existsSync("./jadibts/" + mentionedNumber)) {
                    fs.rmdirSync("./jadibts/" + mentionedNumber, { recursive: true });
                }
            }
        }, 60000);
    }

    try {
        await initBot();
    } catch (e) {
        console.error(e);
        conn.sendMessage(m.chat, { text: `*[❗] Ocurrió un error inesperado:*\n\n${e.message}` }, { quoted: m });
    }
};

handler.help = ['serbotcode <code>'];
handler.tags = ['jadibot'];
handler.command = /^(serbotcode)$/i;

handler.limit = false;

export default handler;
                                              
