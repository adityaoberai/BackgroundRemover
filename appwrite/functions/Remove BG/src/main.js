import { Client, Storage, ID, InputFile } from 'node-appwrite';

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('bgremover')
    .setJWT(req.headers['X-Appwrite-JWT']);

    const storage = new Storage(client);
  if(req.method === 'POST') {
    try {
      var bgRemovalApiUrl = process.env.AZURE_AI_API_URL + 'computervision/imageanalysis:segment?api-version=2023-02-01-preview';
      var bgRemovalApiKey = process.env.AZURE_AI_API_KEY;

      var bgRemovalRequest = await fetch(bgRemovalApiUrl, {
        method: 'POST',
        body: req.bodyRaw,
        headers: {
            'Content-Type': 'application/octet-stream',
            'Ocp-Apim-Subscription-Key': bgRemovalApiKey
        }
      });
      
      var image = await storage.createFile('images',
        ID.unique(),
        InputFile.fromStream(bgRemovalRequest.body)
      );

      log(await image.json());

      res.json({
        ok: true,
        data: image
      });
    } catch (err) {
      error(err.message);

      res.json({
        ok: false,
        data: err
      })
    }
  }
};
