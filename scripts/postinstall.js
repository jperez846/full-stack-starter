const { execSync } = require('child_process')

function run(cmd) {
  console.log(`\n> ${cmd}`)
  execSync(cmd, { stdio: 'inherit' })
}

if (process.env.RENDER) {
  // Important: prod db gets reset on every deploy!
  // Change this if your app is ready for prime time
  console.log('Running production postinstall tasks...')
  run('npx prisma migrate reset --force --skip-seed')
  run('npx prisma db seed')
} else {
  run('npx prisma generate')
}
