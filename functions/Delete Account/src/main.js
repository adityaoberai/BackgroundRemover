import { Client, Databases, Storage, Users, Query } from 'node-appwrite';

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('bgremover')
    .setKey(process.env.APPWRITE_API_KEY);

  const users = new Users(client);
  const databases = new Databases(client);
  const storage = new Storage(client);

  const userId = req.body;
  log(`User id: ${userId}`);

  var result = {
    status: 'error',
    message: 'Something went wrong',
  };

  try {
    await users.deleteSessions(userId);
    log('Sessions deleted');

    await users.delete(userId);
    log('User deleted');

    var imagesOffset = 0;
    var imagesLimit = 50;
    do{
      let images = await databases.listDocuments(
        'imagedb',
        'images',
        [
          Query.equal('userId', [ userId ]),
          Query.limit(imagesLimit),
          Query.offset(imagesOffset)
        ]
      );
      log(`Images found: ${images.total}`);

      images.documents.forEach(image => {
        log(JSON.stringify(image));
        storage.deleteFile(
          'output',
          image.userId
        );
        databases.deleteDocument(
          'imagedb',
          'images',
          image.$id
        );
        log(`Image deleted ${image.imageId}`);
        imagesOffset += imagesLimit;
      });
    } while(images.total > 0);

    log('Account deleted successfully');

    result.status = 'success';
    result.message = 'Account deleted successfully';
  } catch (e) {
    error(e);
    result.message = e.message;
  }

  return res.json(result);
};
