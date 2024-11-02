<template>
    <div class="w-full min-h-screen flex flex-col items-center">
        <notifications-bar class="fixed top-0 z-40"></notifications-bar>
        <div class="bg-maroon-theme w-full h-[85dvh] bg- flex flex-col items-center pt-40 px-6 gap-3 pb-20 overflow-y-auto">
            <basic-toaster :seen="notif.seen" v-for="notif in notifData" :type="notif.type" :key="notif._id" @click.once="seen(notif._id); notif.seen = true;">
                <template #likeComment v-if="notif.type === 'comment' || notif.type === 'like'">
                <strong>{{  notif.userId.fullName }}</strong> {{ notif.type === 'like' ? 'liked' : 'commented on' }} your post!
                </template>
                <template #friend v-if="notif.type === 'friend'">
                <strong>{{  notif.userId.fullName }}</strong> send you a new friend request. <span class="text-xs text-blue-400 ms-2"><a class="cursor-pointer" @click="accept(notif._id, User.state.userData.id, notif.userId._id)">accept</a> / <a class="cursor-pointer" @click="decline(notif._id, User.state.userData.id, notif.userId._id);">decline</a></span>
                </template>
                <template #friend-accept v-if="notif.type === 'accept'"><strong>{{ notif.userId.fullName }}</strong> accepted your friend request.</template>
                <template #date>{{ Post.timeAgo(new Date(notif.createdAt)) === 'just now' ? 'now' : Post.timeAgo(new Date(notif.createdAt)) }}</template>
            </basic-toaster>
            <p class="text-white text-2xl font-Sniglet my-auto" v-if="notifData?.length === 0">You have no notifications.</p>
        </div>
    </div>
</template>


<script setup>
    import NotificationsBar from '../navigation/NotificationsBar.vue';
    import BasicToaster from '../indicators/BasicToaster.vue';
    import { computed } from 'vue';
    import { useUser } from '@/stores/auth';
    import { usePost } from '@/stores/post';
    import { socket } from '@/socket';
    import { useRouter } from 'vue-router';
    import { useState } from '@/stores/state';
    const router = useRouter();
    const User = useUser();
    const Post = usePost();
    const State = useState();
    const notifData = computed(() => {
        if(User.state.userData.id) return User.notifications.all
    })

    const seen = async(id) => {
        await User.markNotif(id);
    }

    const accept = async(notifId, userId, friendId) => {
        socket.emit('accept friend', {notifId, userId, friendId});
        State.showMessageToast(true, 'Friend request accepted')
        router.replace('/');
    };
    const decline = async(notifId, userId, friendId) => {
        socket.emit('decline friend', {notifId, userId, friendId});
        const index = notifData.value.findIndex(notif => notif._id === notifId);
        notifData.value.splice(index, 1);
        State.showMessageToast(false, 'Friend request declined')
    };
</script>
