const { translate } = require('../translate');

module.exports = async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case 'GET':
      res.status(200).json({ message: 'Hello DeepLX' });
      break;
    case 'POST':
      const { text, source_lang, target_lang } = req.body;
      try {
        const result = await translate(text, source_lang, target_lang);
        const responseData = {
          alternatives: result?.alternatives,
          code: 200,
          data: result?.text,
          id: Math.floor(Math.random() * 10000000000),
          method: 'Free',
          source_lang,
          target_lang,
        };
        res.json(responseData);
      } catch (error) {
        console.log('RequestError:', error);
        res
          .status(500)
          .json(
              error.response?.data || {
                code: 500,
                message: error.message || 'Translation failed',
              }
          );
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`不支持 ${method} 方法`);
  }
};
