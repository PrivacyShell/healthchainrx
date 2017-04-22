import _identities from './identities.json'

const TIMEOUT = 100

export default {
  getIdentityDetails: (cb, timeout) => setTimeout(() => cb(_identities), timeout || TIMEOUT),
}
