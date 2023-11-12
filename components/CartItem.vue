<template>
  <div class="flex justify-start my-2">
    <div class="my-auto">
      <div @mouseenter="isHover = true" @mouseleave="isHover = false" class="flex items-center justify-start p-0.5 cursor-pointer">
        <div @click="isSelected = !isSelected" class="flex items-center justify-center h-[20px] w-[20px] rounded-full border mr-5 ml-2" :class="[isHover ? 'border-[#fd374f]' : 'border-gray-300', isSelected ? 'bg-[#FD374F]' : '']">
          <div class="h-[8px] w-[8px] rounded-full bg-white"></div>
        </div>
      </div>
    </div>
    <img :src="product.imageLink" class="rounded-md md:w-[150px] w-[90px]" />
    <div class="overflow-hidden pl-2 w-full">
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center justify-between truncate">
          <span class="sm:block hidden bg-[#fd374f] text-white text-[9px] font-semibold px-1.5 rounded-sm min-w-[80px] text-center">Welcome Deal</span>
          <div class="truncate sm:pl-2">{{ product.title }}</div>
        </div>
        <button @click="removeFromCart()" class="mx-3 sm:block hidden -mt-0.5 hover:text-red-500">
          <Icon name="material-symbols:delete-outline" size="20"></Icon>
        </button>
      </div>
      <div class="text-xl font-semibold">
        <span class="font-bold">{{ new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(product.price) }}</span>
      </div>
      <p class="text-[#009a66] text-xs font-semibold pt-1">Free 11-days delivery over Rp 100.000,00</p>
      <p class="text-[#009a66] text-xs font-semibold pt-1">Free Shipping</p>
      <div class="flex justify-end items-center">
        <button @click="removeFromCart()" class="block sm:hidden -mt-0.5 hover:text-red-500">
          <Icon name="material-symbols:delete-outline" size="20"></Icon>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "~/store/user";

const props = defineProps(["product", "selectedArray"]);
const userStore = useUserStore();
const { product, selectedArray } = toRefs(props);
const emit = defineEmits(["selectedRadio"]);
let isHover = ref(false);
let isSelected = ref(false);
function removeFromCart() {
  userStore.cart.forEach((item, index) => {
    if (item.id === product.value.id) {
      userStore.cart.splice(index, 1);
    }
  });
}
watch(
  () => {
    isSelected.value;
  },
  (val) => {
    emit("selectedRadio", { id: product.value.id, val });
  }
);
</script>
