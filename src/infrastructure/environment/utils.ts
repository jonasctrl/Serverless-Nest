import * as fs from 'fs';
import * as path from 'path';

const FILE_PATH = 'environments';
const FILE = '.env';

export const getEnvPath = (): string => {
  const stage = process.env.STAGE || 'local';

  if (stage !== 'local' && stage !== 'prod') {
    throw new Error('Invalid stage: must be either "local" or "prod"');
  }

  const filePath = path.resolve(process.cwd(), FILE_PATH, `${FILE}.${stage}`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  return filePath;
};
