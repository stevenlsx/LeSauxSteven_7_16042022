<template>
    <div class="post">
        <div class="user__card">
            <p class="user__card_first"> {{ author.firstname }}</p>
            <p class="user__card_last">{{ author.lastname }}</p>
            <p class="user__card_date">{{ new Date(postData.date) }}</p>
        </div>
        <div class="post__content">
            <p class="content">{{ postData.content }}</p>
            <!--<label for="addImg">Ajoutez une image ou un gif !</label>-->
            <img :src="post.img_url" v-if="post.img_url !== null" />

        </div>
        <div class="btn__option">
            <button type="click" @click="showComment = !showComment"
                :class="{ btn__showcomments: !regular, btn__shrink: shrink }">
                Afficher les réponses
            </button>
            <button @click="deletePost" class="btn__del" v-if="user.id === postData.user_id || user.role === 'admin'">
                Supprimer le post
            </button>
            <button type="click" @click="editComment = !editComment"
                :class="{ btn__create: !regular, btn__shrink: shrink }">
                Répondre
            </button>
        </div>
    </div>

    <!-- Afficher les commentaires -->
    <div class="commentDiv" v-show="showComment">
        <CommentModel v-for="comment in arrayComment" :key="comment.id" :comment="comment"
            @deleteCom="deleteComment(comment.id)" />
    </div>


    <!-- Répondre -->
    <div class="responseModel">
        <form class="post" @submit.prevent="createComment" v-show="editComment">
            <div class="user__card">
                <p class="user__card_first"> {{ this.user.firstname }}</p>
                <p class="user__card_last">{{ this.user.lastname }}</p>
                <p class="user__card_date">{{}}</p>
            </div>
            <div class="post__content">
                <textarea class="content__area" name="textarea" placeholder="Partagez quelque chose !" rows="10"
                    v-model="dataComment.content"></textarea>
                <label for="addImg">Ajoutez une image ou un gif !</label>
                <input type="file" id="addImg" alt="illustration du post" @change="uploadFile">
            </div>
            <div class="btn__comment">
                <button class="btn__submit" type="submit"> Répondre !</button>
            </div>
        </form>
    </div>
</template>

<script>
import CommentModel from "./CommentModel.vue"
import axios from "axios"

export default {
    name: "PostModel",
    components: {
        CommentModel,
    },
    props: {
        post: Object,
        Btn: Boolean,
        regular: Boolean,
        shrink: Boolean,

    },
    emits: ["delete"],
    data() {
        return {
            postData: {
                id: null,
                user_id: null,
                content: null,

                date: null
            },
            dataComment: {
                id: null,
                content: null,
                img_url: null,
                user_id: null,
                post_id: null
            },
            myImgActive: false,
            imgActive: false,
            myImg: null,
            file: null,
            arrayUser: [],
            arrayComment: [],
            myArrayComment: [],
            showComment: false,
            editComment: false,
            author: {
                firstname: null,
                lastname: null
            }
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
        //Recupère dans arrayUser les data user dont l'user.id correspondant à l'user_id du post. 
        getUser() {
            axios.get(`http://localhost:3000/api/user/${this.postData.user_id}`)
                .then((res) => {
                    this.author = res.data
                })
                .catch((error) => console.log(error))
        },
        getComment() {
            axios.get(`http://localhost:3000/api/comment/${this.postData.id}`)
                .then((res) => {
                    this.arrayComment = res.data
                })
                .catch((error) => console.log(error))
        },
        createComment() {
            let formData = new FormData();
            formData.append('image', this.file)
            formData.append('comment', JSON.stringify({
                user_id: this.user.id,
                post_id: this.post.id,
                content: this.dataComment.content
            }))
            axios.post("http://localhost:3000/api/comment/", formData)
                .then((res) => {
                    this.arrayComment.push(res.data)
                })
                .catch((error) => console.log(error))
        },
        deletePost() {
            axios.delete(`http://localhost:3000/api/post/${this.postData.id}`)
                .then(() => {
                    this.$emit('delete')
                })
                .catch((error) => console.log(error))
        },
        deleteComment(comment_id) {
            this.arrayComment = this.arrayComment.filter((comment) => {
                return comment.id !== comment_id
            })
        },
    },
    mounted() {
        this.postData = this.post;
        this.getUser();
        this.getComment();
    },
}
</script>

<style scoped lang="scss">
.commentDiv {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
}

.responseModel {
    display: flex;
    width: 100%;
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

.post__content {
    label {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 30px;
    }
}

.content {
    margin-top: -10px;
    width: 100%;
    text-align: left;
    padding-top: 20px;
    min-height: 100px;
    background: #fff;
    border-radius: 8px;
    border-color: white;

    &__area {
        margin-top: -10px;
        width: 99%;
        text-align: left;
        padding-top: 20px;
        min-height: 100px;
        background: #fff;
        border-radius: 8px;
        border-color: white;
    }
}

#addImg {
    text-align: center;
}

img {
    border-radius: 3px;
    width: 100%;
    height: 150px;
    object-fit: contain;

    vertical-align: bottom;
}

.btn__option {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .btn__showcomments {
        padding: 20px;

        border-radius: 0 7px 0 7px;
    }

    .btn__create {
        padding: 20px;
        border-radius: 7px 0 7px 0;
    }

    .btn__modif {
        width: 24%;
        padding: 10px;
        border-radius: 7px 7px 0 0;
    }

    .btn__del {
        width: 24%;
        padding: 10px;
        border-radius: 7px 7px 0 0;
    }

    .btn__shrink {
        width: 24%;
        padding: 5px;

    }
}

.btn__comment {
    display: flex;
    flex-direction: row;
    justify-content: center;

    .btn__submit {
        padding: 20px;
        border-radius: 0 7px 0 0;
    }
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
    border-radius: 5px 5px 0 0;
    transition: .2s ease-in;
    cursor: pointer;
    overflow: auto;

    &:hover {
        background: rgb(2, 227, 247);
    }
}

@media only screen and (max-width: 600px) {
    button {
        width: 30%;

    }

    .post {
        height: 37rem
    }
}
</style>
