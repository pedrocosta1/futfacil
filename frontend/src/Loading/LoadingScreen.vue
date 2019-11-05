<template>
	<div class="body-loading">
			<IconSpinner class="svg-animation"/>
	</div>
</template>

<script>
import IconSpinner from '../Icons/IconSpinner'
export default {
	components: {
		IconSpinner
	},
}
</script>
<style scoped>
	.body-loading {
		display: flex;
		width: 100%;
		height: 100%;
		justify-content: center;
		align-items: center;
		background-color: #2F2C85;
	}
	.svg-animation {
		width: 50px;
		height: 50px;
		animation:spin 4s linear infinite;
	}
	@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
</style>