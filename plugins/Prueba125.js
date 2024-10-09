let handler = async (m, { conn, usedPrefix, command }) => {
    const imageUrl = 'https://qu.ax/lpPQ.jpg'; // URL de la imagen
    const messageText = `Hola Estela\n\nHay algo que llevo guardando en mi corazón desde hace tiempo, algo que, a pesar de lo mucho que he intentado poner en palabras, siempre parece escaparse de ellas. Pero hoy, quiero ser valiente y decirte lo que siento\n\nDesde el primer momento en que nuestras miradas se cruzaron, sentí una conexión especial. Con cada conversación, cada sonrisa que compartimos, me he dado cuenta de que ocupas un lugar muy especial en mi vida. Me haces querer ser mejor, y contigo, todo parece más fácil, más brillante.\n\nHoy quiero confesarte que me gustas. Me gustas de una manera que ni siquiera sabía que era posible. ¿Quieres salir conmigo?\n\nEscribe #Sí o #No abajo para responder.`; // Mensaje a mostrar

    await conn.sendMessage(m.chat, {
        image: { url: imageUrl }, // Envía la imagen
        caption: messageText // Texto que acompaña a la imagen
    }, { quoted: m }); // Enviar con el mensaje citado
};

handler.command = ['declaracion1']; // Comando para ejecutar el plugin

export default handler;
