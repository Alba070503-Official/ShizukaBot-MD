import { DisconnectReason, useMultiFileAuthState, fetchLatestBaileysVersion } from "@whiskeysockets/baileys";
import fs from 'fs';
import pino from 'pino';

let handler = async (m, { conn, args, command }) => {
    const mentionedJid = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
    const mentionedNumber = '' + mentionedJid.split`@`[0];

    if (!fs.existsSync('./jadibts/' + mentionedNumber)) {
        fs.mkdirSync("./jadibts/" + mentionedNumber, { recursive: true });
    }

    if (args[0]) {
        fs.writeFileSync("./jadibts/" + mentionedNumber + "/creds.json", JSON.stringify(JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")), null, "\t"));
    }

    const { state, saveState } = await useMultiFileAuthState("./jadibts/" + mentionedNumber);
    const { version } = await fetchLatestBaileysVersion();
    const socket = makeWASocket({
        auth: state,
        logger: pino({ level: "silent" }),
        version,
        printQRInTerminal: false
    });

    socket.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut;
            if (shouldReconnect) {
                handler(m, { conn, args, command });
            } else {
                fs.rmdirSync("./jadibts/" + mentionedNumber, { recursive: true });
            }
        } else if (connection === 'open') {
            conn.sendMessage(m.chat, { text: "*[❗] Conectado con éxito*" });
        }
    });

    socket.ev.on('creds.update', saveState);

    if (args[0]) {
        conn.sendMessage(m.chat, { text: "*[❗] Reconectado con éxito!!*" });
    }
};

handler.command = /^(serbot|getcode)$/i;

export default handler;
