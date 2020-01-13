<template>
    <div class="input-boladao">
        <label>{{text}}</label>
        <input type="text" @input="activate = true" :placeholder="text">
    </div>    
</template>

<script>
export default {
	data () {
        return {
            activate: false,
            text: 'E-mail'
        }
    }
}
</script>

<style lang="scss" scoped>
    .input-boladao {
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;
        width: 70%;
        border: 2px solid rgba(0, 0, 0, 0.233);
        background: white;
        height: 60px;
        input {
            display: block;
            max-width: 100%;
            width: 100%;
            color: #000;
            font-family: Roboto,Helvetica,Arial,sans-serif;
            box-sizing: border-box;
            touch-action: manipulation;
            margin-bottom: 0;
            transition: all .1s cubic-bezier(.4,0,.2,1);
            border: none;
            outline: none;
            font-size: 1.1rem;
            padding: .9rem;
        }
        label {
            font-size: 1.2rem !important;
            color: #000;
        }
    }
</style>
	