import { generateLoaderAbsoluteTemplate } from '../../../tamplate';
import { predictImage } from '../../utils/api';

export default class PredictPresenter {
  #resultContainer;

  constructor({ resultContainer }) {
    this.#resultContainer = resultContainer;
  }

  async predictFromFile(imageFile) {
    const formData = new FormData();
    formData.append('file', imageFile, 'image.jpg');

    // Tampilkan loader
    this.#resultContainer.innerHTML = generateLoaderAbsoluteTemplate();

    try {
      const response = await predictImage(imageFile);

      if (response?.predictions?.length === 0) {
        this.#resultContainer.innerHTML = `
          <p style="color: orange;"><strong>Tidak ada makanan terdeteksi dalam gambar.</strong></p>
        `;
        return;
      }

      const imageUrl = URL.createObjectURL(imageFile);

      // Render gambar dan canvas kosong dulu
      this.#resultContainer.innerHTML = `
        <div style="position: relative; display: inline-block;">
          <img id="result-image" src="${imageUrl}" style="max-width: 100%; display: block;" />
          <canvas id="result-canvas" style="position: absolute; top: 0; left: 0;"></canvas>
        </div>
        <h3>Hasil Deteksi:</h3>
        <ul>
          ${response.predictions.map((item) => `
            <li>
              <strong>${item.food}</strong> - ${item.calories} kkal
              
            </li>`).join('')}
        </ul>
        <p><strong>Total Kalori:</strong> ${response.total_calories} kkal</p>
      `;

      const imageElement = document.getElementById('result-image');
      const canvasElement = document.getElementById('result-canvas');

      // Tunggu hingga gambar terload
      imageElement.onload = () => {
        const ctx = canvasElement.getContext('2d');

        // Ukuran asli gambar (natural size)
        const naturalWidth = imageElement.naturalWidth;
        const naturalHeight = imageElement.naturalHeight;

        // Ukuran tampilan gambar di layar (set canvas ke ukuran tampilan, bukan ukuran asli)
        const displayWidth = imageElement.clientWidth;
        const displayHeight = imageElement.clientHeight;

        canvasElement.width = displayWidth;
        canvasElement.height = displayHeight;

        // Hitung skala antara ukuran asli dan ukuran tampilan
        const scaleX = displayWidth / naturalWidth;
        const scaleY = displayHeight / naturalHeight;

        response.predictions.forEach((item) => {
          const { bbox, food, calories } = item;
          const [x, y, width, height] = bbox;

          // Sesuaikan posisi bounding box berdasarkan skala
          const scaledX = x * scaleX;
          const scaledY = y * scaleY;
          const scaledWidth = width * scaleX;
          const scaledHeight = height * scaleY;

          ctx.strokeStyle = '#00FF00';
          ctx.lineWidth = 2;
          ctx.strokeRect(scaledX, scaledY, scaledWidth, scaledHeight);

          ctx.fillStyle = 'rgba(0, 255, 0, 0.2)';
          ctx.fillRect(scaledX, scaledY, scaledWidth, scaledHeight);

          ctx.fillStyle = '#000';
          ctx.font = '14px sans-serif';
          ctx.fillText(`${food}: ${calories} kkal`, scaledX + 4, scaledY + 16);
        });

      };

    } catch (error) {
      this.#resultContainer.innerHTML = `
        <p style="color: red;"><strong>Gagal memproses gambar.</strong></p>
      `;
      console.error('Error saat memanggil /predict:', error);
    }
  }
}
