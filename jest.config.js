const { getJestProjects } = require('@nrwl/jest');

module.exports = {
  projects: [
    ...getJestProjects(),
    '<rootDir>/apps/frontend',
    '<rootDir>/apps/backend',
  ],
};
