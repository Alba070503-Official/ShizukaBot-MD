import fetch from 'node-fetch'; // Para obtener las imágenes y audios desde URLs

// Comando inicial: .start
let handler = async (m, { conn, usedPrefix }) => {
    const imageUrl = 'https://qu.ax/lpPQ.jpg'; // Imagen para el mensaje inicial
    const messageText = 'Hola Estela\n\nHay algo que llevo guardando en mi corazón desde hace tiempo, algo que, a pesar de lo mucho que he intentado poner en palabras, siempre parece escaparse de ellas. Pero hoy, quiero ser valiente y decirte lo que siento\n\nDesde el primer momento en que nuestras miradas se cruzaron, sentí una conexión especial. Con cada conversación, cada sonrisa que compartimos, me he dado cuenta de que ocupas un lugar muy especial en mi vida.\n\nHoy quiero confesarte que me gustas. Me gustas de una manera que ni siquiera sabía que era posible. Quiero saber si te gustaría salir conmigo. Presiona sí o no.';

    await conn.sendButton(m.chat, messageText, wm, imageUrl, [
        ['Sí Acepto Salir Contigo', `${usedPrefix}acepto`],
        ['No Lo Siento Mucho', `${usedPrefix}rechazo`]
    ], m);
};

// Acción si el usuario elige "Sí"
let siHandler = async (m, { conn }) => {
    const yesImageUrl = 'https://qu.ax/abKS.jpg'; // Imagen para la opción "Sí"
    const yesAudioUrl = 'https://qu.ax/lyds.mp3'; // Audio para la opción "Sí"
    const yesMessageText = 'No te imaginas lo feliz que me hace saber que has aceptado. Mi corazón está latiendo a mil por hora solo de pensar en todo lo que está por venir. ¡Estoy emocionado por todo lo que está por venir! 💖';

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
    const noMessageText = 'Primero que todo, quiero agradecerte por ser honesta conmigo. Aunque las cosas no resultaron como esperaba, respeto completamente tu decisión y valoro muchísimo tu sinceridad. Sigamos siendo amigos. 😊';
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

// Exportar todos los handlers juntos
export default {
    handler: {
        command: ['hola'],
        handler
    },
    siHandler: {
        command: ['acepto'],
        handler: siHandler
    },
    noHandler: {
        command: ['rechazo'],
        handler: noHandler
    }
};
