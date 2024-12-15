import { existsSync, promises as fs } from 'fs';
import path from 'path';

var handler = async (m, { conn, usedPrefix }) => {
  if (global.conn.user.jid !== conn.user.jid) {
    return conn.reply(m.chat, '🚩 *Utiliza este comando directamente en el número principal del Bot*', m);
  }

  await conn.reply(m.chat, '🚩 *Iniciando proceso de eliminación de todos los archivos de sesión, excepto el archivo creds.json...*', m);

  let sessionPath = './sessions/'; // Definir la carpeta de sesiones correctamente.

  try {
    if (!existsSync(sessionPath)) {
      return await conn.reply(m.chat, '🚩 *La carpeta de sesiones no existe o está vacía.*', m);
    }

    let files = await fs.readdir(sessionPath);
    let filesDeleted = 0;

    for (const file of files) {
      if (file !== 'creds.json') {
        await fs.unlink(path.join(sessionPath, file));
        filesDeleted++;
      }
    }

    if (filesDeleted === 0) {
      await conn.reply(m.chat, '🚩 *No se encontraron archivos para eliminar, solo existe el archivo creds.json.*', m);
    } else {
      await conn.reply(m.chat, `🚩 *Se eliminaron ${filesDeleted} archivos de sesión, excepto el archivo creds.json.*`, m);
      await conn.reply(m.chat, '🚩 *¡Hola! ¿logras verme?*', m);
    }
  } catch (err) {
    console.error('Error al leer la carpeta o los archivos de sesión:', err);
    await conn.reply(m.chat, '🚩 *Ocurrió un error durante el proceso de eliminación.*', m);
  }
};

handler.help = ['dsowner'];
handler.tags = ['fix', 'owner'];
handler.command = ['delai', 'delyotsuba', 'dsowner', 'clearallsession'];

handler.rowner = true;

export default handler;
