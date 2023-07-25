module.exports = {
  '*.ts': [
    'eslint',
    'prettier --ignore-unknown --ignore-path .gitignore --check src/**/*.ts tests/**/*.ts',
  ],
};
