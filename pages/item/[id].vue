<template>
  <MainLayout>
    <div id="itemPage" class="mt-4 max-w-[1200px] mx-auto px-2">
      <div class="md:flex gap-4 justify-between mx-auto w-full">
        <div class="md:w-[40%]">
          <img :src="currentImage" class="rounded-lg object-cover h-[400px]" />
          <div v-if="slideImages[0] !== ''" class="flex items-center justify-center mt-2">
            <div v-for="image in slideImages">
              <img @mouseover="currentImage = image" @click="currentImage = image" width="70" class="rounded-md object-cover border-[3px] cursor-pointer h-full" :src="image" :class="currentImage === image ? 'border-[#ff5353]' : ''" />
            </div>
          </div>
        </div>
        <div class="md:w-[60%] bg-white p-3 rounded-lg">
          <div v-if="product && product.data">
            <p class="mb-2">{{ product.data.name }}</p>
            <p class="font-light text-[12px] mb-2">{{ product.data.description }}</p>
          </div>
          <div class="flex items-center pt-1.5">
            <span class="h-4 min-w-4 rounded-full p-0.5 bg-[#ffd000] mr-2">
              <Icon name="material-symbols:star-rounded" class="-mt-[17px]" size="12" />
            </span>
            <p class="text-[#ff5353]">Extra 5% off</p>
          </div>
          <div class="flex items-center justify-start my-2">
            <Icon name="material-symbols:star-rounded" color="#ff5353" />
            <Icon name="material-symbols:star-rounded" color="#ff5353" />
            <Icon name="material-symbols:star-rounded" color="#ff5353" />
            <Icon name="material-symbols:star-rounded" color="#ff5353" />
            <Icon name="material-symbols:star-rounded" color="#ff5353" />
            <span class="text-[13px] font-light ml-2"> 5123 Reviews; 1,000+ orders </span>
          </div>
          <div class="border-b"></div>
          <div class="flex items-center justify-start gap-2 my-2">
            <div class="text-xl font-bold">{{ new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(priceComputed) }}</div>
            <span class="bg-[#f5f5f5] border text-[#c08562] text-[9px] font-semibold px-1.5 rounded-sm">75% off</span>
          </div>
          <p class="text-[#009a66] text-xs font-semibold pt-1">Free 11-days delivery over Rp 100.000,00</p>
          <p class="text-[#009a66] text-xs font-semibold pt-1">Free Shipping</p>
          <div class="py-2"></div>
          <button @click="addToCart" class="px-6 py-2 rounded-lg text-white text-lg font-semibold bg-gradient-to-r from-[#ff851a] to-[#ffac2c]">
            <span v-if="isInCart">Is Added</span>
            <span v-else>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { onMounted, watchEffect, computed } from "vue";
import MainLayout from "../../layouts/MainLayout.vue";
import { useUserStore } from "~/store/user";
const user = useSupabaseUser();
const route = useRoute();
const userStore = useUserStore();
let currentImage = ref(null);
const product = ref(null);
onBeforeMount(async () => {
  product.value = await useFetch(`/api/prisma/get-product-by-id/${route.params.id}`);
});
watchEffect(() => {
  if (product.value && product.value.data) {
    currentImage.value = product.value.data.imageLink;
    slideImages.value[0] = product.value.data.imageLink;
    userStore.isLoading = false;
  }
});
const priceComputed = computed(() => {
  if (product.value && product.value.data) {
    return product.value.data.price;
  }
  return 0;
});
// onMounted(() => {
//   watchEffect(() => {
//     currentImage.value = "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2671&q=80";
//   });
// });
const slideImages = ref([
  "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2671&q=80",
  "https://images.unsplash.com/photo-1570784332176-fdd73da66f03?auto=format&fit=crop&q=80&w=2671&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1528113205084-1f6d08db49e7?auto=format&fit=crop&q=60&w=700&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y3VwfGVufDB8fDB8fHww",
  "https://images.unsplash.com/flagged/photo-1552938218-ac9ec40c702a?auto=format&fit=crop&q=60&w=700&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGN1cHxlbnwwfHwwfHx8MA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1668972393852-4c1adf9687c3?auto=format&fit=crop&q=60&w=700&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGN1cHxlbnwwfHwwfHx8MA%3D%3D",
]);
const isInCart = computed(() => {
  let result = false;
  userStore.cart.forEach((item) => {
    if (Number(route.params.id) === item.id) {
      result = true;
    }
  });
  return result;
});
function addToCart() {
  if (user) {
    userStore.cart.push(product.value.data);
  } else {
    navigateTo("/auth");
  }
}
</script>
