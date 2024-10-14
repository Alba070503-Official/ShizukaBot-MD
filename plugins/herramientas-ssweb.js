import fetch from 'node-fetch';

let handler = async (m, { conn, args }) => {
  // Verificar si el usuario ha proporcionado un enlace
  if (!args[0]) {
    return conn.reply(m.chat, '⚠️ *Ingrese el link de una página.*', m);
  }

  try {
    // Informar que se está procesando la solicitud
    await conn.reply(m.chat, '🚀 Buscando su información...', m);

    // Obtener la captura de pantalla completa
    let response = await fetch(`https://image.thum.io/get/fullpage/${args[0]}`);
    
    // Verificar si la solicitud fue exitosa
    if (!response.ok) {
      throw new Error('No se pudo obtener la captura de pantalla');
    }

    // Convertir la respuesta en un buffer
    let ss = await response.buffer();

    // Enviar la captura de pantalla como archivo al usuario
    await conn.sendFile(m.chat, ss, 'captura.png', `Aquí tienes la captura de ${args[0]}`, m);
    
  } catch (e) {
    // En caso de error, mostrar mensaje de error al usuario
    console.error(e);
    await conn.reply(m.chat, '🚩 Ocurrió un error al obtener la captura de pantalla.', m);
  }
};

handler.help = ['ssweb', 'ss'];
handler.tags = ['tools'];
handler.command = ['ssweb', 'ss'];

export default handler;
