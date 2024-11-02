<template>
  <div
    class="pt- h-full w-screen bg-black/50 fixed z-50 flex justify-center items-center"
    v-if="State.state.postMenu"
  >
    <div
      class="bg-transparent w-full absolute h-full"
      @click="
        State.state.postMenu = false;
        State.state.postMenuId = '';
      "
    ></div>
    <div
      class="w-48 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white scale-125 relatve"
    >
      <button
        @click="like"
        :disabled="State.state.postMenuLike"
        type="button"
        class="relative inline-flex items-center w-full px-4 py-4 text-sm font-medium border-b border-gray-200 rounded-t-lg hover:bg-gray-200 text-pink-500"
      >
        <svg
          class="w-3 h-3 me-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z"
          />
        </svg>

        Like
      </button>
      <button
        v-if="State.state.postMenuBelong === User.state.userData.id && State.state.postMenuEdit"
        @click="edit(State.alert.addModal.body)"
        type="button"
        class="relative inline-flex items-center w-full px-4 py-4 text-sm font-medium border-b border-gray-200 rounded-t-lg hover:bg-gray-200 text-green-600"
      >
        <svg
          class="w-3 h-3 me-2.5"
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

        Edit
      </button>
      <button
        v-if="State.state.postMenuBelong === User.state.userData.id"
        @click="
          State.state.deleteConfirm = true;
          State.state.postMenu = false;
        "
        type="button"
        class="relative inline-flex items-center w-full px-4 py-4 text-sm font-medium border-b border-gray-200 rounded-t-lg hover:bg-gray-200 text-red-500"
      >
        <svg
          class="w-3 h-3 me-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fill-rule="evenodd"
            d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
            clip-rule="evenodd"
          />
        </svg>

        Delete
      </button>
      <button
        @click="State.state.postMenu = false"
        type="button"
        class="relative inline-flex items-center w-full px-4 py-4 text-sm font-medium border-b border-gray-200 hover:bg-gray-200 text-blue-500"
      >
        <svg
          class="w-3 h-3 me-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M13.09 3.294c1.924.95 3.422 1.69 5.472.692a1 1 0 0 1 1.438.9v9.54a1 1 0 0 1-.562.9c-2.981 1.45-5.382.24-7.25-.701a38.739 38.739 0 0 0-.622-.31c-1.033-.497-1.887-.812-2.756-.77-.76.036-1.672.357-2.81 1.396V21a1 1 0 1 1-2 0V4.971a1 1 0 0 1 .297-.71c1.522-1.506 2.967-2.185 4.417-2.255 1.407-.068 2.653.453 3.72.967.225.108.443.216.655.32Z"
          />
        </svg>

        Report
      </button>
    </div>
  </div>
</template>

<script setup>
import { useUser } from "@/stores/auth";
import { usePost } from "@/stores/post";
import { useState } from "@/stores/state";

const User = useUser();
const State = useState();
const Post = usePost();
const like = async () => {
  await Post.likePost(User.state.userData.id, State.state.postMenuId);
  State.state.postMenuId = "";
  State.state.postMenu = false;
};

const edit = (body) =>{
  State.alert.addModal.pop = true;
  State.alert.addModal.edit = true;
  State.state.postMenu = false;
  State.alert.addModal.body = body;
}

</script>
