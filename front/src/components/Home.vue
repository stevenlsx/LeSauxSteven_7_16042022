<template>

    <body>
        <Header />
        <section>
            <PostModel v-for="post in allPost" :key="post.id" :post="post" @delete="deletePost(post.id)">
            </PostModel>
        </section>
        <Footer />
    </body>
</template>


<script>
import Header from "../components/Header.vue"
import Footer from '../components/Footer.vue'
import PostModel from "../components/PostModel.vue"

import axios from "axios"

export default {
    name: "Home",
    components: {
        Header,
        Footer,
        PostModel,
    },
    data() {
        return {
            allPost: [],
        }
    },
    methods: {
        getAllPost() {
            axios.get("http://localhost:3000/api/post/")
                .then((res) => {
                    this.allPost = res.data
                    this.sortPost()
                }).catch((error) => console.log(error))
        },
        deletePost(post_id) {
            this.allPost = this.allPost.filter(post => post.id !== post_id)
        },
        sortPost() {
            this.allPost.sort((a, b) => {
                return new Date(a.date).valueOf() - new Date(b.date).valueOf()
            }).reverse()
        }
    },
    mounted() {
        this.getAllPost()
    },
}
</script>

<style scoped lang="scss">
body {
    padding: 0;
    margin: 0;
}

section {
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
}
</style>
