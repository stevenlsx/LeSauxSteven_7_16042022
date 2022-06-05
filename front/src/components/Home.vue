<template>

    <body>
        <Header />
        <section>
            <PostModel v-for="post in allPost" :key="post.id" :post="post">
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
            allPost: []
        }

    },
    methods: {
        getAllPost() {
            axios.get("http://localhost:3000/api/post/")
                .then((res) => {
                    this.allPost = res.data
                }).catch((error) => console.log(error))
        },


    },
    mounted() {
        this.getAllPost();
    },
}
</script>

<style scoped lang="scss">
</style>
