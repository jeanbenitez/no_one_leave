import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import { channelId, token, excludeUsers } from './constants';
import { makeBody } from './utils';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/slack_webhook', async (req, res) => {
  if (req.body.type === 'url_verification') {
    return res.status(200).send({ challenge: req.body.challenge });
  }

  const { channel, user, type } = req.body.event;


  console.log({ channelId, token, excludeUsers, user });

  if (channel === channelId && type === 'member_left_channel') {
    await fetch('https://slack.com/api/channels.invite', makeBody({ channel, user }, { 'Authorization': 'Bearer ' + token }));
  }
  else if (channel === channelId && type === 'member_joined_channel' && excludeUsers.split(',').includes(user)) {
    
    await fetch('https://slack.com/api/channels.kick', makeBody({ channel, user }, { 'Authorization': 'Bearer ' + token }));
  }

  return res.status(200).send({ msg: 'DONE' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
