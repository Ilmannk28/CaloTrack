// /utils/api.js
const BASE_URL = 'https://web-production-63ef.up.railway.app';

export async function predictImage(imageFile) {
  const formData = new FormData();
  formData.append('file', imageFile, 'image.jpg');

  const response = await fetch(`${BASE_URL}/predict-image`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function getRecommendation(calories) {
  const response = await fetch(`${BASE_URL}/recommend?calories=${calories}`);
  return await response.json();
}

export async function getArticles() {
  const response = await fetch(`${BASE_URL}/articles`);
  return await response.json();
}

