import fetch from 'node-fetch'; // Para obtener las imágenes y audios desde URLs

let handler = async (m, { conn, usedPrefix, command }) => {
    const imageUrl = 'https://qu.ax/lpPQ.jpg'; // Coloca aquí la URL de la imagen que quieres mostrar al inicio
    const messageText = 'Hola Estela\n\nHay algo que llevo guardando en mi corazón desde hace tiempo, algo que, a pesar de lo mucho que he intentado poner en palabras, siempre parece escaparse de ellas. Pero hoy, quiero ser valiente y decirte lo que siento\n\nDesde el primer momento en que nuestras miradas se cruzaron, sentí una conexión especial, algo que no se puede explicar con simples palabras. Con cada conversación, cada sonrisa que compartimos, me he dado cuenta de que ocupas un lugar muy especial en mi vida. No dejo de pensar en ti, en cómo llenas de luz los momentos más simples, y cómo tu presencia hace que todo lo demás se desvanezca\n\nTu risa es como música para mis oídos, y tus ojos, una ventana a todo lo que es bello en este mundo. Me haces querer ser mejor, y contigo, todo parece más fácil, más brillante\n\nHoy quiero confesarte que me gustas. Me gustas de una manera que ni siquiera sabía que era posible, una manera que hace que desee estar a tu lado, conocer cada parte de ti y compartir contigo momentos que jamás se olviden\n\nNo espero más que ser sincero contigo, porque creo que alguien tan especial como tú merece conocer lo que verdaderamente me haces sentir. Y, pase lo que pase, quiero que sepas que estar cerca de ti es lo mejor que me ha pasado\n\nQuieres Salir conmigo presiona si o no en esto de aqui'; // Mensaje que se mostrará cuando el usuario ponga .start

    await conn.sendButton(m.chat, messageText, wm, imageUrl, [
        ['Sí Acepto Salir Contigo', `${usedPrefix}si`],
        ['No Lo Siento Mucho', `${usedPrefix}no`]
    ], m);
};

// Acción si el usuario elige "Sí"
handler.command = ['start']; // El comando inicial es .start
export default handler;

let siHandler = async (m, { conn }) => {
    const yesImageUrl = 'https://qu.ax/abKS.jpg'; // Coloca aquí la URL de la imagen para la opción "Sí"
    const yesAudioUrl = 'https://qu.ax/lyds.mp3'; // Coloca aquí la URL del audio para la opción "Sí"
    const yesMessageText = 'No te imaginas lo feliz que me hace saber que has aceptado. Mi corazón está latiendo a mil por hora solo de pensar en todo lo que está por venir. Desde que te conocí, siempre he soñado con este momento, pero ahora que es real, supera cualquier cosa que hubiera imaginado.\n\nQuiero que sepas que valoro cada segundo a tu lado y que me siento increíblemente afortunado de poder compartir contigo algo tan bonito. No puedo esperar para construir juntos recuerdos inolvidables, llenos de risas, complicidad y cariño.\n\nGracias por darme esta oportunidad de estar más cerca de ti. Prometo que haré lo mejor para que cada día juntos sea especial, y que siempre tendrás en mí a alguien que te apoyará, te cuidará y te hará sonreír.\n\n¡Estoy emocionado por todo lo que está por venir! 💖';

    await conn.sendMessage(m.chat, { 
        image: { url: yesImageUrl }, 
        caption: yesMessageText
    }, { quoted: m });

    await conn.sendMessage(m.chat, { 
        audio: { url: yesAudioUrl }, 
        mimetype: 'audio/mpeg'
    }, { quoted: m });
};

siHandler.command = ['Sí Acepto Salir Contigo']; // El comando para la opción "Sí"
export default siHandler;

// Acción si el usuario elige "No"
let noHandler = async (m, { conn }) => {
    const noImageUrl = 'https://qu.ax/eFBg.jpg'; // Coloca aquí la URL de la imagen para la opción "No"
    const noMessageText = 'Primero que todo, quiero agradecerte por ser honesta conmigo. Aunque las cosas no resultaron como esperaba, quiero que sepas que respeto completamente tu decisión y valoro muchísimo tu sinceridad.\n\nLo más importante para mí es que podamos seguir siendo amigos. Aprecio la persona increíble que eres, y tenerte en mi vida de cualquier forma sigue siendo algo muy especial para mí. La amistad que hemos construido es algo que realmente valoro, y estaré aquí siempre que lo necesites.\n\nGracias de nuevo por ser tan clara, y por permitir que nuestra amistad continúe. 😊';
    const noAudioUrl = 'https://qu.ax/Pgxz.mp3';

    await conn.sendMessage(m.chat, { 
        image: { url: noImageUrl }, 
        caption: noMessageText
    }, { quoted: m });
    
    await conn.sendMessage(m.chat, { 
        audio: { url: noAudioUrl }, 
        mimetype: 'audio/mpeg'
    }, { quoted: m });
};

noHandler.command = ['No Lo Siento Mucho']; // El comando para la opción "No"
export default noHandler;
