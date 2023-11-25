export default defineNuxtRouteMiddleware((from, to, next) => {
  const user = useSupabaseUser();
  if (!user.value && to.fullPath === "/") {
    return navigateTo("/auth");
  }
});
