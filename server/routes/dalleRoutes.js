import express from 'express';
import * as dotenv from 'dotenv';
// import { Configuration, OpenAIApi } from 'openai';
// const { Configuration, OpenAIApi } = require('openai');
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


dotenv.config();

const router = express.Router();

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from DALL-E!' });
});



// router.route('/').post(async (req, res) => {
//   try {
//     const { prompt } = req.body;
//     console.log(prompt)

//     const aiResponse = await openai.images.generate({
//       prompt,
//       n: 1,
//       size: '1024x1024',
//       response_format: 'b64_json',
//     });

//     const image = aiResponse.data.data[0].b64_json;
//     res.status(200).json({ photo: image });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error?.response.data.error.message || 'Something went wrong');
//   }
// });


import fetch from 'node-fetch';

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log(prompt)

    const apiHost = process.env.API_HOST ?? 'https://api.stability.ai';
    const apiKey = 'sk-jT9qERp4jML50a6rsFIrwV6hFoSUJkoWAilDhdatMyldgVLG';

    if (!apiKey) throw new Error('Missing Stability API key.');

    const response = await fetch(`${apiHost}/v1/generation/stable-diffusion-v1-6/text-to-image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        text_prompts: [
          {
            text: prompt,
          },
        ],
        cfg_scale: 7,
        height: 1024,
        width: 1024,
        steps: 30,
        samples: 1,
      }),
    });

    if (!response.ok) {
      throw new Error(`Non-200 response: ${await response.text()}`);
    }

    const responseData = await response.json();
    const image = responseData.artifacts[0].base64;

    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message || 'Something went wrong');
  }
});

export default router;