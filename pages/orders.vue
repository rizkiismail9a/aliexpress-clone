<template>
  <MainLayout>
    <div id="OrdersPage" class="mt-4 max-w-[1200px] mx-auto px-2 min-h-[50vh]">
      <div class="bg-white w-full min-h-[150px] p-6">
        <div class="flex items-center text-xl">
          <Icon name="carbon:delivery" color="#5fcb04" size="35"></Icon>
          <span class="pl-4">Orders</span>
        </div>
        <div v-if="orders && orders.data" v-for="order in orders.data" class="text-sm pl-[50px]">
          <p>Stripe ID: {{ order.stripeId }}</p>
          <div class="pt-2"></div>
          <div v-for="item in order.orderItem">
            <NuxtLink :to="`/item/${item.productId}`" class="flex items-center gap-3 p-1 hover:underline hover:text-blue-500">
              <img :src="item.product.imageLink" width="40" alt="" />
              {{ item.product.name }}
            </NuxtLink>
          </div>
          <div class="pt-2 pb-5">Delivery Address: {{ order.name }} {{ order.address }} {{ order.zipcode }} {{ order.city }} {{ order.country }}</div>
        </div>
        <div v-else>You have no order history</div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from "~/layouts/MainLayout.vue";
import { useUserStore } from "~/store/user";
useHead({
  title: "My Orders | Aliexpress",
});
const userStore = useUserStore();
const user = useSupabaseUser();
let orders = ref(null);
onBeforeMount(async () => {
  orders.value = await useFetch(`/api/prisma/get-all-orders-by-user/${user.value.id}`);
  console.log(orders.value);
});
onMounted(() => {
  if (!user.value) {
    navigateTo("/auth");
  }
  setTimeout(() => {
    userStore.isLoading = false;
  }, 200);
});
</script>
