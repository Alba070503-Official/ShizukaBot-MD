let handler = async (m, { conn, usedPrefix }) => {
    // Mensaje de texto
    const mensaje = `
    🎉🎂 *¡Feliz Cumpleaños!* 🎂🎉

En este día tan especial, quiero desearte todo lo mejor. Que cada momento de hoy esté lleno de alegría y que cada sonrisa que recibas sea un reflejo del cariño que inspiras en los demás. Que este nuevo año de vida te traiga muchas bendiciones, éxito en todos tus proyectos y, sobre todo, mucha salud y felicidad.

Recuerda siempre lo especial que eres para todos los que te rodean. Tu presencia ilumina nuestras vidas y tu amistad es un regalo invaluable. Espero que disfrutes de cada instante de este día, rodeado de tus seres queridos y haciendo lo que más te gusta.

¡Feliz cumpleaños! Que todos tus sueños se hagan realidad y que sigas siendo esa persona maravillosa que tanto apreciamos.🥳`;

    // Ruta de la imagen y el audio
    const imageUrl = 'https://telegra.ph/file/1514ae10709f5ed6b2874.jpg';  // Reemplaza con la URL de la imagen
    const audioUrl = 'https://qu.ax/sza.m4a';  // Reemplaza con la URL del audio

    try {
        // Enviar mensaje de texto
        await conn.sendMessage(m.chat, { text: mensaje }, { quoted: m });

        // Enviar imagen con un texto corto
        await conn.sendMessage(m.chat, { 
            image: { url: imageUrl }, 
            caption: "🎂 ¡Feliz Cumpleaños! 🎂" 
        }, { quoted: m });

        // Enviar audio
        await conn.sendMessage(m.chat, { 
            audio: { url: audioUrl }, 
            mimetype: 'audio/mpeg',
            ptt: true  // PTT significa que se enviará como una nota de voz
        }, { quoted: m });
    } catch (error) {
        console.error("Error en el plugin de cumpleaños:", error);
        await conn.reply(m.chat, `*☓ Ocurrió un error inesperado:*\n${error.message || error}`, m);
    }
};

// Configuración del comando
handler.help = ['felizcumple'];
handler.tags = ['fun'];
handler.command = ['felizcumple', 'happybirthday'];  // Puedes usar varios comandos para el mismo plugin

export default handler;
