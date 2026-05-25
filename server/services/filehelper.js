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


async function getEnvContent() {
  const envFilePath = path.resolve('./.env');
  let message = 'Environment file not found';

    if(fileExists('./.env.local')) {
      message = 'Found .env.local configuration file';
  }
  else if(fileExists('./.env')) {
    message = 'Found .env configuration file';
  }
  else {
    if(fileExists(path.resolve(__dirname, '../.env'))) {
      message = 'Found .env configuration file in parent directory';
    }
  }
  return message;
}
    
const fileHelper = {
  fileExists,
  getEnvContent
}
export default fileHelper;
