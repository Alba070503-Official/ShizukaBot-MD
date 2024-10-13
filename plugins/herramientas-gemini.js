import fetch from 'node-fetch';

var handler = async (m, { text, usedPrefix, command, conn }) => {
    // Verifica que el texto no esté vacío
    if (!text) {
        return conn.reply(m.chat, `『👻』Ingresa un texto para usar este comando.\n\n• Ejemplo:\n${usedPrefix + command} Hola`, m);
    }

    try {
        // Reacciona a la espera de la respuesta
        await m.react('🕓');  // Usa emojis estándar, como 🕓 para esperar

        // Notifica que el bot está escribiendo
        conn.sendPresenceUpdate('composing', m.chat);

        // Llamada a la API de Gemini
        const apiUrl = `https://api.dorratz.com/ai/gpt4?username=diego&query=${encodeURIComponent(text)}`;
        const response = await fetch(apiUrl);

        // Verifica si la respuesta es exitosa
        if (!response.ok) {
            throw new Error('Error en la solicitud de la API');
        }

        const res = await response.json();

        // Envío de la respuesta al usuario
        await conn.reply(m.chat, res.result, m);

        // Reacción de éxito
        await m.react('✅');
        
    } catch (error) {
        console.error(error);
        // Reacción de error
        await m.react('✖️');

        // Enviar mensaje de error
        await conn.reply(m.chat, `『✖️』Ocurrió un error en el comando, repórtalo al creador del bot.`, m);
    }
};

// Configuración del comando
handler.command = ['gemini'];
handler.help = ['gemini'];
handler.tags = ['ai'];

export default handler;
