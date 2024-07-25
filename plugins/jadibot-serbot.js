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

import { DisconnectReason, useMultiFileAuthState, MessageRetryMap, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, jidNormalizedUser } from "@whiskeysockets/baileys";
import qrcode from 'qrcode';
import fs from 'fs';
import pino from 'pino';
import { spawn, exec } from "child_process";
import { makeWASocket } from '../lib/simple.js';
import store from '../lib/store.js';
import NodeCache from 'node-cache';

if (!(global.conns instanceof Array)) global.conns = [];
if (!(global.dataconst instanceof Array)) global.dataconst = [];

let handler = async (m, { conn, args, usedPrefix, command, isOwner, text }) => {
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
            browser: isCode ? ['Ubuntu', "Chrome", "20.0.04"] : ["Shizuka-Bot-MD", "Safari", "2.0.0"],
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
                    caption: "*👑 Developed @Alba070503 👑*\n               *𝐒𝐄𝐑 𝐒𝐔𝐁𝐁𝐎𝐓*\n\n*Escanea este codigo QR para convertirte en un Bot (SubBot), puedes usar otro dispositivo para escanear*\n\n*Pasos para escanear:*\n*1.- Haga click en los 3 puntos ubicados en la esquina superior derecha en el inicio de su WhatsApp*\n*2.- Toca en donde dice WhatsApp web o dispositivos vinculados*\n*3.- Escanee este codigo QR*\n*El codigo QR expira en 60 segundos!!*\n\n*—◉ SpaceNigth - TEAM no se hace respondable del uso, numeros, mensajes, multimedias, etcétera enviado, usado o gestionado por ustedes o el Bot*" + signatureBuffer.toString("utf-8")
                }, { quoted: m });
            }

            if (qr && isCode) {
                let senderNumber = m.sender.split`@`[0];
                if (senderNumber.startsWith('52')) senderNumber = "521" + senderNumber.slice(2);
                let pairingCode = await socket.requestPairingCode(senderNumber);
                conn.sendMessage(m.chat, {
                    text: "*👑 Developed @Alba070503 👑*\n               *𝐒𝐄𝐑 𝐒𝐔𝐁𝐁𝐎𝐓*\n\n*En breve, Se le enviara un codigo que debera introducir para instalar el bot*\n\n*Pasos a seguir:*\n*1.- Haga click en los 3 puntos ubicados en la esquina superior derecha en el inicio de su WhatsApp*\n*2.- Toca en donde dice WhatsApp web o dispositivos vinculados*\n*3.- De click en donde dice \"Vincular con el numero de telefono\"*\n*4.- Introduzca el codigo*\n*El codigo expira en 60 segundos!!*\n*El codigo solo funciona con el numero solicitado!!*\n\n*—◉ SpaceNigth - TEAM no se hace respondable del uso, numeros, mensajes, multimedias, etcétera enviado, usado o gestionado por ustedes o el Bot*" + signatureBuffer.toString('utf-8')
                }, { quoted: m });
                await delay(5000);
                conn.sendMessage(m.chat, { text: pairingCode }, { quoted: m });
            }

            const statusCode = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;
            if (connection === "close") {
                if (socket.user && global.dataconst[socket.user.id.split('@')[0]] == 3) {
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
                        conn.sendMessage(m.chat, { text: "*[❗] La conexión se cerró, se intentara reconectar automáticamente...*\n" + global.dataconst[socket.user.id.split('@')[0]] + '/3' }, { quoted: m });
                    }
                    if (!socket.fstop) {
                        await reloadHandler(true).catch(console.error);
                    }
                } else if (statusCode === DisconnectReason.connectionLost) {
                    conn.sendMessage(m.chat, { text: "*[❗] La conexión se perdió, intentando reconectar...*" }, { quoted: m });
                    await reloadHandler(true).catch(console.error);
                } else if (statusCode === DisconnectReason.restartRequired) {
                    conn.sendMessage(m.chat, { text: "*[❗] La conexión necesita reiniciarse, reiniciando...*" }, { quoted: m });
                    await reloadHandler(true).catch(console.error);
                } else if (statusCode === DisconnectReason.timedOut) {
                    conn.sendMessage(m.chat, { text: "*[❗] La conexión se agotó, intentando reconectar...*" }, { quoted: m });
                    await reloadHandler(true).catch(console.error);
                } else {
                    if (socket.user && !global.dataconst[socket.user.id.split('@')[0]]) global.dataconst[socket.user.id.split('@')[0]] = 0;
                    global.dataconst[socket.user.id.split('@')[0]]++;
                    await reloadHandler(true).catch(console.error);
                }
            } else if (connection === "open") {
                socket.isInit = true;
                conn.sendMessage(m.chat, { text: "*[✅] La conexión se estableció correctamente!*" }, { quoted: m });
                global.dataconst[socket.user.id.split('@')[0]] = 0;
                global.conns.push(socket);
            }
        }

        function reloadHandler(reconnecting) {
            return new Promise((resolve, reject) => {
                if (reconnecting) {
                    try {
                        socket.ws.close();
                        socket = makeWASocket(socketConfig);
                        socket.ev.on('connection.update', connectionUpdate);
                        resolve();
                    } catch (error) {
                        reject(error);
                    }
                } else {
                    socket.ev.on('connection.update', connectionUpdate);
                    resolve();
                }
            });
        }

        socket.ev.on('connection.update', connectionUpdate);

        socket.ev.on('creds.update', saveCreds);

        return socket;
    }

    await initBot();
}

handler.help = ['serbot', 'serbotcode'].map(v => v + ' [--code]');
handler.tags = ['jadibot'];
handler.command = /^(serbot|serbotcode)$/i;
handler.owner = true;

export default handler;
