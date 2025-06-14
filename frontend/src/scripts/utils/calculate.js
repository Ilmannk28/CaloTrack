export default class Calculate {
    static calculateBMI(weightKg, heightCm) {
        const heightM = heightCm / 100;
        return weightKg / (heightM ** 2);
    }

    static bmiStatus(bmi) {
        if (bmi < 18.5) return "Berat badan kamu kurang (underweight).";
        if (bmi < 24.9) return "Berat badan kamu normal.";
        if (bmi < 29.9) return "Berat badan kamu kelebihan berat badan (overweight).";
        return "Berat badan kamu obesitas.";
    }

    static calculateBMR(weightKg, heightCm, age, gender) {
        // BMR Mifflin-St Jeor equation
        if (gender === 'L') {
            return 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
        } else { // P
            return 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
        }
    }

    static idealWeight(heightCm, idealBMI = 22) {
        const heightM = heightCm / 100;
        return idealBMI * (heightM ** 2);
    }

    static calculateResults(formData) {
        const { name, age, height, weight, gender, activityLevel } = formData;

        const bmi = this.calculateBMI(weight, height);
        const status = this.bmiStatus(bmi);
        const bmr = this.calculateBMR(weight, height, age, gender);
        const dailyCalories = bmr * activityLevel;
        const idealWeight = this.idealWeight(height);
        const weightDifference = weight - idealWeight;

        let recommendation;
        if (weightDifference > 0) {
            recommendation = `Kamu perlu menurunkan berat badan sekitar ${weightDifference.toFixed(1)} kg untuk mencapai berat ideal.`;
        } else if (weightDifference < 0) {
            recommendation = `Kamu perlu menambah berat badan sekitar ${Math.abs(weightDifference).toFixed(1)} kg untuk mencapai berat ideal.`;
        } else {
            recommendation = "Berat badan kamu sudah ideal.";
        }

        return {
            name,
            age,
            height,
            weight,
            bmi,
            status,
            dailyCalories,
            idealWeight,
            recommendation
        };
    }
}