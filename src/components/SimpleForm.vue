<template>
	<div>
		<h1>Simple Form</h1>
		<form @submit.prevent="handleSubmit">
			<!-- Name Input -->
			<div>
				<label for="name">Name:</label>
				<input id="name" type="text" v-model="formData.name" @input="validateField('name')" />
				<span v-if="errors.name" class="error">{{ errors.name }}</span>
			</div>

			<!-- Country Select -->
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

			<!-- State Select -->
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

			<!-- Submit Button -->
			<button type="submit">Submit</button>
		</form>
	</div>
</template>

<script setup>
import { reactive, ref } from 'vue';

// Reactive data
const formData = reactive({
	name: "",
	country: "",
	state: "",
});

const errors = reactive({});

// Static data
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
	formData.state = ""; // Reset state selection when country changes
};

const handleSubmit = () => {
	// Validate all fields
	validateField("name");
	validateField("country");
	validateField("state");

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
</style>
