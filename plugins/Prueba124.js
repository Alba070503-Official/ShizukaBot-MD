import fetch from 'node-fetch'; // Para obtener las imágenes y audios desde URLs

// Comando inicial: .start
let handler = async (m, { conn, usedPrefix }) => {
    const imageUrl = 'https://qu.ax/lpPQ.jpg'; // URL de la imagen inicial
    const messageText = `
        Hola Estela 💖\n
        Hay algo que llevo guardando en mi corazón desde hace tiempo. Hoy quiero ser valiente y decirte lo que siento. Desde que nuestras miradas se cruzaron, sentí una conexión especial.\n
        Me encantaría saber si quieres salir conmigo. ¿Qué dices?\n\n
        Pulsa en una opción para responder.
    `.trim();

    await conn.sendButton(m.chat, messageText, wm, imageUrl, [
        ['💌 Sí Acepto', `${usedPrefix}acepto`],
        ['💔 No, Lo siento', `${usedPrefix}rechazo`]
    ], m);
};

// Acción si el usuario elige "Sí"
let siHandler = async (m, { conn }) => {
    const yesImageUrl = 'https://qu.ax/abKS.jpg'; // Imagen para la opción "Sí"
    const yesAudioUrl = 'https://qu.ax/lyds.mp3'; // Audio para la opción "Sí"
    const yesMessageText = `
        ¡Qué alegría! Me hace muy feliz saber que has aceptado. 💖\n
        Prometo que cada momento a tu lado será especial y lleno de sonrisas. Estoy emocionado por lo que está por venir. 💫
    `.trim();

    // Enviar imagen con mensaje
    await conn.sendMessage(m.chat, { 
        image: { url: yesImageUrl }, 
        caption: yesMessageText
    }, { quoted: m });

    // Enviar audio
    await conn.sendMessage(m.chat, { 
        audio: { url: yesAudioUrl }, 
        mimetype: 'audio/mpeg'
    }, { quoted: m });
};

// Acción si el usuario elige "No"
let noHandler = async (m, { conn }) => {
    const noImageUrl = 'https://qu.ax/eFBg.jpg'; // Imagen para la opción "No"
    const noMessageText = `
        Entiendo y te agradezco por ser honesta conmigo. Aunque no fue la respuesta que esperaba, valoro mucho tu sinceridad. 😊\n
        Lo más importante es que sigamos siendo amigos. ¡Aquí estaré siempre para ti! 🤝
    `.trim();
    const noAudioUrl = 'https://qu.ax/Pgxz.mp3'; // Audio para la opción "No"

    // Enviar imagen con mensaje
    await conn.sendMessage(m.chat, { 
        image: { url: noImageUrl }, 
        caption: noMessageText
    }, { quoted: m });

    // Enviar audio
    await conn.sendMessage(m.chat, { 
        audio: { url: noAudioUrl }, 
        mimetype: 'audio/mpeg'
    }, { quoted: m });
};

// Asignar comandos a las funciones
handler.command = ['declaracion']; // Comando principal .start
siHandler.command = ['acepto']; // Comando para aceptar
noHandler.command = ['rechazo']; // Comando para rechazar

export { handler, siHandler, noHandler };
