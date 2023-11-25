<template>
  <div id="AuthPage" class="w-full h-[100vh] bg-white">
    <div class="w-full flex items-center justify-center p-5 border-b border-b-gray-300">
      <NuxtLink to="/" class="min-w-[170px]">
        <img src="/images/AliExpress-logo.png" width="170" />
      </NuxtLink>
    </div>
    <div class="max-w-[400px] mx-auto px-2">
      <div class="text-center my-6">Login / Register</div>
      <button @click="login('google')" class="flex items-center justify-center p-1.5 gap-3 w-full border hover:bg-gray-100 rounded-full text-lg font-semibold">
        <img src="/images/google-logo.png" alt="" class="w-full max-w-[30px]" />
        <div>Google</div>
      </button>
      <button @click="login('github')" class="mt-4 flex items-center justify-center p-1.5 gap-3 w-full border hover:bg-gray-100 rounded-full text-lg font-semibold">
        <img src="/images/github-logo.png" alt="" class="w-full max-w-[30px]" />
        <div>Github</div>
      </button>
    </div>
    {{ user }}
  </div>
</template>

<script setup>
const client = useSupabaseClient();
const user = useSupabaseUser();
useHead({
  title: "Sign In | Aliexpress",
});
watchEffect(() => {
  if (user.value) {
    return navigateTo("/");
  }
});

async function login(provider) {
  const { data, error } = await client.auth.signInWithOAuth({
    provider,
  });
  console.log(data);
}
</script>
