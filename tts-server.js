const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const REPLICATE_API_TOKEN = 'r8_HeYcj83efWvm7fBv1D2ua8JKHQE38yy0ASkfNmc39';
const REPLICATE_VERSION_ID = 'b76242b40d67c76ab6742e987628a2a9ac019e11d56ab96c4e91ce03b79b2787'; // bark

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/tts', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'No text provided' });

  // 1. 发起推理请求
  const predictionRes = await fetch('https://api.replicate.com/v1/predictions', {
    method: 'POST',
    headers: {
      'Authorization': `Token ${REPLICATE_API_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      version: REPLICATE_VERSION_ID,
      input: { prompt: text }
    })
  });
  const prediction = await predictionRes.json();

  // 2. 轮询获取结果
  let audioUrl = null;
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 2000));
    const statusRes = await fetch(prediction.urls.get, {
      headers: { 'Authorization': `Token ${REPLICATE_API_TOKEN}` }
    });
    const status = await statusRes.json();
    if (status.status === 'succeeded') {
      audioUrl = Array.isArray(status.output) ? status.output[0] : status.output;
      break;
    }
    if (status.status === 'failed') {
      return res.status(500).json({ error: 'TTS failed' });
    }
  }
  if (!audioUrl) return res.status(500).json({ error: 'Timeout' });
  res.json({ audioUrl });
});

const PORT = 3001;
app.listen(PORT, () => console.log(`TTS server running on port ${PORT}`)); 