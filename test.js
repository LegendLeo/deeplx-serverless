const translate = require('./translate');

;(async () => {
  // Example Call
  console.log(await translate('明天你好', 'ZH', 'EN', true, true));
  console.log(
    await translate(
      'Generate a cryptographically strong random string',
      'EN',
      'ZH',
      true,
      true
    )
  );
})()
