import cookieUniversal from 'cookie-universal'

export default ({ req, res }, inject) => {
  const options = {
  "alias": "ck",
  "parseJSON": true
}
  inject(options.alias, cookieUniversal(req, res, options.parseJSON))
}
