<script setup>
import { Field, Form, ErrorMessage } from "vee-validate";
import { ref } from "vue";
import * as yup from "yup";

// Reactive form data and states
const states = ref([]);
const countries = ["USA", "Canada", "UK"];
const stateOptions = {
	USA: ["California", "Texas", "New York"],
	Canada: ["Ontario", "Quebec", "British Columbia"],
	UK: ["England", "Scotland", "Wales", "Northern Ireland"],
};


// Handle dynamic states
const handleCountryChange = (value) => {
	states.value = stateOptions[value] || [];
};

// Validation schema using Yup
const validationSchema = yup.object({
	name: yup.string().required("Name is required."),
	email: yup
		.string()
		.email("Invalid email format.")
		.required("Email is required."),
	subscription: yup.string().required("Subscription is required."),
	country: yup.string().required("Country is required."),
	state: yup.string().required("State is required."),
});

// Form submission
const handleSubmit = (values) => {
	console.log("Form Submitted:", values);
	alert("Form submitted successfully!");
};
</script>

<template>
	<div class="form-container">
		<h1>Simple Form</h1>
		<Form @submit="handleSubmit" :validation-schema="validationSchema" v-slot="{ values }" class="form">
			<!-- Name Input -->

			<div class="form-group">
				<label for="name">Name:</label>
				<Field id="name" name="name" as="input" type="text" placeholder="Enter your name" />
				<ErrorMessage name="name" class="error" />
			</div>

			<!-- Email Input -->
			<div class="form-group">
				<label for="email">Email:</label>
				<Field id="email" name="email" as="input" type="email" placeholder="Enter your email" />
				<ErrorMessage name="email" class="error" />
			</div>

			<!-- Subscription Radio Buttons -->
			<div class="form-group">
				<label>Subscription:</label>
				<div class="radio-group">
					<label class="radio-label">
						<Field type="radio" name="subscription" value="Basic" />
						Basic
					</label>
					<label class="radio-label">
						<Field type="radio" name="subscription" value="Premium" />
						Premium
					</label>
				</div>
				<ErrorMessage name="subscription" class="error" />
			</div>

			<!-- Country Select -->
			<div class="form-group">
				<label for="country">Country:</label>
				<Field id="country" name="country" as="select" @input="handleCountryChange">
					<option value="" disabled>Select a country</option>
					<option v-for="country in countries" :key="country" :value="country">
						{{ country }}
					</option>
				</Field>
				<ErrorMessage name="country" class="error" />
			</div>

			<!-- State Select -->
			<div class="form-group" v-if="values.country">
				<label for="state">State:</label>
				<Field id="state" name="state" as="select">
					<option value="" disabled>Select a state</option>
					<option v-for="state in states" :key="state" :value="state">
						{{ state }}
					</option>
				</Field>
				<ErrorMessage name="state" class="error" />
			</div>

			<!-- Submit Button -->
			<button type="submit" class="submit-button">Submit</button>

		</Form>
	</div>
</template>

<style>
.form-container {
	max-width: 500px;
	margin: 0 auto;
	padding: 20px;
	border: 1px solid #ccc;
	border-radius: 8px;
	background-color: #f9f9f9;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
	text-align: center;
	margin-bottom: 20px;
}

.form {
	display: flex;
	flex-direction: column;
}

.form-group {
	margin-bottom: 15px;
}

label {
	display: block;
	margin-bottom: 5px;
	font-weight: bold;
}

input,
select {
	width: 100%;
	padding: 8px;
	border: 1px solid #ccc;
	border-radius: 4px;
}

input:focus,
select:focus {
	border-color: #007bff;
	outline: none;
	box-shadow: 0 0 4px rgba(0, 123, 255, 0.25);
}

.error {
	color: red;
	font-size: 0.875rem;
	margin-top: 5px;
}

.submit-button {
	padding: 10px 15px;
	background-color: #007bff;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	font-size: 1rem;
}

.submit-button:hover {
	background-color: #0056b3;
}

.radio-group {
	display: flex;
	gap: 10px;
}

.radio-label {
	display: flex;
	align-items: center;
}

.radio-label input {
	margin-right: 5px;
}
</style>
