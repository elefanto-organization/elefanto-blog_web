module.exports = {
  apps: [
    {
      name: 'Elefanto Blog',
      exec_mode: 'cluster',
      instances: '2', // Or a number of instances
      script: './node_modules/nuxt/bin/nuxt.mjs',
      args: 'start'
    }
  ]
}