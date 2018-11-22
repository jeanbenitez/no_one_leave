import express from 'express';
import { channelId, token } from './constants';
import { makeBody, respond } from './utils'

const app = express();

app.post('/slack_webhook', (_, res) => {
  const { channel, user, type } = res.body.payload;

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
