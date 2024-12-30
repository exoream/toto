const { Storage } = require('@google-cloud/storage');
const { GoogleAuth } = require('google-auth-library');
const tf = require('@tensorflow/tfjs-node');

// Ambil kunci dari variabel lingkungan dan dekode dari base64
const base64Key = process.env.GOOGLE_CLOUD_KEY_BASE64;
const key = JSON.parse(Buffer.from(base64Key, 'base64').toString('utf8'));

const storage = new Storage({ credentials: key });
const bucketName = 'trototracks-ml';
const fileName = 'model.json';

// Fungsi untuk mendapatkan access token
async function getAccessToken() {
  const auth = new GoogleAuth({
    credentials: key,
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });

  const client = await auth.getClient();
  const token = await client.getAccessToken();
  return token.token;
}

// Fungsi untuk memuat model menggunakan Access Token
async function loadModel() {
  const token = await getAccessToken();
  const modelUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
  return tf.loadLayersModel(modelUrl);
}

module.exports = loadModel;
