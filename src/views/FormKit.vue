<script setup lang="ts">
import { ref } from 'vue';
import SimpleForm from '../components/FormKitSimpleForm.vue';
import MultiStepForm from "../components/FormKitMultiStepForm.vue"

const showSimpleForm = ref(true);
</script>

<template>
	<div>
		<button @click="showSimpleForm = !showSimpleForm" class="switch-button">
			Switch Form
		</button>
		<SimpleForm v-if="showSimpleForm" />
		<MultiStepForm v-else />
	</div>
</template>


<style scoped>
@media (min-width: 1024px) {
	.content {
		min-height: 100vh;
		display: flex;
		align-items: center;
		flex-direction: column;
	}
}

.content {
	min-height: 100vh;
	display: flex;
	align-items: center;
}

.switch-button {
	background-color: #4CAF50;
	border: none;
	color: white;
	padding: 15px 32px;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	font-size: 16px;
	margin: 4px 2px;
	cursor: pointer;
	transition-duration: 0.4s;
}

.switch-button:hover {
	background-color: white;
	color: black;
	border: 2px solid #4CAF50;
}
</style>