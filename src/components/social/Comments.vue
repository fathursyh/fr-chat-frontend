<template>
    <div>
        <form action="" class="bg-green-400 flex w-screen" @submit.prevent="emits('addComment', comment); comment = ''">
                <input v-model="comment" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 focus:ring-green-500 focus:border-green-500 block w-full py-2.5 px-4" placeholder="Enter your comment . .">
                <button class="bg-blue-600 py-2 px-8 font-bold text-white">submit</button>
        </form>
    </div>
    <div class="max-h-fit w-screen min-h-fit divide-y border-b-2" v-for="comment in commentList" :key="comment._id">
        <div class="min-h-20 grid grid-cols-9 font-Poppins text-sm">
            <div class="col-span-2 flex flex-col justify-start items-center p-2 bg-white">
                <img :src="comment.userId.profilePicture? User.readPP(comment.userId.profilePicture) : '/person.jpg'" alt="" class=" w-auto h-14 rounded-full">
            </div>
            <div class="col-span-7 bg-white text-pretty flex flex-col py-2 ps-2 pe-6">
                <p class="text-blue-500 break-words text-xs text-wrap opacity-90">@{{ comment.userId.username }}</p>
                <p v-html="comment.comment.replace(/\n/g, '<br>')" class="text-gray-600"></p>
                <p class="block mt-auto text-blue-500 text-[0.8rem] text-right">{{ Post.timeAgo(new Date(comment.commentDate)) }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useUser } from "@/stores/auth";
import { usePost } from "@/stores/post"
    import { computed, ref } from "vue";
    const Post = usePost();
    const User = useUser();
    const props = defineProps({
        comments: {type: Array, },
        cek : {type: Number}
    })
    const commentList = computed(()=>props.comments)

    const comment = ref();

    const emits = defineEmits(['addComment']);

</script>