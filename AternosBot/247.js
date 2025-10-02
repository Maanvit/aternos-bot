const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'LIFESTEAL21134.aternos.me', // Aternos server IP
    port: 26421, // Port number for the server
    username: '24/7DONOTTOUCH', // Bot username
    version: 'false' // Minecraft version
  });

  bot.on('spawn', () => {
    console.log('Bot has successfully spawned and joined the server!');

    // Initial movement
    bot.setControlState('forward', true);
    setTimeout(() => bot.setControlState('forward', false), 1000);

    // Start anti-AFK movement
    antiAFK(bot);
  });

  // Anti-AFK function: makes the bot move/jump randomly
  function antiAFK(bot) {
    setInterval(() => {
      // Jump a little
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);

      // Strafe left a bit
      bot.setControlState('left', true);
      setTimeout(() => bot.setControlState('left', false), 1000);

      console.log('Bot moved a bit to avoid AFK kick!');
    }, 60 * 1000); // every 1 minute
  }

  bot.on('error', (err) => {
    console.error('Error encountered:', err);
  });

  bot.on('end', () => {
    console.log('Bot has disconnected from the server.');
    console.log('Reconnecting...');
    setTimeout(createBot, 5000);
  });

  bot.on('kicked', (reason) => {
    console.log('Bot was kicked from the server for:', reason);
  });

  bot.on('login', () => {
    console.log('Bot is logging in...');
  });

  bot.on('chat', (username, message) => {
    console.log(`${username} said: ${message}`);
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });

  process.on('uncaughtException', err => {
    console.error('Uncaught Exception:', err);
  });
}

createBot();  // Start the bot