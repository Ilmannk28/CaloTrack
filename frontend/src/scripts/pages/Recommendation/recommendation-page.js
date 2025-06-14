import RecommendationPresenter from './recommendation-presenter';

export default class RecommendationPage {
  #presenter;

  async render() {
    return `
    <div class="container-recommendation">
    <section class="content-recommendation">
    <h1 class="recommendation-title">Rekomendasi Rencana Makan</h1>
    <form id="recommendation-form" class="recommendation-form">
    <label for="calorieGoal">Masukkan kebutuhan kalori harian:</label>
    <input type="number" id="calorieGoal" name="calorieGoal" required min="100" />
    <button type="submit" class="btn">Dapatkan Rekomendasi</button>
    </form>
    <div id="recommendation-result" class="recommendation-result"></div>
    </section>
    </div>
    `;
  }

  async afterRender() {
    const form = document.getElementById('recommendation-form');
    const resultContainer = document.getElementById('recommendation-result');

    this.#presenter = new RecommendationPresenter({ resultContainer });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const calorieGoal = parseInt(document.getElementById('calorieGoal').value);
      if (!isNaN(calorieGoal) && calorieGoal > 0) {
        await this.#presenter.getRecommendation(calorieGoal);
      }
    });
  }
}
