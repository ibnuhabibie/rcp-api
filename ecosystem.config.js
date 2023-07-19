module.exports = {
  apps: [{
    name: 'api',
    script: `${__dirname}/dist/app.js`,
    max_memory_restart: `${process.env.WEB_MEMORY || 512}M`,
    exec_mode: 'cluster',
    instances: process.env.WEB_CONCURRENCY || -1,
  }],
};
