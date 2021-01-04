<template>
    <div class="thumbnails">
        <div class="image" v-if="value.length">
            <img :src="display" :alt="alt">
        </div>
        <div :class="`image is-empty ${imageRatio} ${imageSize}`" v-else-if="name" v-bind:style="blank[Math.floor(Math.random() * 11)]">
            <div class="label">{{avatarName(name)}}</div>
        </div>
        <div class="control next" v-if="hasNext" @click="index++">
            <x-icon class="is-medium" name="right"></x-icon>
        </div>
        <div class="control previous" v-if="hasPrevious" @click="index--">
            <x-icon class="is-medium" name="left"></x-icon>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MediaDisplay",
        props: {
            name: {},
            value: {
                default: () => {
                    return []
                },
                type: Array
            },
            imageSize: {
                default: 'thumb_220_220'
            },
            imageRatio: {
                default: 'is-1by1'
            }
        },
        data() {
            return {
                index: 0,
                blank: [
                    'background-image: linear-gradient(225deg, rgb(143, 148, 251) 0%, rgb(78, 84, 200) 100%)',
                    'background-image: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)',
                    'background-image: linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)',
                    'background-image: linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)',
                    'background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)',
                    'background-image: linear-gradient(to top, #5ee7df 0%, #b490ca 100%)',
                    'background: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898; \n' +
                    ' background-blend-mode: multiply,multiply',
                    'background-image: linear-gradient(to top, #0ba360 0%, #3cba92 100%)',
                    'background-image: linear-gradient(to top, #d9afd9 0%, #97d9e1 100%)',
                    'background-image: linear-gradient(to left, #BDBBBE 0%, #9D9EA3 100%), radial-gradient(88% 271%, rgba(255, 255, 255, 0.25) 0%, rgba(254, 254, 254, 0.25) 1%, rgba(0, 0, 0, 0.25) 100%), radial-gradient(50% 100%, rgba(255, 255, 255, 0.30) 0%, rgba(0, 0, 0, 0.30) 100%);\n' +
                    ' background-blend-mode: normal, lighten, soft-light'
                ]
            }
        },
        computed: {
            display() {
                if (this.value.length) {
                    return this.getIMG(this.value[this.index], this.imageSize)
                } else {
                    return `/${this.imageSize}.jpg`
                }
            },
            alt() {
                if (this.value.length) {
                    return this.value[this.index].title
                } else {
                    return `/${this.imageSize}.jpg`
                }
            },
            hasNext() {
                return this.index < this.value.length - 2
            },
            hasPrevious() {
                return this.index > 0
            }
        }
    }
</script>

<style lang="scss">
    .thumbnails {
        position: relative;

        .control {
            position: absolute;
            top: calc(50% - 25px);
            cursor: pointer;

            &.previous {
                left: .5rem;
            }

            &.next {
                right: .5rem;
            }
        }
    }

    .image.is-empty {
        position: relative;
        background: linear-gradient(to top, #d9afd9 0%, #97d9e1 100%);

        .label {
            position: absolute;
            bottom: 1rem;
            left: 1rem;
            color: white;
            text-transform: uppercase;
            font-size: 1.5rem;
        }

        &:after {
            content: "";
            position: absolute;
            width: 30%;
            height: .5rem;
            top: 1rem;
            background: #c5b5b5;
            left: 35%;
            border-radius: 5px;
            box-shadow: inset 0 0 10px #000000;
        }

        &:before {
            content: "";
            background: url(/vue-logo.png);
            width: 60px;
            height: 50px;
            position: absolute;
            background-size: cover;
            z-index: 1;
            top: calc(50% - 25px);
            left: calc(50% - 30px);
        }
    }

    .is-rounded .image {
        border-radius: 10px;
    }
</style>
