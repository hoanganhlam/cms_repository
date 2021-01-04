<template>
    <span class="icon">
        <svg :viewBox="`0 0 ${vb} ${vb}`">
            <path v-for="(path, i) in paths" :key="i" :d="path" :transform="transform"/>
        </svg>
    </span>
</template>

<script>
    import icons from './Icon.json';

    export default {
        name: 'AppIcon',
        props: {
            name: String
        },
        computed: {
            paths() {
                if (!Boolean(icons[this.name])) return []
                if (Array.isArray(icons[this.name])) {
                    return icons[this.name]
                } else {
                    return [typeof icons[this.name] === "string" ? icons[this.name] : icons[this.name].path]
                }
            },
            transform() {
                return typeof icons[this.name] === "object" ? icons[this.name].transform : undefined;
            },
            vb() {
                return 24
            }
        },
    };
</script>

<style lang="scss">
    .icon {
        svg {
            width: 1rem;
            height: 1rem;
        }

        &.is-medium {
            svg {
                width: 1.5rem;
                height: 1.5rem;
            }
        }

        &.is-small {
            svg {
                width: .75rem;
                height: .75rem;
            }
        }
    }
</style>
