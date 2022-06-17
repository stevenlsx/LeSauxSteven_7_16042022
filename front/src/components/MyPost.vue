<template>

    <body>

        <Header />
        <section>
            <div class="createPost">
                <form class="post" @submit.prevent="createPost">
                    <div class="user__card">
                        <p class="user__card_first"> {{ this.user.firstname }}</p>
                        <p class="user__card_last">{{ this.user.lastname }}</p>
                    </div>
                    <div class="post__content">
                        <textarea class="content" name="textarea" placeholder="Partagez quelque chose !" rows="10"
                            v-model="dataPost.content"></textarea>
                        <label for="addImg">Ajoutez une image ou un gif !</label>
                        <input type="file" id="addImg" alt="illustration du post" @change="uploadFile">

                    </div>
                    <div class="post__option">

                        <button type="submit" class="btn__showcomments">Partagez !</button>

                    </div>
                </form>
            </div>
            <div class="myPost">
                <PostModel v-for="post in myPost" :key="post.id" :post="post" @delete="deletePost(post.id)"
                    :regular="regular" :shrink="shrink">
                </PostModel>
            </div>
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
    name: "MyPost",
    components: {
        Header,
        Footer,
        PostModel,
    },
    data() {
        return {
            Btn: true,
            regular: false,
            shrink: true,
            myPost: [],

            dataPost: {
                id: null,
                content: null,

                user_id: null
            },
            showComment: false,
            file: null,
        }
    },
    computed: {
        user() {
            return this.$store.state.user
        }
    },

    methods: {
        uploadFile(e) {
            this.file = e.target.files[0]
        },
        createPost() {
            let formData = new FormData();
            formData.append('image', this.file)
            formData.append('post', JSON.stringify({
                user_id: this.user.id,
                content: this.dataPost.content
            }))
            axios.post("http://localhost:3000/api/post/", formData)
                .then((res) => {
                    this.myPost.push(res.data)
                    this.sortPost()
                })
                .catch((error) => console.log(error))
        },
        getMyPost() {
            axios.get(`http://localhost:3000/api/post/mypost/${this.user.id}`)
                .then((res) => {
                    this.myPost = res.data
                    this.dataPost.user_id = this.user.id
                    this.dataPost.id = res.data.id
                    this.sortPost()
                })
                .catch((error) => console.log(error))
        },

        deletePost(post_id) {
            this.myPost = this.myPost.filter((post) => {
                return post.id !== post_id
            })
        },

        sortPost() {
            this.myPost.sort((a, b) => {
                return new Date(a.date).valueOf() - new Date(b.date).valueOf()
            }).reverse()
        }
    },
    mounted() {
        this.getMyPost();

    }
}
</script>

<style scoped lang="scss">
.createPost {
    display: flex;
    justify-content: center;
}

.myPost {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.post {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: rgb(216, 205, 228);
    text-align: center;
    width: 60%;
    height: 30rem;

    margin-bottom: 60px;
    border-radius: 7px;
    box-shadow: 5px 20px 50px rgb(18, 24, 117);
}

.user__card {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    font-size: 18px;
    padding-top: 20px;
    margin-bottom: -20px;
}

.user__card_img {
    padding-left: 20px;
}

.post__content {
    display: flex;
    flex-direction: column;
    align-items: center;

    .content {
        margin-top: -10px;
        width: 99%;
        text-align: left;
        padding-top: 20px;
        min-height: 100px;
        background: #fff;
        border-radius: 8px;
        border-color: #fff;

        &:focus-visible {
            border-color: white
        }
    }

    label {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 30px;
    }

    .btn__addImg {
        padding: 20px;
        border-radius: 7px;
    }
}

#addImg {
    text-align: center;
}

img {
    width: 60px;
}

button {
    width: 25%;
    margin: 0px;
    justify-content: center;
    color: #fff;
    background: #a338ff;
    font-size: 1em;
    font-weight: bold;
    margin-top: 10px;
    outline: none;
    border: none;
    border-radius: 7px;
    transition: .2s ease-in;
    cursor: pointer;

    &:hover {
        background: rgb(2, 227, 247);
    }
}

.post__option {
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;

    button {
        height: 50px;
    }

    .btn__showcomments {
        padding: 20px;
        border-radius: 7px 7px 0 0;
    }


}
</style>
