<template>
  <div id="MainLayout" class="w-full fixed z-50">
    <div id="TopMenu" class="w-full bg-[#fafafa] border-b md:block hidden">
      <ul class="flex items-center justify-end text-xs text-[#333] font-light mx-auto px-2 h-10 bg-[#fafafa] max-w-[1200px]">
        <li
          class="flex items-center relative border-r h-full border-r-gray-400 px-3 hover:text-[#ff4646] cursor-pointer"
          @mouseenter="isAccountMenu2 = true"
          @mouseleave="isAccountMenu2 = false"
          :class="isAccountMenu2 ? 'bg-white border z-40 shadow-[0_15px_100px_40px_rgba(0,0,0,0.3)] ' : 'border border-[#FAFAFA]'"
        >
          <span>Sell on Aliexpress</span> <Icon name="icon-park-solid:down-one" size="13" color="grey"></Icon>
          <div v-if="isAccountMenu2" class="absolute w-[220px] text-[#333] top-[38px] bg-white -left-[94px] z-40">
            <spam>Halo</spam>
          </div>
        </li>
        <li class="px-3 hover:text-[#ff4646] cursor-pointer">Cookie Preferences</li>
        <li class="px-3 hover:text-[#ff4646] cursor-pointer">Help</li>
        <li class="px-3 hover:text-[#ff4646] cursor-pointer">Buyer Protection</li>
        <li class="border-r border-r-gray-400 px-3 hover:text-[#ff4646] cursor-pointer"><Icon name="material-symbols:install-mobile-sharp" size="17" /> App</li>
        <li class="px-3 hover:text-[#ff4646] cursor-pointer">
          <Icon name="tabler:heart-check" size="17" />
          Wish List
        </li>
        <li
          @mouseenter="isAccountMenu = true"
          @mouseleave="isAccountMenu = false"
          class="relative flex items-center px-2.5 hover:text-[#FF4646] h-full cursor-pointer"
          :class="isAccountMenu ? 'bg-white border z-40 shadow-[0_15px_100px_40px_rgba(0,0,0,0.3)]' : 'border border-[#FAFAFA]'"
        >
          <Icon name="ph:user-thin" size="17" />
          <span>Account</span>
          <Icon name="mdi:chevron-down" size="15" class="ml-5" />

          <div v-if="isAccountMenu" class="absolute bg-white w-[220px] text-[#333] z-40 top-[38px] -left-[105px] border-x border-b">
            <div v-if="!user">
              <div class="text-semibold text-[12px] my-4 px-3 text-center">Welcome to AliExpress</div>
              <div class="flex items-center gap-1 px-3 mb-3">
                <NuxtLink to="/auth" class="bg-[#ff4646] text-center w-full text-[16px] rounded-sm text-white font-semibold p-2 hover:bg-[#783838]"> Login / Register </NuxtLink>
              </div>
              <div class="border-b"></div>
            </div>
            <ul class="bg-white" v-if="user">
              <li @click="navigateTo('/orders')" class="text-[13px] py-2 px-4 w-full hover:bg-gray-200">My Orders</li>
              <li @click="client.auth.signOut()" class="text-[13px] py-2 px-4 w-full hover:bg-gray-200">Sign Out</li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <div id="MainHeader" class="flex items-center w-full bg-white">
      <div class="flex items-center ig:justify-start justify-between gap-10 w-full px-3 py-5 mx-auto max-w-[1200px]">
        <!-- Logo -->
        <NuxtLink to="/" class="min-w-[170px]">
          <img src="/images/AliExpress-logo.png" alt="logo toko" width="170" />
        </NuxtLink>
        <!-- SearchBar -->
        <div class="flex-1 w-full md:block hidden">
          <div class="relative">
            <!-- search form -->
            <div class="flex items-center rounded-md w-full border-2 border-[#ff4646]">
              <input type="text" class="w-full placeholder-gray-400 text-sm pl-3 focus:outline-none h-[30px] rounded-md" v-model="searchKeyword" placeholder="Search Item" @keyup="searchByName" />
              <!-- loading animation -->
              <Icon v-if="isSearching" name="eos-icons:loading" size="25" class="mr-2"></Icon>
              <button class="flex items-center bg-[#ff4646] h-full p-1.5 px-2">
                <Icon name="ph:magnifying-glass" size="20" color="#fff"></Icon>
              </button>
            </div>
            <!-- dropdown live search -->
            <div class="absolute bg-white h-auto w-full">
              <div v-if="items && items.data" v-for="item in items.data" class="p-1">
                <NuxtLink :to="`/item/${item.id}`">
                  <div class="flex item-centers justify-between">
                    <div class="flex-1 flex items-center">
                      <img :src="item.imageLink" alt="foto barang" class="w-[30px] h-[30px] object-cover rounded-sm" />
                      <div class="truncate ml-2">{{ item.name }}</div>
                    </div>
                    <div class="truncate font-bold">{{ new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(item.price) }}</div>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
        <!-- Cart -->
        <NuxtLink to="/cart" class="flex items-center" @mouseenter="isCartHovered = true" @mouseleave="isCartHovered = false">
          <button class="relative md:block hidden">
            <Icon name="fluent:cart-24-regular" size="33" :color="isCartHovered ? '#ff6464' : ''"></Icon>
            <span class="absolute bg-[#ff4646] text-white px-1 text-xs rounded -right-[4px]">{{ userStore.cart.length }}</span>
          </button>
        </NuxtLink>
        <!-- hamburger menu button -->
        <button @click="userStore.isMenuOverlay = true" class="md:hidden block rounded-full p-1.5 -mt-[4px] hover:bg-gray-200">
          <Icon name="mdi:hamburger-menu" size="33"></Icon>
        </button>
      </div>
    </div>
  </div>
  <Loading v-if="userStore.isLoading" />
  <div class="lg:pt-[150px] md:pt-[130px] pt-[80px]"></div>
  <slot></slot>
  <Footer v-if="!userStore.isLoading"></Footer>
</template>

<script setup>
import Footer from "~/components/Footer.vue";
import Loading from "../components/Loading.vue";
import { useUserStore } from "../store/user";
const userStore = useUserStore();
const user = useSupabaseUser();
const client = useSupabaseClient();
let isAccountMenu = ref(false);
let isAccountMenu2 = ref(false);
let searchKeyword = ref("");
let isSearching = ref(false);
let isCartHovered = ref(false);
let items = ref("");

async function searchByName() {
  try {
    if (searchKeyword.value) {
      isSearching.value = true;
      items.value = await useFetch(`/api/prisma/search-by-name/${searchKeyword.value}`);
      isSearching.value = false;
    } else {
      isSearching.value = false;
      items.value = "";
    }
  } catch (error) {
    console.log(error);
  }
}
</script>
