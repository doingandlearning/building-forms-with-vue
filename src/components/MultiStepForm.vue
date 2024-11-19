<template>
	<div>
		<h1>Multi-Step Form</h1>
		<form @submit.prevent="handleSubmit">
			<!-- Step 1: Personal Details -->
			<div v-if="currentStep === 1">
				<h2>Step 1: Personal Details</h2>
				<div>
					<label for="name">Name:</label>
					<input id="name" type="text" v-model="formData.name" @input="validateField('name')" />
					<span v-if="errors.name" class="error">{{ errors.name }}</span>
				</div>

				<div>
					<label for="email">Email:</label>
					<input id="email" type="email" v-model="formData.email" @input="validateField('email')" />
					<span v-if="errors.email" class="error">{{ errors.email }}</span>
				</div>
			</div>

			<!-- Step 2: Location Details -->
			<div v-if="currentStep === 2">
				<h2>Step 2: Location Details</h2>
				<div>
					<label for="country">Country:</label>
					<select id="country" v-model="formData.country" @change="handleCountryChange">
						<option value="" disabled>Select a country</option>
						<option v-for="country in countries" :key="country" :value="country">
							{{ country }}
						</option>
					</select>
					<span v-if="errors.country" class="error">{{ errors.country }}</span>
				</div>

				<div v-if="formData.country">
					<label for="state">State:</label>
					<select id="state" v-model="formData.state" @change="validateField('state')">
						<option value="" disabled>Select a state</option>
						<option v-for="state in states" :key="state" :value="state">
							{{ state }}
						</option>
					</select>
					<span v-if="errors.state" class="error">{{ errors.state }}</span>
				</div>
			</div>

			<!-- Step 3: Confirmation -->
			<div v-if="currentStep === 3">
				<h2>Step 3: Confirmation</h2>
				<p><strong>Name:</strong> {{ formData.name }}</p>
				<p><strong>Email:</strong> {{ formData.email }}</p>
				<p><strong>Country:</strong> {{ formData.country }}</p>
				<p><strong>State:</strong> {{ formData.state }}</p>
				<p>Click submit to finalize your form.</p>
			</div>

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

<style>
.error {
	color: red;
	font-size: 0.875rem;
}

.navigation {
	margin-top: 20px;
}
</style>
