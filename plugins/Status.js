const os = require('os');
const { default: makeWASocket, DisconnectReason } = require('@adiwajshing/baileys');

// Configuración del bot
async function startBot() {
    const conn = makeWASocket();
    
    conn.ev.on('messages.upsert', async (message) => {
        const m = message.messages[0];
        
        // Comando de status
        if (m.message && m.message.conversation === '/status') {
            // Obtener estado del bot
            const platform = os.platform();
            const architecture = os.arch();
            const cpuCount = os.cpus().length;
            const totalRAM = (os.totalmem() / 1024 / 1024).toFixed(2); // MB
            const usedRAM = ((os.totalmem() - os.freemem()) / 1024 / 1024).toFixed(2); // MB
            const hostID = os.hostname();

            const commandsExecuted = 10407;
            const registeredUsers = 2068;
            const registeredGroups = 170;
            const sockets = 9;

            // Mensaje de estado del bot
            const statusMessage = `
🌐 *Estado del Bot*

📊 *Comandos ejecutados:* ${commandsExecuted}
👤 *Usuarios registrados:* ${registeredUsers}
👥 *Grupos registrados:* ${registeredGroups}
🔗 *Conexiones activas (Sockets):* ${sockets}

💻 *Información del Servidor*
🌎 *Sistema operativo:* ${platform.charAt(0).toUpperCase() + platform.slice(1)}
🖥️ *CPU:* ${cpuCount} núcleos
💾 *Memoria RAM Total:* ${totalRAM} MB
📊 *RAM en uso:* ${usedRAM} MB
📐 *Arquitectura:* ${architecture}
🔑 *ID del Host:* ${hostID}
            `;

            // Enviar mensaje con enlace y detalles enriquecidos
            await conn.sendMessage(m.key.remoteJid, {
                text: statusMessage,
                contextInfo: {
                    externalAdReply: {
                        title: 'Estado del Bot',
                        body: 'Información del servidor y configuraciones del bot',
                        thumbnailUrl: 'https://qu.ax/gtePU.jpg', // Cambia este enlace a una imagen personalizada si quieres
                        mediaType: 1,
                        showAdAttribution: true,
                        renderLargerThumbnail: true,
                        mediaUrl: 'https://whatsapp.com/channel/0029VaAN15BJP21BYCJ3tH04' // Enlace al que se redirige al hacer clic
                    }
                }
            }, { quoted: m });
        }
    });
    
    conn.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('connection closed due to', lastDisconnect.error, ', reconnecting', shouldReconnect);
            if (shouldReconnect) {
                startBot();
            }
        } else if (connection === 'open') {
            console.log('Connected');
        }
    });
}

startBot();
