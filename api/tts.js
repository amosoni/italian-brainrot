// Vercel API路由 - TTS服务
export default async function handler(req, res) {
  // 只允许POST请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'No text provided' });
    }

    // 验证文本长度
    if (text.length > 500) {
      return res.status(400).json({ error: 'Text too long' });
    }

    // 安全检查：移除潜在的恶意代码
    const sanitizedText = text.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    
    const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;
    const REPLICATE_VERSION_ID = 'b76242b40d67c76ab6742e987628a2a9ac019e11d56ab96c4e91ce03b79b2787';

    if (!REPLICATE_API_TOKEN) {
      return res.status(500).json({ error: 'API token not configured' });
    }

    // 发起推理请求
    const predictionRes = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        version: REPLICATE_VERSION_ID,
        input: { prompt: sanitizedText }
      })
    });

    if (!predictionRes.ok) {
      throw new Error(`Replicate API error: ${predictionRes.status}`);
    }

    const prediction = await predictionRes.json();

    // 轮询获取结果
    let audioUrl = null;
    for (let i = 0; i < 20; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const statusRes = await fetch(prediction.urls.get, {
        headers: { 'Authorization': `Token ${REPLICATE_API_TOKEN}` }
      });
      
      if (!statusRes.ok) {
        throw new Error(`Status check failed: ${statusRes.status}`);
      }
      
      const status = await statusRes.json();
      
      if (status.status === 'succeeded') {
        audioUrl = Array.isArray(status.output) ? status.output[0] : status.output;
        break;
      }
      
      if (status.status === 'failed') {
        return res.status(500).json({ error: 'TTS generation failed' });
      }
    }

    if (!audioUrl) {
      return res.status(500).json({ error: 'TTS generation timeout' });
    }

    res.status(200).json({ audioUrl });
    
  } catch (error) {
    console.error('TTS API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
} 