import Calculate from "../../utils/calculate";

export default class CalculatePresenter {
    constructor({view}) {
        this.view = view;
        this.calculator = Calculate;
    }

    handleFormSubmit(formData) {
        // Validate inputs
        if (!this.validateInputs(formData)) {
            this.view.showError('Mohon isi semua field dengan benar');
            return;
        }

        // Convert string values to numbers
        const numericData = {
            ...formData,
            age: parseInt(formData.age),
            height: parseFloat(formData.height),
            weight: parseFloat(formData.weight),
            activityLevel: parseFloat(formData.activityLevel)
        };

        // Calculate results
        const results = this.calculator.calculateResults(numericData);
        
        // Display results
        this.view.displayResults(results);
    }

    validateInputs(formData) {
        return (
            formData.name.trim() !== '' &&
            !isNaN(formData.age) && 
            !isNaN(formData.height) &&
            !isNaN(formData.weight)
        );
    }
}