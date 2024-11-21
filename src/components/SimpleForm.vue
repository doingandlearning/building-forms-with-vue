<script setup>
import { reactive, ref } from 'vue';

// Reactive data
const formData = reactive({
	name: "",
	country: "",
	email: "",
	state: "",
});

const errors = reactive({});

// Static data
const countries = ["USA", "Canada", "UK"];
const states = ref([]);
const stateOptions = {
	USA: ["California", "Texas", "New York"],
	Canada: ["Ontario", "Quebec", "British Columbia"],
	UK: ["England", "Scotland", "Wales", "Northern Ireland"],
};

// Methods 
// Validate is just checking if the field is empty or not
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
	formData.state = ""; // Reset state selection when country changes
};

const handleSubmit = () => {
	// Validate all fields
	validateField("name");
	validateField("country");
	validateField("state");

	// TODO: Post form data to server
	if (Object.keys(errors).length === 0) {
		alert("Form submitted successfully!");
		console.log(formData);
	} else {
		alert("Please fix the errors before submitting.");
	}
};
</script>

<template>
	<div class="form-container">
		<h1>Simple Form</h1>
		<form @submit.prevent="handleSubmit" class="form">
			<!-- Name Input -->
			<div class="form-group">
				<label for="name">Name:</label>
				<input id="name" type="text" v-model="formData.name" @input="validateField('name')" />
				<span v-if="errors.name" class="error">{{ errors.name }}</span>
			</div>
			<!-- Email Input -->
			<div class="form-group">
				<label for="email">Email:</label>
				<input id="email" type="email" v-model="formData.email" @input="validateField('email')" required />
				<span v-if="errors.email" class="error">{{ errors.email }}</span>
			</div>

			<!-- Subscription Radio Buttons -->
			<div class="form-group">
				<label>Subscription:</label>
				<div class="radio-group">
					<label class="radio-label">
						<input type="radio" value="Basic" v-model="formData.subscription" @change="validateField('subscription')" />
						Basic
					</label>
					<label class="radio-label">
						<input type="radio" value="Premium" v-model="formData.subscription"
							@change="validateField('subscription')" />
						Premium
					</label>
				</div>
				<span v-if="errors.subscription" class="error">{{ errors.subscription }}</span>
			</div>

			<!-- Country Select -->
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

			<!-- State Select -->
			<div class="form-group" v-if="formData.country">
				<label for="state" v-if="formData.country === 'UK'">Country:</label>
				<label for="state" v-else>State:</label>
				<select id="state" v-model="formData.state" @change="validateField('state')">
					<option value="" v-if="formData.country === 'UK'" disabled>Select a country</option>
					<option value="" v-else disabled>Select a state</option>
					<option v-for="state in states" :key="state" :value="state">
						{{ state }}
					</option>
				</select>
				<span v-if="errors.state" class="error">{{ errors.state }}</span>
			</div>

			<!-- Submit Button -->
			<button type="submit" class="submit-button">Submit</button>
		</form>
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
	justify-content: center;
}


.radio-label input {
	margin-right: 5px;
}
</style>
