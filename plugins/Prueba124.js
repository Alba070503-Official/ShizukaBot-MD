import fetch from 'node-fetch';

// Comando inicial: .start
let handler = async (m, { conn, usedPrefix }) => {
    const imageUrl = 'https://qu.ax/lpPQ.jpg';
    const messageText = `
        Hola Estela 💖\n
        Hay algo que llevo guardando en mi corazón desde hace tiempo. Hoy quiero ser valiente y decirte lo que siento. Desde que nuestras miradas se cruzaron, sentí una conexión especial.\n
        Me encantaría saber si quieres salir conmigo. ¿Qué dices?\n\n
        Pulsa en una opción para responder.
    `.trim();
    
    const buttons = [
        ['💌 Sí Acepto', `${usedPrefix}acepto`],
        ['💔 No, Lo siento', `${usedPrefix}rechazo`]
    ];

    await conn.sendButton(m.chat, messageText, 'wm', imageUrl, buttons, m);
};

// Acción si el usuario elige "Sí"
let siHandler = async (m, { conn }) => {
    const yesImageUrl = 'https://qu.ax/abKS.jpg';
    const yesAudioUrl = 'https://qu.ax/lyds.mp3';
    const yesMessageText = `
        ¡Qué alegría! Me hace muy feliz saber que has aceptado. 💖\n
        Prometo que cada momento a tu lado será especial y lleno de sonrisas. Estoy emocionado por lo que está por venir. 💫
    `.trim();

    await conn.sendFile(m.chat, yesImageUrl, 'yes_image.jpg', yesMessageText, m);
    await conn.sendFile(m.chat, yesAudioUrl, 'yes_audio.mp3', null, m, true, { type: 'audioMessage', ptt: true });
};

// Acción si el usuario elige "No"
let noHandler = async (m, { conn }) => {
    const noImageUrl = 'https://qu.ax/eFBg.jpg';
    const noAudioUrl = 'https://qu.ax/Pgxz.mp3';
    const noMessageText = `
        Entiendo y te agradezco por ser honesta conmigo. Aunque no fue la respuesta que esperaba, valoro mucho tu sinceridad. 😊\n
        Lo más importante es que sigamos siendo amigos. ¡Aquí estaré siempre para ti! 🤝
    `.trim();

    await conn.sendFile(m.chat, noImageUrl, 'no_image.jpg', noMessageText, m);
    await conn.sendFile(m.chat, noAudioUrl, 'no_audio.mp3', null, m, true, { type: 'audioMessage', ptt: true });
};

// Asignar comandos a las funciones
handler.command = ['declaracion'];
siHandler.command = ['acepto'];
noHandler.command = ['rechazo'];

export { handler, siHandler, noHandler };
