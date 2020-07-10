<template>
    <div class="loader">
        <div class="dot-1" :style="style"></div>
        <div class="dot-2" :style="style"></div>
        <div class="dot-3" :style="style"></div>
    </div>
</template>

<script>
export default {
    props: {
        size: {
            type: String,
            validator: val => ['sm', 'md', 'lg'].includes(val)
        }
    },
    computed: {
        style() {
            switch(this.size) {
                case 'sm':
                    return `height: 12px; width: 12px;`;
                case 'md':
                    return `height: 18px; width: 18px;`;
                case 'lg':
                    return `height: 24px; width: 24px;`;
            }
        }
    }
}
</script>

<style scoped>
.dot-1, .dot-2, .dot-3 {
    animation: loader 1s infinite;
    background-color: #2196f3;
    border-radius: 50%;
    display: inline-block;
    transform: scale(0);
}

.dot-1 { animation-delay: calc(0s / 3); }

.dot-2 { animation-delay: calc(1s / 3); }

.dot-3 { animation-delay: calc(2s / 3); }

.loader {
    white-space: nowrap;
}

@keyframes loader {
    0% { transform: scale(0); }
    50% { transform: scale(1); }
    100% { transform: scale(0); }
}
</style>