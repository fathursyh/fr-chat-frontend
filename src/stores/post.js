import axios from "axios";
import { defineStore } from "pinia";
import { reactive } from "vue";
import { useState } from "./state";
import { useUser } from "./auth";
import { socket } from "@/socket";


const serverURL = 'https://fathursyh.my.id';
export const usePost = defineStore('post', () => {
    const User = useUser();
    const State = useState();
    const posts = reactive({
        feedPosts: [],
        allPosts: [],
        feedLoad: false,
        exploreLoad: false,
        profileLoad: false,
        profilePosts: [],
    })
    const addNewPost = async(id, body) => {
        try {
            const result = await axios.post(`${serverURL}/api/posts/post`, {
                id: id,
                body: body
            }, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
            updated();

            return result.status == 200 ? 'ok' : 'failed';
        } catch (err) {console.error(err)};
    }
    /*--------------------- FETCHING POSTS ------------------------*/
    const getAllPosts = async() => {
      try {
        const fetch = await axios.get(`${serverURL}/api/posts/getAll`);
        posts.allPosts = fetch.data;
      } catch(err) {console.error(err)}
      finally {
        posts.exploreLoad = true;
      }
    };
    const getFeedPosts = async(userId) => {
      try {
        const fetch = await axios.get(`${serverURL}/api/posts/feed/${userId}`);
        posts.feedPosts = fetch.data;
      } catch(err) {console.error(err)}
      finally {
        posts.feedLoad = true;
      }
    };
    const getPostFromUserId = async(userId) => {
        try {
            const result = await axios.get(`${serverURL}/api/posts/post/${userId}`);
            posts.profilePosts = result.data;
          } catch (e) {
            return null;
          } finally {
            posts.profileLoad = true;
          }
    };
    const getPostFromUsername = async(username) => {
        try {
            const result = await axios.get(`${serverURL}/api/posts/username`, {params: {username : username}});
            return result.data;
        } catch (e) {
            return null;
        }
    };
    const getPostDetail = async(id) => {
        try {
        const result = await axios.get(`${serverURL}/api/posts/post`, {params: {id}});
        if(result.status == 200) {return result.data};
        } catch (e) {console.error(e)};
    }
    /*--------------------- END OF FETCHING ------------------------*/

    /*------------------ LIKE AND COMMENT ----------------------- */
    const likePost = async(userId, postId) => {
      try {
        await axios.post(`${serverURL}/api/posts/likePost`, {
          userId: userId,
          postId: postId,
        }, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        .then((res)=>{
          if(res.status == 200) {
            State.showMessageToast(true, 'Post liked.'); 
            updated();
          } else {
            State.showMessageToast(false, 'Like failed.'); 
          }
        });
      } catch (e) {State.showMessageToast(false, 'Like failed.');};
    };

    const addComment = async(userId, postId, comment) => {
      try {
        await axios.post(`${serverURL}/api/posts/addComment`, {
          userId : userId,
          postId : postId,
          comment: comment,
        }, {headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
        .then((res)=>{
          res.status = 200? 
          State.showMessageToast(true, 'Comment added.')
          : State.showMessageToast(false, 'Comment failed.')
        });
      } catch (e) {console.error(e)} 
      finally {
        updated();
      }
    };

     /*------------------ EDIT DELETE ----------------------- */

    const editPost = async(postId, text) => {
      try {
        const editPost = await axios.patch(`${serverURL}/api/posts/editPost`, {
          postId: postId, post: text
        }, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
        if(editPost.status === 200) {
          updated();
          return true;
        } else {
          return false;
        }
          
      } catch (e) {console.error(e)}
    }

    const deletePost = async(postId) => {
      try{
        const removePost = await axios.delete(`${serverURL}/api/posts/deletePost`, {params: {postId: postId || State.state.postMenuId}});
        if(removePost.status === 200) {
          updated();
          State.state.postMenuId = '';
          State.showMessageToast(true, 'Post deleted successfuly.');
          return true
        } else {
          State.showMessageToast(false, 'Failed to delete post.');
          return false;
        }
      } catch(e) {
        return false;
      }
    }

    /*------------------ TIME FUNCTION ----------------------- */
    const updated = () => {
      posts.feedLoad = false;
      posts.exploreLoad = false;
      posts.profileLoad = false;
    }
  const timeAgo = (date) => {
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);
    
        let interval = Math.floor(seconds / 31536000);
        if (interval >= 1)
          return interval + "y"
    
        interval = Math.floor(seconds / 2592000);
        if (interval >= 1)
          return interval + "M"
    
        interval = Math.floor(seconds / 86400);
        if (interval >= 1)
          return interval + "d"
    
        interval = Math.floor(seconds / 3600);
        if (interval >= 1)
          return interval + "h"
    
        interval = Math.floor(seconds / 60);
        if (interval >= 1)
          return interval + "m"
    
        return "just now";
      };
      socket.on('new notif', () => {
        updated();
      })
    return {posts, getAllPosts, getFeedPosts, getPostFromUserId, getPostFromUsername, getPostDetail, addNewPost, likePost, addComment, editPost, deletePost, timeAgo, updated}
});