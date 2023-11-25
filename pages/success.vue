<template>
  <MainLayout>
    <div id="SuccessPage" class="mt-4 max-w-[1200px] mx-auto px-2 min-h-[50vh]">
      <div class="bg-white w-full min-h-[150px] p-6">
        <div class="flex items-center text-xl">
          <Icon name="clarity:success-standard-line" color="#5fcb04" size="35"></Icon>
          <span class="pl-4">Payment Successful</span>
        </div>
        <p class="text-sm pl-[50px]">Thank you! We've recieved your payment.</p>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from "~/layouts/MainLayout.vue";
import { useUserStore } from "~/store/user";
useHead({
  title: "Payment Successful | Aliexpress",
});
const userStore = useUserStore();
onMounted(() => {
  setTimeout(() => {
    userStore.isLoading = false;
  }, 300);
});
</script>
