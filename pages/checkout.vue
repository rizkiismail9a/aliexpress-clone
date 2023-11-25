<template>
  <MainLayout>
    <div id="CheckoutPage" class="mt-4 max-w-[1200px] mx-auto px-2">
      <div class="md:flex gap-4 justify-between mx-auto w-full">
        <div class="md:w-[65%]">
          <div class="bg-white rounded-lg p-4">
            <div class="text-xl font-semibold mb-2">Shipping Address</div>
            <div v-if="currentAddress && currentAddress.data">
              <NuxtLink to="/address" class="flex items-center pb-2 text-blue-500 hover:text-red-400">
                <Icon name="mdi:plus" size="18" class="mr-2" />
                Update Address
              </NuxtLink>
              <div class="pt-2 border-t">
                <div class="underline pb-1">Delivery Address</div>
                <ul class="text-xs">
                  <li class="flex items-center gap-2">
                    <div>Contact name:</div>
                    <div class="font-bold">{{ currentAddress.data.name }}</div>
                  </li>
                  <li class="flex items-center gap-2">
                    <div>Address:</div>
                    <div class="font-bold">{{ currentAddress.data.address }}</div>
                  </li>
                  <li class="flex items-center gap-2">
                    <div>Zip code:</div>
                    <div class="font-bold">{{ currentAddress.data.zipcode }}</div>
                  </li>
                  <li class="flex items-center gap-2">
                    <div>City:</div>
                    <div class="font-bold">{{ currentAddress.data.city }}</div>
                  </li>
                  <li class="flex items-center gap-2">
                    <div>Country:</div>
                    <div class="font-bold">{{ currentAddress.data.country }}</div>
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
            <div v-for="product in userStore.checkout">
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
              <!-- di bawah ini untuk card element -->
              <div class="border border-gray-500 p-2 rounded-sm" id="card-element"></div>
              <!-- di bawah ini untuk pesan error  -->
              <p id="card-error" role="alert" class="text-red-700 text-center font-semibold"></p>
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
import { loadStripe } from "@stripe/stripe-js";
import MainLayout from "~/layouts/MainLayout.vue";
import { useUserStore } from "~/store/user";
useHead({
  title: "Cart Checkout | Aliexpress",
});
const userStore = useUserStore();
const user = useSupabaseUser();
const route = useRoute();
const runtimeConfig = useRuntimeConfig();
let stripe = null;
let elements = null;
let card = null;
let form = null;
let total = ref(0);
let clientSecret = ref("");
let currentAddress = ref(false);
let isProcessing = ref(false);
onBeforeMount(async () => {
  if (userStore.checkout.length < 1) {
    return navigateTo("/cart");
  }
  total.value = 0;
  if (user.value) {
    currentAddress.value = await useFetch(`/api/prisma/get-user-address/${user.value.id}`);
    setTimeout(() => (userStore.isLoading = false), 200);
  }
});
watchEffect(() => {
  if (route.fullPath === "/checkout" && !user.value) {
    return navigateTo("/auth");
  }
});
onMounted(async () => {
  isProcessing.value = true;

  userStore.checkout.forEach((item) => {
    total.value += item.price;
  });
});

watch(
  () => total.value,
  () => {
    if (total.value > 0) {
      stripeInit();
    }
  }
);

async function stripeInit() {
  try {
    const stripePK = runtimeConfig.public.stripePk;
    stripe = await loadStripe(`${stripePK}`);
    const result = await $fetch("/api/stripe/paymentIntent", {
      method: "POST",
      body: {
        amount: total.value,
      },
    });
    console.log(result);
    clientSecret.value = result.client_secret;
    elements = stripe.elements({
      clientSecret: clientSecret.value,
      loader: "auto",
    });
    let style = {
      base: {
        fontSize: "18px",
        fontFamily: "Arial, sans-serif",
      },
      invalid: {
        fontFamily: "Arial, sans-serif",
        color: "#EE4B2B",
        iconColor: "#EE4B2B",
      },
    };
    // card = elements.create("payment", {
    //   // hidePostalCode: true,
    //   // style: style,
    //   layout: "auto",
    // });
    // Invalid value for confirmCardPayment: payment_method.card was `payment` Element, which cannot be used to create card PaymentMethods.
    // Missing value for confirmCardPayment: payment_method.card should be an object or element.
    card = elements.create("payment", {
      style,
    }); // type payment, ada banyak, ada card, ada payment, ada cardCVC, dll
    // lihat https://stripe.com/docs/js/element/other_element
    card.mount("#card-element");

    card.on("change", function (event) {
      document.querySelector("button").disabled = event.empty;
      document.querySelector("#card-error").textContent = event.error ? event.error.message : "";
    });
    isProcessing.value = false;
  } catch (error) {
    console.log(error);
    isProcessing.value = false;
  }
}
async function payment() {
  if (!currentAddress.value.data) {
    showError("Please add shipping address");
    return;
  }
  isProcessing.value = true;
  try {
    // let res = await stripe.confirmCardPayment(clientSecret.value, {
    //   payment_method: { card: card, billing_details: { name: user.value.identities[0].identity_data.full_name } },
    // }); //ini untuk payment type card
    let res = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    console.log("ini hasil confrimPayment", res);
    await createOrder(res.paymentIntent.id);
    userStore.cart = [];
    userStore.checkout = [];
    return navigateTo("/success");
  } catch (error) {
    showError(error.message);
    isProcessing.value = false;
  }
}
async function createOrder(stripeId) {
  await useFetch("/api/prisma/create-order", {
    method: "POST",
    body: {
      userId: user.value.id,
      stripeId,
      name: currentAddress.value.data.name,
      address: currentAddress.value.data.address,
      zipcode: currentAddress.value.data.zipcode,
      city: currentAddress.value.data.city,
      country: currentAddress.value.data.country,
      products: userStore.checkout,
    },
  });
}
function showError(errorMsg) {
  let errorHTMLElement = document.getElementById("card-error");
  errorHTMLElement.textContent = errorMsg;
  // setTimeout(() => {
  //   errorHTMLElement.textContent = "";
  // }, 9000);
}
</script>
