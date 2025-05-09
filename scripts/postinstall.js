const { execSync } = require('child_process');

function run(cmd) {
  console.log(`\n> ${cmd}`);
  execSync(cmd, { stdio: 'inherit' });
}

if (process.env.RENDER) {
  console.log('Running production postinstall tasks...');
  run('npx prisma migrate reset --force --skip-seed');
  run('npx prisma db seed');
} else {
  run('npx prisma generate');
}
