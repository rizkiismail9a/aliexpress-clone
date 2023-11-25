<template>
  <div class="flex justify-start my-2">
    <img :src="product.imageLink" class="rounded-md md:w-[150px] w-[90px]" />
    <div class="overflow-hidden pl-2">
      <div class="flex items-center">
        <span class="bg-[#fd374f] text-white text-center text-[9px] font-semibold px-1.5 rounded-sm min-w-[80px]">Welcome Deal</span>
        <div class="truncate sm:pl-2">{{ product.name }}</div>
      </div>
      <div class="text-lg font-semibold mt-2">
        <span class="font-bold">{{ new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(product.price) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["product", "selectedArray"]);
const { product } = toRefs(props);
</script>
