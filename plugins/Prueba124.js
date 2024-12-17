import fetch from 'node-fetch';

// Handler principal para la declaración
let handler = async (m, { conn, usedPrefix, command }) => {
    if (command === 'confesion') {
        const imageUrl = 'https://qu.ax/lpPQ.jpg'; // URL de la imagen de la confesión
        const messageText = `Hola Estela\n\nHay algo que llevo guardando en mi corazón desde hace tiempo, algo que, a pesar de lo mucho que he intentado poner en palabras, siempre parece escaparse de ellas. Pero hoy, quiero ser valiente y decirte lo que siento.\n\nDesde el primer momento en que nuestras miradas se cruzaron, sentí una conexión especial. Con cada conversación, cada sonrisa que compartimos, me he dado cuenta de que ocupas un lugar muy especial en mi vida. Me haces querer ser mejor, y contigo, todo parece más fácil, más brillante.\n\nHoy quiero confesarte que me gustas. Me gustas de una manera que ni siquiera sabía que era posible. ¿Quieres salir conmigo?\n\nResponde escribiendo *sí* o *no*.`;

        await conn.sendMessage(m.chat, { 
            image: { url: imageUrl }, 
            caption: messageText 
        }, { quoted: m });
    }

    // Acción si el usuario escribe "sí"
    if (command === 'yes') {
        const yesImageUrl = 'https://qu.ax/abKS.jpg'; // Imagen para la respuesta "Sí"
        const yesAudioUrl = 'https://qu.ax/lyds.mp3'; // Audio para la respuesta "Sí"
        const yesMessageText = `¡Qué alegría que hayas aceptado! Me siento increíblemente feliz y emocionado por lo que está por venir. Desde que te conocí, he soñado con este momento, y ahora que es real, no puedo esperar para vivir momentos inolvidables contigo.\n\nGracias por darme esta oportunidad. 💖`;

        await conn.sendMessage(m.chat, { 
            image: { url: yesImageUrl }, 
            caption: yesMessageText 
        }, { quoted: m });

        await conn.sendMessage(m.chat, { 
            audio: { url: yesAudioUrl }, 
            mimetype: 'audio/mpeg' 
        }, { quoted: m });
    }

    // Acción si el usuario escribe "no"
    if (command === 'nou') {
        const noImageUrl = 'https://qu.ax/eFBg.jpg'; // Imagen para la respuesta "No"
        const noMessageText = `Entiendo y agradezco tu sinceridad. Aunque no haya sido el resultado que esperaba, valoro mucho nuestra amistad y quiero que sepas que seguiré aquí para ti. 😊`;
        const noAudioUrl = 'https://qu.ax/Pgxz.mp3'; // Audio para la respuesta "No"

        await conn.sendMessage(m.chat, { 
            image: { url: noImageUrl }, 
            caption: noMessageText 
        }, { quoted: m });

        await conn.sendMessage(m.chat, { 
            audio: { url: noAudioUrl }, 
            mimetype: 'audio/mpeg' 
        }, { quoted: m });
    }
};

handler.command = ['confesion', 'yes', 'nou'];
handler.tags = ["fun"];
handler.help = ["confesion", "yes", "nou"];

export default handler;
