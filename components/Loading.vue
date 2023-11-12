import { Loading } from '#build/components';
<template>
  <div class="loading-container fixed bg-black bg-opacity-40 inset-0 w-full z-40 flex items-center justify-center h-[100vh] overflow-hidden">
    <div class="loading-content p-3 rounded-md bg-black bg-opacity-20">
      <Icon name="line-md:loading-alt-loop" size="100" color="#fd374f"></Icon>
      <div class="text-center pt-5 text-xl font-bold text-white">Bentar, ya...</div>
    </div>
  </div>
</template>

<script setup></script>
