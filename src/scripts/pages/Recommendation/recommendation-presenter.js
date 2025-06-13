import { getRecommendation } from '../../utils/api';

export default class RecommendationPresenter {
  #resultContainer;

  constructor({ resultContainer }) {
    this.#resultContainer = resultContainer;
  }

  async getRecommendation(calorieGoal) {
    this.#resultContainer.innerHTML = '<p>Memuat rekomendasi...</p>';
    
    try {
      const response = await getRecommendation(calorieGoal);

      if (!response || typeof response !== 'object') {
        this.#resultContainer.innerHTML = '<p>Tidak ada rekomendasi ditemukan.</p>';
        return;
      }

      // Daftar waktu makan
      const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];

      const mealsHTML = mealTypes.map(mealType => {
        const items = response[mealType];
        if (!items || !Array.isArray(items) || items.length === 0) return '';

        const total = items.reduce((sum, item) => sum + item.calories, 0);
        const listItems = items.map(item => `
          <li><strong>${item.name}</strong> (${item.calories} kcal) - ${item.category}</li>
        `).join('');

        return `
          <div class="meal-block">
            <h3>${mealType.charAt(0).toUpperCase() + mealType.slice(1)} (${total} kcal)</h3>
            <ul>${listItems}</ul>
          </div>
        `;
      }).join('');

      this.#resultContainer.innerHTML = `
        <div class="recommendation-summary">
          ${mealsHTML}
          <p><strong>Total Kalori:</strong> ${response.total_calories || 0} kcal</p>
        </div>
      `;
    } catch (error) {
      this.#resultContainer.innerHTML = '<p style="color:red">Gagal memuat rekomendasi.</p>';
      console.error('Error saat mendapatkan rekomendasi:', error);
    }
  }
}
