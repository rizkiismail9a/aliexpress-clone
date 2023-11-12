<template>
  <MainLayout>
    <div id="IndexPage" class="mt-4 max-w-[1200px] mx-auto px-2">
      <div class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
        <div v-if="products" v-for="item in products" :key="item">
          <ProductComponent :product="item"></ProductComponent>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from "../layouts/MainLayout.vue";
useHead({
  title: "Home | Aliexpress",
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
  {
    id: 4,
    title: "Ini judul 4",
    description: "Ini deskripsi produk 4",
    imageLink: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2671&q=80",
    price: 20000000,
  },
  {
    id: 5,
    title: "Ini judul 5",
    description: "Ini deskripsi produk 5",
    imageLink: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2671&q=80",
    price: 20000000,
  },
  {
    id: 1,
    title: "Ini judul",
    description: "Ini deskripsi produk",
    imageLink: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2671&q=80",
    price: 20000000,
  },
  {
    id: 6,
    title: "Ini judul 6",
    description: "Ini deskripsi produk 6",
    imageLink: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2671&q=80",
    price: 20000000,
  },
];
</script>
