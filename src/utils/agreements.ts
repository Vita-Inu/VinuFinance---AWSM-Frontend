const STORAGE_KEY = 'AGREEMENTS'
const STORAGE_VALUE = 'CONFIRMED'

export const confirmAgreements = () => {
  localStorage.setItem(STORAGE_KEY, STORAGE_VALUE)
}

export const agreementsConfirmed = () => {
  if(typeof window === 'undefined') return false

  const value = localStorage?.getItem(STORAGE_KEY)

  return value === STORAGE_VALUE
}