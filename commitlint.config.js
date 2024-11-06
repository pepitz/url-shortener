module.exports = {
  extends: ['@commitlint/config-conventional'],
  formatter: '@commitlint/format',
  rules: { 'subject-max-length': [2, 'always', 72] },
};
