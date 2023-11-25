<template>
  <MainLayout>
    <div id="ShoppingCartPage" class="mt-4 max-w-[1200px] mx-auto px-2">
      <div v-if="!userStore.cart.length" class="h-[500px] flex items-center justify-center">
        <div class="pt-20">
          <img src="/images/cart-empty.webp" alt="" class="mx-auto" width="250" />
          <div class="text-xl text-center mt-4">No items yet?</div>
          <div v-if="!user" class="flex text-center">
            <NuxtLink to="/auth" class="bg-[#fd374f] w-full text-white text-[21px] font-semibold p-1.5 rounded-full mt-4">Sign in</NuxtLink>
          </div>
        </div>
      </div>
      <div v-else class="md:flex gap-4 justify-between mx-auto w-full">
        <div class="md:w-[65%]">
          <div class="bg-white rounded-lg p-4">
            <div class="text-2xl font-bold mb-2">Shopping Cart ({{ userStore.cart.length }})</div>
          </div>
          <div class="bg-[#feeeef] rounded-lg p-4 mt-4">
            <div class="text-red-500 font-bold">Welcome Deal applicable on 1 item only</div>
          </div>
          <div id="Items" class="bg-white rounded-lg p-4 mt-4">
            <div v-for="item in userStore.cart">
              <CartItem :product="item" :selectedArray="selectedArray" @selectedRadio="selectedRadioFunc" />
            </div>
          </div>
        </div>
        <div class="md:hidden block my-4"></div>
        <div class="md:w-[35%]">
          <div id="CartSummary" class="bg-white rounded-lg p-4">
            <div class="text-2xl font-bold mb-2">Summary</div>
            <div class="flex items-center justify-between my-4">
              <div class="font-semibold">Total</div>
              <div class="text-2xl font-semibold">
                <span>{{ Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(totalPriceComputed) }}</span>
              </div>
            </div>
            <button class="flex items-center justify-center bg-[#fd374f] w-full text-white text-[21px] font-semibold p-1.5 rounded-full mt-4" @click="goToCheckout">Checkout</button>
          </div>
          <div id="PaymentProtection" class="bg-white rounded-lg p-4 mt-4">
            <div class="text-lg font-semibold mb-2">Payment methods</div>
            <div class="flex items-center justify-start gap-8 my-4">
              <div v-for="card in cards">
                <img :src="'/images/' + card" class="h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from "~/layouts/MainLayout.vue";
import { useUserStore } from "~/store/user";
useHead({
  title: "User Cart | Aliexpress",
});
const userStore = useUserStore();
const user = useSupabaseUser();
let selectedArray = ref([]);
onMounted(() => {
  setTimeout(() => (userStore.isLoading = false), 200);
});

const cards = ["visa.png", "mastercard.png", "paypal.png", "applepay.png"];
const totalPriceComputed = computed(() => {
  let price = 0;
  userStore.cart.forEach((item) => (price += item.price));
  return price;
});
function selectedRadioFunc(e) {
  if (!selectedArray.value.length) {
    selectedArray.value.push(e);
  } else {
    selectedArray.value.forEach((item, index) => {
      if (e.id !== item.id) {
        selectedArray.value.push(e);
      } else {
        selectedArray.value.splice(index, 1);
      }
    });
  }
}
function goToCheckout() {
  let productIds = [];
  userStore.checkout = [];
  selectedArray.value.forEach((item) => productIds.push(item.id));
  let result = userStore.cart.filter((item) => productIds.indexOf(item.id) !== -1);
  // toRaw ini akan membuat object tidak lagi dalam bentuk proxy. Kalau di console.log suka ada proxy, target, dll. Kalau pakai raw, bisa langsung object-nya
  result.forEach((item) => userStore.checkout.push(toRaw(item)));
  return navigateTo("/checkout");
}
</script>
