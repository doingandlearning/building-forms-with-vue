<script setup lang="ts">
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { ref, computed } from "vue";

const currentStep = ref(0);

// Define validation schemas for each step
const schemas = [
	yup.object({
		name: yup.string().required("Name is required."),
		email: yup
			.string()
			.required("Email is required.")
			.email("Invalid email format."),
	}),
	yup.object({
		password: yup
			.string()
			.required("Password is required.")
			.min(6, "Password must be at least 6 characters."),
		confirmPassword: yup
			.string()
			.required("Confirm password is required.")
			.oneOf([yup.ref("password")], "Passwords must match."),
	}),
	yup.object({
		address: yup.string().required("Address is required."),
		postalCode: yup
			.string()
			.required("Postal Code is required.")
	}),
	yup.object({
		terms: yup
			.boolean()
			.required("You must accept the terms.")
			.oneOf([true], "You must accept the terms."),
	}),
];

// Reactive schema for the current step
const currentSchema = computed(() => schemas[currentStep.value]);

// Handlers for step navigation
function nextStep(values: Record<string, any>) {
	if (currentStep.value < schemas.length - 1) {
		currentStep.value++;
	} else {
		console.log("Form Submitted:", values);
		alert("Form submitted successfully!");
	}
}

function prevStep() {
	if (currentStep.value > 0) {
		currentStep.value--;
	}
}
</script>

<template>
	<div>
		<h1>Multi-Step Form (VeeValidate)</h1>

		<Form @submit="nextStep" :validation-schema="currentSchema" keep-values v-slot="{ handleSubmit, values }">
			<!-- Step 1: Personal Details -->
			<template v-if="currentStep === 0">
				<h2>Step 1: Personal Details</h2>
				<label for="name">Name:</label>
				<Field name="name" id="name" placeholder="Enter your name" />
				<ErrorMessage name="name" class="error" />

				<label for="email">Email:</label>
				<Field name="email" id="email" type="email" placeholder="Enter your email" />
				<ErrorMessage name="email" class="error" />
			</template>

			<!-- Step 2: Account Details -->
			<template v-if="currentStep === 1">
				<h2>Step 2: Account Details</h2>
				<label for="password">Password:</label>
				<Field name="password" id="password" type="password" placeholder="Enter your password" />
				<ErrorMessage name="password" class="error" />

				<label for="confirmPassword">Confirm Password:</label>
				<Field name="confirmPassword" id="confirmPassword" type="password" placeholder="Re-enter your password" />
				<ErrorMessage name="confirmPassword" class="error" />
			</template>

			<!-- Step 3: Address Details -->
			<template v-if="currentStep === 2">
				<h2>Step 3: Address Details</h2>
				<label for="address">Address:</label>
				<Field name="address" id="address" as="textarea" placeholder="Enter your address" />
				<ErrorMessage name="address" class="error" />

				<label for="postalCode">Postal Code:</label>
				<Field name="postalCode" id="postalCode" placeholder="Enter your postal code" />
				<ErrorMessage name="postalCode" class="error" />
			</template>

			<!-- Step 4: Terms and Conditions -->
			<template v-if="currentStep === 3">
				<h2>Step 4: Terms and Conditions</h2>
				<label for="terms">
					<Field name="terms" type="checkbox" id="terms" :value="true" />
					I agree to the terms and conditions
				</label>
				<ErrorMessage name="terms" class="error" />
			</template>

			<!-- Navigation Buttons -->
			<div class="navigation">
				<button type="button" @click="prevStep" :disabled="currentStep === 0">
					Previous
				</button>
				<button v-if="currentStep < schemas.length - 1" type="submit">
					Next
				</button>
				<button v-if="currentStep === schemas.length - 1" type="submit">
					Finish
				</button>
			</div>
		</Form>
	</div>
</template>

<style scoped>
h1 {
	text-align: center;
	margin-bottom: 20px;
}

form {
	padding: 20px;
	border: 1px solid black;
	border-radius: 8px;
	margin: 20px auto;
	max-width: 500px;
	background-color: #f9f9f9;
}

label {
	display: block;
	margin-top: 10px;
}

input,
textarea {
	display: block;
	width: 100%;
	padding: 8px;
	margin-top: 5px;
	border: 1px solid #ccc;
	border-radius: 4px;
}

button {
	margin-top: 20px;
	padding: 10px 20px;
	border: none;
	background-color: #007bff;
	color: #fff;
	border-radius: 4px;
	cursor: pointer;
}

button:disabled {
	background-color: #ccc;
	cursor: not-allowed;
}

.error {
	color: red;
	font-size: 0.875rem;
	margin-top: 5px;
}
</style>
