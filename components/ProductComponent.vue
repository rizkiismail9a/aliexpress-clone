<template>
  <div :id="`Product${product.id}`" class="bg-white inline-block rounded hover:shadow-[0_0_10px_3px_rgba(0,0,0,0.15)] cursor-pointer">
    <NuxtLink :to="`/item/${product.id}`">
      <img :src="product.imageLink" alt="" class="rounded-t w-full object-cover" />
      <div id="ProductDetails" class="flex flex-col">
        <span class="flex flex-col items-start justify-start px-1 pt-1">
          <span class="text-[#ff6674] font-semibold">{{ priceAfterDisc }}</span>
          <span class="text-gray-500 text-light text-sm line-through">{{ price }}</span>
        </span>
        <span class="px-1 realtive -top-1.5 text-[#ff6674] tex-xs font-semibold">Extra 50%</span>
        <div class="flex items-center gap-1 px-1 relative -top-1">
          <span class="bg-[#fd274f] text-white text-[9px] font-semibold px-1.5 rounded-sm">Welcome deal</span>
          <span class="bg-[#f5f5f5] border text-[#c08562] text-[9px] font-semibold px-1.5 rounded-sm">Top Selling</span>
        </div>
        <p class="flex items-center px-1 pt-0.5 text-xs text-[#252525]">5000+ sold <Icon name="material-symbols:star-rate" color="#757575" class="ml-1.5" /> 4.7</p>
        <p class="px-1 pt-0.5 text-xs text-[#252525]">
          {{ product.title.substring(0.6) }}
        </p>
        <p class="px-1 pb-1">
          <span class="text-[#009a66] text-xs font-semibold">Free Shipping</span>
        </p>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({ product: { type: Object } });
const { product } = toRefs(props);
const price = computed(() => {
  // return product.value.price;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(product.value.price);
});
const priceAfterDisc = computed(() => {
  let res = product.value.price - product.value.price * 0.2;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(res);
  // return res.toFixed(2);
});
</script>
