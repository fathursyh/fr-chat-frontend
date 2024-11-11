<template>
  <section id="profileHeader">
    <div class="w-full h-56 max-h-full relative flex flex-col justify-center items-center">
    <!-- HEADER IMAGE -->
    <img src="@/assets/cat.jpg" alt="" class="h-full w-full object-cover" />
    <div class="absolute -bottom-16 w-full">
      <!-- PROFILE IMAGE -->
      <div class="relative w-32 mx-auto flex justify-center h-32">
        <img
          :src="Auth.state.userData.profilePicture? Auth.readPP(Auth.state.userData.profilePicture) : '/person.jpg'"
          alt=""
          class="ring-4 ring-green-500 object-cover w-full h-full rounded-full"
        />
        <div class="absolute w-10 h-10 bg-white rounded-full -bottom-4 grid place-content-center shadow-md active:bg-gray-400" @click="inputImage.click()">
          <form hidden id="imageForm" enctype="multipart/form-data" method="POST">
            <input type="file" ref="inputImage" @change="onFileChange" name="profilePicture" accept="image/png, image/gif, image/jpeg, image/jpg">
          </form>
          <svg
            class="w-8 h-8 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M7.5 4.586A2 2 0 0 1 8.914 4h6.172a2 2 0 0 1 1.414.586L17.914 6H19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h1.086L7.5 4.586ZM10 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm2-4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
  <div
    id="name-bio"
    class="pb-8 pt-20 w-full min-h-48 flex flex-col items-center gap-0.5 bg-maroon-theme text-white"
  >
    <editable-text
      :changes="'fullName'"
      @submit-form="edit"
      :style="`text-2xl font-Poppins font-bold w-full text-center`"
      :value="Auth.state.userData.fullname || 'User Name'"
    ></editable-text>
    <p class="font-Sniglet text-blue-500">
      <!-- @{{ Auth.state.userData.username }} -->
    </p>
    <div class="min-w-[20%] max-w-[60%] text-pretty text-center font-Poppins">
      <editable-text
        :style="'italic'"
        :value="Auth.state.userData.bio"
        @submit-form="edit"
        :changes="'bio'"
      ></editable-text>
    </div>
  </div>
  </section>
</template>

<script setup>
  import { reactive, ref } from "vue";
  import EditableText from "../forms/EditableText.vue";
  import { useUser } from "@/stores/auth";
import { useRouter } from "vue-router";

  const router = useRouter();
  const Auth = useUser();
  const edit = async (value, key) => {
    await Auth.editData(Auth.state.userData.email, value, key).then(
      alert("Data has been edited.")
    );
  };

  const inputImage = ref(null);
  // const checkImage = (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);

  //   reader.addEventListener("load", () => {
  //     // signupData.imageLink = reader.result;
  //   });
  // }

  const onFileChange = (event) => { 
    inputImage.value = event.target.files[0]; 
    const formData = new FormData();
    formData.append('profilePicture', inputImage.value);
    formData.append('userId', Auth.state.userData.id);
    uploadImage(formData)
  };

  const uploadImage = async(formdata) => {
    const uploading = await Auth.uploadPP(formdata);
    if(uploading) {
      router.go();
    }
  }
</script>
