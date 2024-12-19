import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command }) => {
    await m.react('🕓'); // Reacción inicial para indicar procesamiento
    try {
        // Solicitar contenido de la API
        let res = await fetch('https://deliriussapi-oficial.vercel.app/nsfw/corean');
        if (!res.ok) return;

        let json = await res.json();
        if (!json.url) return;

        // Enviar archivo con la imagen obtenida
        await conn.sendFile(m.chat, json.url, 'thumbnail.jpg', '🔞 Aquí tienes tu contenido NSFW coreano.', m);
        await m.react('✅'); // Reacción de éxito
    } catch {
        await m.react('✖️'); // Reacción de error
    }
};

// Configuración del comando
handler.help = ['corean'];
handler.tags = ['img', 'nsfw'];
handler.command = ['corean']; // Nombre del comando
// handler.limit = 1; // Descomentar si deseas aplicar límite de uso
handler.register = true; // Requiere estar registrado para usar

export default handler;
