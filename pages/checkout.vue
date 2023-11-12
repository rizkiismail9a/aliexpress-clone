<template>
  <MainLayout>
    <div id="CheckoutPage" class="mt-4 max-w-[1200px] mx-auto px-2">
      <div class="md:flex gap-4 justify-between mx-auto w-full">
        <div class="md:w-[65%]">
          <div class="bg-white rounded-lg p-4">
            <div class="text-xl font-semibold mb-2">Shipping Address</div>
            <div v-if="false">
              <NuxtLink to="/address" class="flex items-center pb-2 text-blue-500 hover:text-red-400">
                <Icon name="mdi:plus" size="18" class="mr-2" />
                Update Address
              </NuxtLink>
              <div class="pt-2 border-t">
                <div class="underline pb-1">Delivery Address</div>
                <ul class="text-xs">
                  <li class="flex items-center gap-2">
                    <div>Contact name:</div>
                    <div class="font-bold">currentAddress.data.name 👈 ini test doang</div>
                  </li>
                  <li class="flex items-center gap-2">
                    <div>Address:</div>
                    <div class="font-bold">currentAddress.data.address 👈 ini test doang</div>
                  </li>
                  <li class="flex items-center gap-2">
                    <div>Zip code:</div>
                    <div class="font-bold">ini test doang</div>
                  </li>
                  <li class="flex items-center gap-2">
                    <div>City:</div>
                    <div class="font-bold">ini test doang</div>
                  </li>
                  <li class="flex items-center gap-2">
                    <div>Country:</div>
                    <div class="font-bold">ini test doang</div>
                  </li>
                </ul>
              </div>
            </div>
            <NuxtLink v-else to="/address" class="flex items-center pb-2 text-blue-500 hover:text-red-400">
              <Icon name="mdi:plus" size="18" class="mr-2" />
              Add New Address
            </NuxtLink>
          </div>
          <div id="Items" class="bg-white rounded-lg p-4 mt-4">
            <div v-for="product in products">
              <CheckoutItem :product="product"></CheckoutItem>
            </div>
          </div>
        </div>
        <div class="md:hidden block my-4"></div>
        <div class="md:w-[35%]">
          <div id="placeOrder" class="bg-white rounded-lg p-4">
            <div class="text-2xl font-bold mb-2">Summary</div>
            <div class="flex items-center justify-between my-4">
              <div>Total Shipping</div>
              <div>Free</div>
            </div>
            <div class="border-t"></div>
            <div class="flex items-center justify-between my-4">
              <div class="font-semibold">Total</div>
              <div class="text-2xl font-semibold">
                <span class="font-bold">
                  {{ new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(total) }}
                </span>
              </div>
            </div>
            <form @submit.prevent="payment()">
              <div class="border border-gray-500 p-2 rounded-sm" id="card-element">untuk Card Element</div>
              <p id="card-error" role="alert" class="text-red-700 text-center font-semibold">Untuk pesan error</p>
              <button class="mt-4 bg-gradient-to-r from-[#fe630c] to-[#ff3200] w-full tetxt-white text-[21px] font-semibold p-1.5 rounded-full" type="submit" :disabled="isProcessing" :class="isProcessing ? 'opacity-70' : 'opacity-100'">
                <Icon v-if="isProcessing" name="eos-icons:loading" />
                <div v-else>Place order</div>
              </button>
            </form>
          </div>
          <div class="bg-white rounded-lg p-4 mt-4">
            <div class="font-semibold my-2 text-lg">AliExpress</div>
            <p class="my-2">AliExpress keeps your information and payment safe</p>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from "~/layouts/MainLayout.vue";
import { useUserStore } from "~/store/user";
const userStore = useUserStore();
const route = useRoute();

let stripe = null;
let elements = null;
let card = null;
let form = null;
let total = ref(0);
let clientSecret = null;
let currentAddress = ref(false);
let isProcessing = ref(false);

onMounted(() => {
  isProcessing.value = true;
  userStore.checkout.forEach((item) => (total.value += item.price));
  isProcessing.value = false;
});
const products = [
  {
    id: 1,
    title: "Ini judul1",
    description: "Ini deskripsi produk 1",
    imageLink: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2671&q=80",
    price: 20000000,
  },
  {
    id: 2,
    title: "Ini judul 2",
    description: "Ini deskripsi produk 2",
    imageLink: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2671&q=80",
    price: 20000000,
  },
  {
    id: 3,
    title: "Ini judul 3",
    description: "Ini deskripsi produk 3",
    imageLink: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2671&q=80",
    price: 20000000,
  },
];
watch(
  () => total.value,
  () => {
    if (total.value > 0) {
      stripeInit();
    }
  }
);
async function stripeInit() {}
async function payment() {}
async function createOrder(stripeId) {}
function showError(errorMsg) {}
</script>
