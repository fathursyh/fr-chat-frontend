<template>
    <div aria-hidden="true" class="flex overflow-y-auto overflow-x-hidden absolute top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black/50" v-if="State.alert.welcome" @click="State.alert.welcome = false">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 min-w-[80%] max-w-[85%] py-4">
            <!-- Modal header -->
            <div class=" p-4 gap-4 border-b px-10 text-pretty">
                <h3 class="text-xl font-semibold mb-4">
                    Welcome home, <span class="text-blue-500">{{ Auth.state.userData.username }}</span>!
                </h3>
                <p>
                    Be sure to let your thoughts out, and never bottled up your very own emotions. Peace! ✌️😎
                </p>
            </div>
        </div>
</div>
</template>

<script setup>
    import { useUser } from '@/stores/auth';
    import { useState } from '@/stores/state';


    const Auth = useUser();
    const State = useState();

</script>