export const navigation = (currentPage) => [{ name: 'Home', href: '/', current: currentPage === 'Home' }]

export const userNavigation = () => [
  { name: 'Your Profile', function: () => {} },
  { name: 'Settings', function: () => {} },
  { name: 'Sign out', function: () => {} },
]

export default { navigation, userNavigation }
