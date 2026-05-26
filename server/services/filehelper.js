import path from 'path';
import fs from 'fs/promises';

async function fileExists(filePath) {
  try {
    await fs.access(filePath, fs.constants.F_OK)
    return true
  } catch (error) {
    return false
  }
}


async function findEnvFile() {
  let message = 'Environment file not found';
  let fp = '';
  if(fileExists('./.env.local')) {
      message = 'Found .env.local configuration file';
      fp = './.env.local';
  }
  else if(fileExists('./.env')) {
    message = 'Found .env configuration file';
    fp = './.env';
  }
  else {
    const __dirname = path.dirname('.');
    if(fileExists(path.resolve(__dirname, '../.env'))) {
      message = 'Found .env configuration file in parent directory';
      fp = path.resolve(__dirname, '../.env');
    }
  }
  return { message: message, filepath: fp};
}
    
const fileHelper = {
  fileExists,
  findEnvFile
}
export default fileHelper;
