import express from 'express';
import bodyParser from 'body-parser';
import { channelId, token } from './constants';
import { makeBody } from './utils'

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/slack_webhook', (req, res) => {
  const { channel, user, type, challenge } = req.body;

  if (type === 'url_verification') {
    return res.status(400).send({ challenge });
  }

  if (channel === channelId && type === 'member_left_channel') {
    const url = `https://slack.com/api/channels.invite`;
    const extraHeader = { 'Authorization': 'Bearer ' + token };
    fetch(url, makeBody({ channel, user }, extraHeader));
    return res.status(400).send({ msg: 'DONE' });
  }

  return res.status(400).send({ msg: 'DONE' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
