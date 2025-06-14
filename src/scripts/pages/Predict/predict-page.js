// File: /features/predict/predict-page.js
import PredictPresenter from './predict-presenter';
import Camera from '../../utils/camera';

export default class PredictPage {
  #presenter;
  #camera;
  #isCameraOpen = false;
  #imageBlob = null;

  async render() {
    return `
      <div class="container-predict">
      <section class="content-predict">
      <h1 class="predict-page__title">Prediksi Kalori Makanan</h1>
      
      <div class="predict-page__controls">
          <button id="upload-button" class="btn btn-outline"><i class="fa-solid fa-image"></i>Upload Gambar</button>
          <input type="file" id="upload-input" accept="image/*" hidden />

          <button id="toggle-camera-button" class="btn btn-outline">
          <i class="fa-solid fa-camera"></i>Buka Kamera</button>
          </div>

        <div id="camera-container" class="predict-page__camera-container">
          <video id="camera-video" class="camera-video">Video stream tidak tersedia</video>
          <canvas id="camera-canvas" class="camera-canvas"></canvas>

          <div class="camera-tools">
            <select id="camera-select"></select>
            <button id="take-picture-button" class="btn">Ambil Gambar</button>
            </div>
        </div>
        
        <div id="result-container" class="predict-page__result"></div>
        </section>
      </div>
    `;
    }

    async afterRender() {
    const uploadInput = document.getElementById('upload-input');
    const uploadButton = document.getElementById('upload-button');
    const toggleCameraButton = document.getElementById('toggle-camera-button');
    const cameraContainer = document.getElementById('camera-container');

    const videoElement = document.getElementById('camera-video');
    const canvasElement = document.getElementById('camera-canvas');
    const selectElement = document.getElementById('camera-select');
    const takePictureButton = document.getElementById('take-picture-button');
    const resultContainer = document.getElementById('result-container');

    this.#presenter = new PredictPresenter({ resultContainer });

    uploadButton.addEventListener('click', () => uploadInput.click());

    uploadInput.addEventListener('change', async (event) => {
      const file = event.target.files[0];
      if (file) {
        await this.#presenter.predictFromFile(file);
      }
    });

    toggleCameraButton.addEventListener('click', async () => {
      cameraContainer.classList.toggle('open');
      this.#isCameraOpen = cameraContainer.classList.contains('open');

      if (this.#isCameraOpen) {
        toggleCameraButton.textContent = 'Tutup Kamera';

        if (!this.#camera) {
          this.#camera = new Camera({
            video: videoElement,
            cameraSelect: selectElement,
            canvas: canvasElement,
          });
        }

        await this.#camera.launch();

        this.#camera.addCheeseButtonListener(takePictureButton, async () => {
          const blob = await this.#camera.takePicture();
          await this.#presenter.predictFromFile(blob);
        });

      } else {
        toggleCameraButton.textContent = 'Buka Kamera';
        this.#camera?.stop();
      }
    });
  }
}
