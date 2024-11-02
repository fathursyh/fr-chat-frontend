<template>
  <section class="min-h-screen max-h-max bg-maroon-theme py-6">
    <div v-if="render"
      class="bg-maroon-theme flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 min-h-screen h-fit"
    >
      <router-link
        to="/"
        class="flex items-center gap-2 mb-6 text-2xl font-semibold text-white font-Sniglet"
      >
        <svg
          class="w-7 h-7 text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fill-rule="evenodd"
            d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z"
            clip-rule="evenodd"
          />
        </svg>

        FR-Chat
      </router-link>
      <div
        class="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700"
        style="background-color: rgba(255, 255, 255, 0.851)"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
            v-if="!registerProcess.isLoading"
          >
            {{
              registerProcess.success ? "Check your email" : "Create an account"
            }}
          </h1>
          <spinning v-if="registerProcess.isLoading"></spinning>
          <h2 class="text-black font-Poppins" v-if="registerProcess.success">
            Registration successful! Please check your email (<strong>{{
              userData.email
            }}</strong
            >) to confirm.
          </h2>
          <form
            class="space-y-4 md:space-y-6"
            @submit.prevent="register"
            v-if="registerProcess.form"
            id="registerForm"
          >
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Your email</label
              >
              <input
                v-model="userData.email"
                type="email"
                name="email"
                ref="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@email.com"
                required
                @blur="checkEmail(userData.email)"
                @input="
                  validations.email = true;
                  validations.checked = false;
                "
                :class="{
                  'border-red-500': !validations.email,
                  'border-green-500': validations.email && validations.checked,
                }"
              />
              <p
                :class="validations.email ? 'text-green-500' : 'text-red-600'"
                class="text-sm mt-1"
                :hidden="!validations.checked"
              >
                {{
                  validations.email
                    ? "Email is available"
                    : "Email has been taken"
                }}
              </p>
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Password</label
              >
              <input
                v-model="userData.password"
                type="password"
                name="password"
                id="password"
                placeholder="your password"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                :class="{
                  'border-red-500': !validations.password,
                }"
                @input="validations.password = true"
              />
              <p
                class="text-red-600 text-sm mt-1"
                :hidden="validations.password"
              >
                Password must be at least 8 characters.
              </p>
            </div>
            <div>
              <label
                for="confirm-password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Confirm password.</label
              >
              <input
                v-model="userData.confirmPassword"
                type="password"
                name="confirm-password"
                id="confirm-password"
                placeholder="confirm your password"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                :class="{
                  'border-red-500': !validations.confirmPassword,
                }"
                @input="validations.confirmPassword = true"
              />
              <p
                class="text-red-600 text-sm mt-1"
                :hidden="validations.confirmPassword"
              >
                Confirm password does not match the password
              </p>
            </div>
            <div>
              <label
                for="username"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Username</label
              >
              <input
                v-model="userData.username"
                type="text"
                name="username"
                id="username"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Dwight_Schrute"
                required
                @blur="checkUsername(userData.username)"
                @input="
                  validations.username = true;
                  validations.checked = false;
                "
                :class="{
                  'border-red-500': !validations.username,
                  'border-green-500': validations.username && validations.checked,
                }"
              />
              <p
                :class="validations.username ? 'text-green-500' : 'text-red-600'"
                class="text-sm mt-1"
                :hidden="!validations.checked"
              >
                {{
                  validations.username
                    ? "Username is available"
                    : "Username has been taken"
                }}
              </p>
            </div>
            <div>
              <label
                for="bio"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Bio</label
              >
              <textarea
                v-model="userData.bio"
                id="bio"
                rows="4"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Tell me about yourself"
              ></textarea>
            </div>
            <div class="flex items-start">
              <div class="flex items-center h-5 ml-2">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  required
                  :checked="agree"
                />
              </div>
              <div class="ml-2 text-sm">
                <label for="terms" class="font-light text-gray-700"
                  >I accept the
                  <a class="font-medium text-blue-500 hover:underline cursor-pointer"
                    @click="render = false;"  
                  >Terms and Conditions</a
                  ></label
                >
              </div>
            </div>
            <div class="flex flex-col gap-2 items-center">
              <button
                type="submit"
                class="w-1/2 text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Register
              </button>
              <h6 class="text-sm font-light text-gray-700">
                Already have an account?
                <router-link
                  to="/login"
                  class="font-medium text-blue-600 hover:underline"
                  >Login here</router-link
                >
              </h6>
            </div>
          </form>
        </div>
      </div>
    </div>
    <transition name="fade-up" mode="in-out" >
      <tos-page v-if="!render" @close-tos="closePage"></tos-page>
    </transition>
  </section>
</template>

<script setup>
  import TosPage from '../pages/TosPage.vue'
  import Spinning from "../indicators/Spinning.vue";
  import { useUser } from "@/stores/auth";
  import { nextTick, reactive, ref } from "vue";
import { useState } from '@/stores/state';
  const render = ref(true);
  const agree = ref(false);
  const email = ref(null);
  const closePage = () => {
    render.value = true;
    setTimeout(() => {
      agree.value = true;
    }, 300);
  };
  // nextTick(() => {
  //   setTimeout(() => {
  //     email.value.focus();
  //   }, 2000);
  // });

  const registerProcess = reactive({
    form: true,
    isLoading: false,
    success: false,
  });

  const userData = reactive({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    bio: "",
  });

  const validations = reactive({
    checked: false,
    email: true,
    username: true,
    password: true,
    confirmPassword: true,
  });

  const Auth = useUser();
  const State = useState();

  const checkEmail = async (email) => {
    if (userData.email === "") {
      validations.checked = false;
      return false;
    }
    const taken = await Auth.checkEmail(email);
    taken ? (validations.email = false) : (validations.email = true);
    validations.checked = true;
  };

  const checkUsername = async (username) => {
    if (userData.username === "") {
      validations.checked = false;
      return false;
    }
    const taken = await Auth.checkUsername(username);
    taken ? (validations.username = false) : (validations.username = true);
    validations.checked = true;
  };

  const register = async () => {
    if (validations.email === false) return null;
    if (userData.password.length < 8) {
      validations.password = false;
    } else if (userData.password !== userData.confirmPassword) {
      validations.confirmPassword = false;
    } else {
      registerProcess.form = false;
      registerProcess.isLoading = true;
      const register = await Auth.getUserRegister(userData);
      if (register) {
        registerProcess.isLoading = false;
        registerProcess.success = true;
      } else {
        registerProcess.isLoading = false;
        registerProcess.form = true;
        State.showDanger('Register failed', 'there might be a problem with your registration. Please try again later.');
      }
    }
  };
</script>

<style>
  #registerForm p {
    margin-left: 0.4rem;
  }

</style>