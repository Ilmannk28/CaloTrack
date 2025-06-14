import CalculatePresenter from "./calculate-presenter";

export default class CalculatePage {
    #presenter = null;

    async render() {
        return `
            <div class="calculate-page">
                <div class="calculator-container">
                    <h1>Kalkulator Indeks Massa Tubuh (IMT) dan Kebutuhan Kalori Harian</h1>
                    
                    <form id="calculator-form">

                    <div class="form-group">
                            <label>Jenis Kelamin</label>
                            <div class="gender-selection">
                                <div class="gender-option" data-value="L">
                                    <i class="fas fa-mars"></i>
                                    <span>Laki-laki</span>
                                </div>
                                <div class="gender-option" data-value="P">
                                    <i class="fas fa-venus"></i>
                                    <span>Perempuan</span>
                                </div>
                            </div>
                            <input type="hidden" id="gender" value="L">
                        </div>

                        <div class="form-group">
                            <label for="name">Nama</label>
                            <input type="text" id="name" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="age">Umur (tahun)</label>
                            <input type="number" id="age" min="1" max="120" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="height">Tinggi Badan (cm)</label>
                            <input type="number" id="height" min="50" max="300" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="weight">Berat Badan (kg)</label>
                            <input type="number" id="weight" min="10" max="500" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="activity">Level Aktivitas</label>
                            <select id="activity" required>
                                <option value="1.2">Sangat ringan (sedikit atau tidak ada olahraga)</option>
                                <option value="1.375">Ringan (olahraga ringan 1-3 hari/minggu)</option>
                                <option value="1.55">Sedang (olahraga sedang 3-5 hari/minggu)</option>
                                <option value="1.725">Berat (olahraga berat 6-7 hari/minggu)</option>
                                <option value="1.9">Sangat berat (olahraga sangat berat, pekerjaan fisik keras)</option>
                            </select>
                        </div>
                        
                        <button type="submit" class="calculate-btn">Hitung</button>
                    </form>
                    
                    <div id="results" class="results-container" style="display: none;">
                        <h2 id="result-heading"></h2>
                        
                        <div class="basic-info">
                            <p id="age-result"></p>
                            <p id="height-result"></p>
                            <p id="weight-result"></p>
                        </div>
                        
                        <div class="result-columns">
                            <div class="result-column">
                                <h3>Hasil IMT</h3>
                                <p id="bmi-result"></p>
                                <p id="bmi-status"></p>
                            </div>
                            
                            <div class="result-column">
                                <h3>Kebutuhan Kalori</h3>
                                <p id="calorie-result"></p>
                                <p id="ideal-weight"></p>
                                <p id="weight-recommendation"></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    async afterRender() {
        
        this.#presenter = new CalculatePresenter({
            view: this,
        });

        // Memilih gender dengan icon
        const genderOptions = document.querySelectorAll('.gender-option');
        const genderInput = document.getElementById('gender');

        genderOptions.forEach(option => {
            option.addEventListener('click', () => {
                genderOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                genderInput.value = option.dataset.value;
            });
        });

        
        genderOptions[0].classList.add('active');

        // Form submission
        const form = document.getElementById('calculator-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });
    }

    handleFormSubmit() {
        const formData = {
            name: document.getElementById('name').value,
            age: document.getElementById('age').value,
            height: document.getElementById('height').value,
            weight: document.getElementById('weight').value,
            gender: document.getElementById('gender').value,
            activityLevel: document.getElementById('activity').value
        };

        this.#presenter.handleFormSubmit(formData);
    }

    displayResults(results) {
        document.getElementById('result-heading').textContent = `Hasil perhitungan untuk ${results.name}`;
        document.getElementById('age-result').textContent = `Umur: ${results.age} tahun`;
        document.getElementById('height-result').textContent = `Tinggi: ${results.height.toFixed(1)} cm`;
        document.getElementById('weight-result').textContent = `Berat saat ini: ${results.weight.toFixed(1)} kg`;
        document.getElementById('bmi-result').textContent = `Indeks Massa Tubuh (IMT): ${results.bmi.toFixed(1)}`;
        document.getElementById('bmi-status').textContent = `Kondisi: ${results.status}`;
        document.getElementById('calorie-result').textContent = `Kebutuhan kalori harian yang perlu dipenuhi: ${Math.round(results.dailyCalories)} kalori`;
        document.getElementById('ideal-weight').textContent = `Berat badan ideal untuk tinggi kamu: ${results.idealWeight.toFixed(1)} kg`;
        document.getElementById('weight-recommendation').textContent = results.recommendation;

        document.getElementById('results').style.display = 'block';
    }

    showError(message) {
        alert(message); 
    }
}