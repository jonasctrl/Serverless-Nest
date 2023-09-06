import * as fs from 'fs';
import * as path from 'path';

const DEFAULT_ENVIRONMENT_ROOT_FOLDER = './environments';

export const getResolvedEnvironmentFilePath = (
  { stage } = {
    stage: process.env.STAGE,
  },
): string => {
  if (!stage) {
    throw new Error('[CUSTOM] stage was not initialized');
  }

  const filePath = path.resolve(DEFAULT_ENVIRONMENT_ROOT_FOLDER, `.env.${stage}`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`[CUSTOM] file not found: ${filePath}`);
  }

  return filePath;
};
