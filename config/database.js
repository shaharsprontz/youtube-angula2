const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = 
{
    uri: 'mongodb://localhost:27017/youtube-angular2',
    secret: crypto,
    db: 'youtube-angular2'
}