export default function (context) {
    context.$axios.onError(async e => {})
    context.$axios.onRequest(config => {})
}
