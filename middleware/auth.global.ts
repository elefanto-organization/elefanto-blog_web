export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client && !localStorage.getItem('token') && !to.path.includes('login')) {
    return navigateTo('/login')
  } 
})