<template>
  <MainLayout>
    <div id="IndexPage" class="mt-4 max-w-[1200px] mx-auto px-2">
      <div class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
        <div v-if="products" v-for="item in products.data" :key="item">
          <ProductComponent :product="item"></ProductComponent>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { useUserStore } from "~/store/user";
import MainLayout from "../layouts/MainLayout.vue";
const user = useSupabaseUser();
useHead({
  title: "Home | Aliexpress",
});
// Ini cara pasang middleware
// definePageMeta({ middleware: "auth" });
const userStore = useUserStore();
const products = ref([]);
onBeforeMount(async () => {
  products.value = await useFetch(`/api/prisma/get-all-products`);
  setTimeout(() => (userStore.isLoading = false), 1000);
  console.log(user.value);
});
</script>
