<template>
  <div id="MenuOverlay" class="fixed z-50 h-full w-full bottom-0 bg-white px-3">
    <div class="flex items-center justify-between py-5">
      <NuxtLink to="/" @click="userStore.isMenuOverlay = false">
        <img src="/images/AliExpress-logo.png" width="170" />
      </NuxtLink>
      <button class="rounded-full p-1 hover:bg-gray-200" @click="userStore.isMenuOverlay = false">
        <Icon name="mdi:close" size="30"></Icon>
      </button>
    </div>
    <div class="flex items-center justify-between pt-5">
      <ul class="w-full">
        <li @click="goTo('orders')" class="relative flex items-center justify-between p-2.5 border-b px-3 hover:bg-gray-100 cursor-pointer">
          <div class="flex items-center text-[20px] font-semibold">
            <Icon name="ph:pen-light" size="33"></Icon>
            <span class="pl-4">My Orders</span>
          </div>
        </li>
        <li @click="goTo('cart')" class="relative flex items-center justify-between p-2.5 border-b px-3 hover:bg-gray-100 cursor-pointer">
          <div class="flex items-center text-[20px] font-semibold">
            <Icon name="ph:shopping-cart-simple-light" size="33"></Icon>
            <span class="pl-4">Cart</span>
          </div>
          <div class="flex items-center justify-center bg-[#ff4646] min-w-[35px] text-lg text-white rounded-full">
            {{ userStore.cart.length }}
          </div>
        </li>
        <li v-if="user" @click="signOut()" class="relative flex items-center justify-between p-2.5 border-b px-3 hover:bg-gray-100 cursor-pointer">
          <div class="flex items-center text-[20px] font-semibold">
            <Icon name="ph:sign-out-light" size="33"></Icon>
            <span class="pl-4">Sign out</span>
          </div>
        </li>
        <li v-else @click="signIn()" class="relative flex items-center justify-between p-2.5 border-b px-3 hover:bg-gray-100 cursor-pointer">
          <div class="flex items-center text-[20px] font-semibold">
            <Icon name="ph:sign-in-light" size="33"></Icon>
            <span class="pl-4">Sign in / Register</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "~/store/user";
const userStore = useUserStore();
const client = useSupabaseClient();
const user = useSupabaseUser();
function goTo(url) {
  userStore.isMenuOverlay = false;
  return navigateTo(`/${url}`);
}
function signOut() {
  client.auth.signOut();
  userStore.isMenuOverlay = false;
  return navigateTo("/");
}
function signIn() {
  userStore.isMenuOverlay = false;
  return navigateTo("/auth");
}
</script>
