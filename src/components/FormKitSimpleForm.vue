<script setup lang="ts">
import { FormKit } from '@formkit/vue';
import { ref } from 'vue';

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

const handleCountryChange = (country: keyof typeof stateOptions) => {
	states.value = stateOptions[country] || [];
};

const handleSubmit = async (fields) => {
	// Validate all fields
	// TODO: Post form data to server
	alert("Form submitted successfully!");
	console.log(formData);
};
</script>
<template>

	<h1>Simple Form (FormKit)</h1>
	<FormKit type="form" @submit="handleSubmit" #default="{ value }">
		<FormKit type="text" name="name" id="name" label="Name" placeholder="“Jon Doe”" validation="required" />
		<FormKit type="text" name="email" id="email" label="Email" placeholder="jon@doe.com"
			validation="required | email" />
		<FormKit type="radio" name="subscription" label="Subscription" :options="['Basic', 'Premium']"
			validation="required" />
		<FormKit type="select" placeholder="Please select a country" name="country" label="Country" :options="countries"
			@change="handleCountryChange(value.country)" />
		<FormKit type="select" name="state" label="State" :options="states" v-if="value?.country" />
	</FormKit>
</template>

<style>
.formkit-form {
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

.formkit-message[data-message-type=validation],
.formkit-message[data-message-type=ui] {
	list-style: none;
	color: red;
	font-size: 0.875rem;
	margin-top: 5px;
}

.formkit-input[type=submit] {
	margin-top: 8px;
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

.formkit-options {
	li {
		list-style: none;
	}

	display: flex;
	justify-content: center;
}


.radio-label input {
	margin-right: 5px;
}
</style>
