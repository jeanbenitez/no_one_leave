import express from 'express';
import bodyParser from 'body-parser';
import { channelId, token } from './constants';
import { makeBody, respond } from './utils'

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/slack_webhook', (req, res) => {
  const { channel, user, type, challenge } = req.body;

  if (type === 'url_verification') {
    return respond({ challenge });
  }

  if (channel === channelId && type === 'member_left_channel') {
    const url = `https://slack.com/api/channels.invite`;
    const extraHeader = { 'Authorization': 'Bearer ' + token };
    fetch(url, makeBody({ channel, user }, extraHeader));
    return respond('DONE');
  }

  return respond('NOTHING TO DO...');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
