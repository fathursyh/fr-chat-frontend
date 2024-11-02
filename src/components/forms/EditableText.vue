<template>
  <p v-show="!edit" :class="style">
    {{ value }}
    <svg
      @click="toggleEdit"
      class="w-4 h-4 text-blue-600 dark:text-white inline absolute cursor-pointer ms-2"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        fill-rule="evenodd"
        d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z"
        clip-rule="evenodd"
      />
      <path
        fill-rule="evenodd"
        d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z"
        clip-rule="evenodd"
      />
    </svg>
  </p>

  <form @submit.prevent="editData" v-show="edit" class="flex justify-center max-h-max" @click="toggleEdit" >
    <input v-if="changes!='bio'"
      autocomplete="off"
      type="text"
      class="rounded-lg inline-block font-normal flex-1 border-0 bg-white py-1.5 px-5 w-full max-w-max text-gray-900 placeholder:text-gray-400 focus:ring-0 text-l sm:leading-6"
      v-model="text"
      ref="editForm"
      id="profileInput"
      placeholder="Your full name"
    />
    <textarea v-if="changes=='bio'"
      autocomplete="off"
      type="text"
      class="rounded-lg inline-block font-normal flex-1 border-0 bg-white py-1.5 px-5 w-full min-h-24 max-w-max text-gray-900 placeholder:text-gray-400 focus:ring-0 text-l sm:leading-6"
      v-model="text"
      ref="editForm"
      id="TextAreaProfile"
    ></textarea>
    <button
      class="rounded inline-block z-10 select-none bg-green-500 py-2.5 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none"
      type="submit"
      data-ripple-light="true"
    >
      <svg
        class="w-5 h-5 text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 11.917 9.724 16.5 19 7.5"
        />
      </svg>
    </button>

  </form>
</template>

<script setup>
  import { onMounted, ref } from "vue";
  const props = defineProps({
    style: { type: [String, Array] },
    value: { type: String, required: false },
    changes: { type: String, required: true}
  });

  const edit = ref(false);
  const text = ref('');
  const editForm = ref(null);

  const toggleEdit = () => {
    if(edit.value === false) props.value !== 'User Name' ? text.value = props.value : text.value = '';
    edit.value = !edit.value;
    setTimeout(()=>{
      editForm.value.focus();
    }, 200)
  };
  
  const emit = defineEmits(['submitForm']);
  const editData = () => {
    if(text.value !== props.value && props.value !== 'User Name') {
      confirm('Update changes?') ?
       emit('submitForm', text.value, props.changes) : false;
    }
  };
</script>
