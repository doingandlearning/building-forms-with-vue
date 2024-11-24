<script setup>
import { reactive, ref } from 'vue';

// Form state
const formData = reactive({
	name: "",
	email: "",
	country: "",
	state: "",
});

// Validation errors
const errors = reactive({});

// Current step tracking
const currentStep = ref(1);
const totalSteps = 3;

// Country and state data
const countries = ["USA", "Canada"];
const states = ref([]);
const stateOptions = {
	USA: ["California", "Texas", "New York"],
	Canada: ["Ontario", "Quebec", "British Columbia"],
};

// Methods
const validateField = (field) => {
	const value = formData[field];
	if (!value) {
		errors[field] = `${field} is required.`;
	} else {
		delete errors[field];
	}
};

const handleCountryChange = () => {
	validateField("country");
	states.value = stateOptions[formData.country] || [];
	formData.state = ""; // Reset state when country changes
};

const validateStep = () => {
	const stepFields = {
		1: ["name", "email"],
		2: ["country", "state"],
	};

	const fieldsToValidate = stepFields[currentStep.value] || [];
	fieldsToValidate.forEach((field) => validateField(field));

	return fieldsToValidate.every((field) => !errors[field]);
};

const nextStep = () => {
	if (validateStep()) {
		currentStep.value++;
	}
};

const prevStep = () => {
	if (currentStep.value > 1) {
		currentStep.value--;
	}
};

const handleSubmit = () => {
	Object.keys(formData).forEach((field) => validateField(field));

	if (Object.keys(errors).length === 0) {
		alert("Form submitted successfully!");
		console.log(formData);
	} else {
		alert("Please fix the errors before submitting.");
	}
};
</script>
<template>
	<div class="multi-step-form">
		<h1>Multi-Step Form</h1>
		<form @submit.prevent="handleSubmit">
			<!-- Step 1: Personal Details -->
			<template v-if="currentStep === 1" class="form-step">
				<h2>Step 1: Personal Details</h2>
				<div class="form-group">
					<label for="name">Name:</label>
					<input id="name" type="text" v-model="formData.name" @input="validateField('name')" />
					<span v-if="errors.name" class="error">{{ errors.name }}</span>
				</div>

				<div class="form-group">
					<label for="email">Email:</label>
					<input id="email" type="email" v-model="formData.email" @input="validateField('email')" />
					<span v-if="errors.email" class="error">{{ errors.email }}</span>
				</div>
			</template>

			<!-- Step 2: Location Details -->
			<template v-if="currentStep === 2" class="form-step">
				<h2>Step 2: Location Details</h2>
				<div class="form-group">
					<label for="country">Country:</label>
					<select id="country" v-model="formData.country" @change="handleCountryChange">
						<option value="" disabled>Select a country</option>
						<option v-for="country in countries" :key="country" :value="country">
							{{ country }}
						</option>
					</select>
					<span v-if="errors.country" class="error">{{ errors.country }}</span>
				</div>

				<div class="form-group" v-if="formData.country">
					<label for="state">State:</label>
					<select id="state" v-model="formData.state" @change="validateField('state')">
						<option value="" disabled>Select a state</option>
						<option v-for="state in states" :key="state" :value="state">
							{{ state }}
						</option>
					</select>
					<span v-if="errors.state" class="error">{{ errors.state }}</span>
				</div>
			</template>

			<!-- Step 3: Confirmation -->
			<template v-if="currentStep === 3" class="form-step">
				<h2>Step 3: Confirmation</h2>
				<p><strong>Name:</strong> {{ formData.name }}</p>
				<p><strong>Email:</strong> {{ formData.email }}</p>
				<p><strong>Country:</strong> {{ formData.country }}</p>
				<p><strong>State:</strong> {{ formData.state }}</p>
				<p>Click submit to finalize your form.</p>
			</template>

			<!-- Navigation Buttons -->
			<div class="navigation">
				<button type="button" @click="prevStep" :disabled="currentStep === 1">
					Previous
				</button>
				<button type="button" @click="nextStep" v-if="currentStep < totalSteps">
					Next
				</button>
				<button type="submit" v-if="currentStep === totalSteps">
					Submit
				</button>
			</div>
		</form>
	</div>
</template>

<style>
.multi-step-form {
	max-width: 600px;
	margin: 0 auto;
	padding: 20px;
	border: 1px solid #ccc;
	border-radius: 8px;
	background-color: #f9f9f9;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.multi-step-form h1 {
	text-align: center;
	margin-bottom: 20px;
}

.form-step {
	margin-bottom: 20px;
}

.form-group {
	margin-bottom: 15px;
}

.form-group label {
	display: block;
	margin-bottom: 5px;
	font-weight: bold;
}

.form-group input,
.form-group select {
	width: 100%;
	padding: 8px;
	border: 1px solid #ccc;
	border-radius: 4px;
}

.error {
	color: red;
	font-size: 0.875rem;
	margin-top: 5px;
	display: block;
}

.navigation {
	text-align: center;
	margin-top: 20px;
}

.navigation button {
	padding: 10px 20px;
	margin: 0 5px;
	border: none;
	border-radius: 4px;
	background-color: #007bff;
	color: white;
	cursor: pointer;
}

.navigation button:disabled {
	background-color: #ccc;
	cursor: not-allowed;
}
</style>
