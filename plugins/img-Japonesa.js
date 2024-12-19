import fetch from 'node-fetch';

let handler = async (m, { conn, isGroup }) => {
    try {
        // Validar que el comando se use solo en grupos
        if (!isGroup) {
            return conn.reply(m.chat, "⚠️ Este comando solo puede utilizarse en grupos.", m);
        }

        // Reacción inicial para indicar que está procesando
        await m.react('🕓');

        // Hacer solicitud a la API
        const res = await fetch('https://deliriussapi-oficial.vercel.app/nsfw/corean');
        if (!res.ok) throw new Error('Error al conectar con la API');

        const json = await res.json();
        if (!json.url) throw new Error('No se encontró una imagen válida');

        // Enviar la imagen directamente al chat
        await conn.sendMessage(m.chat, {
            image: { url: json.url }, // Enlace directo a la imagen
            caption: '🔞 Aquí tienes tu contenido NSFW coreano.'
        }, { quoted: m });

        // Reacción de éxito
        await m.react('✅');
    } catch (error) {
        console.error(error);

        // Reacción de error y mensaje
        await m.react('✖️');
        conn.reply(m.chat, "❌ Ocurrió un error al procesar tu solicitud. Inténtalo más tarde.", m);
    }
};

// Configuración del comando
handler.help = ['corean'];
handler.tags = ['nsfw'];
handler.command = ['corean']; // Comando principal
handler.group = true; // Solo disponible en grupos
handler.register = true; // Requiere registro para usar el comando

export default handler;
