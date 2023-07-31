module.exports = {
  '*.ts': () => 'tsc -p tsconfig.json --noEmit',
  '*.{js,ts}': filenames => `eslint ${filenames.join(' ')}`,
};
