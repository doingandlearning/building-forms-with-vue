<script setup lang="ts">
import { reactive, ref } from 'vue';
import { FormKit } from '@formkit/vue';

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
const handleCountryChange = (country: keyof typeof stateOptions) => {
	console.log(country)
	states.value = stateOptions[country] || [];
};


const nextStep = () => {
	currentStep.value++;
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
		<h1>Multi-Step Form (FormKit)</h1>
		<FormKit type="form" @submit="handleSubmit" #default="{ value }">
			<!-- Step 1: Personal Details -->
			<template v-if="currentStep === 1" class="form-step">
				<FormKit type="group" id="details" name="details">

					<h2>Step 1: Personal Details</h2>
					<FormKit type="text" name="name" id="name" label="Name" placeholder="“Jon Doe”" validation="required" />
					<FormKit type="text" name="email" id="email" label="Email" placeholder="jon@doe.com"
						validation="required | email" />
				</FormKit>
			</template>

			<!-- Step 2: Location Details -->
			<template v-if="currentStep === 2" class="form-step">

				<h2>Step 2: Location Details</h2>
				<FormKit type="group" id="country" name="country">
					<FormKit type="select" placeholder="Please select a country" name="country" label="Country"
						:options="countries" @change="handleCountryChange(value?.country?.country)" />
					<FormKit type="select" name="state" label="State" :options="states" v-if="value?.country" />
				</FormKit>
			</template>

			<!-- Step 3: Confirmation -->
			<template v-if="currentStep === 3" class="form-step">

				<h2>Step 3: Confirmation</h2>
				{{ value }}
				<p><strong>Name:</strong> </p>
				<p><strong>Email:</strong> </p>
				<p><strong>Country:</strong> </p>
				<p><strong>State:</strong> </p>
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
		</FormKit>
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
