<template>
    <div class="createComm">
        <div class="comments">
            <div class="user__card">
                <p class="user__card_first"> {{ userData.firstname }}</p>
                <p class="user__card_last">{{ userData.lastname }}</p>
                <p class="user__card_date">{{ commentData.date }}</p>
            </div>
            <div class="comment__content">
                <p class="content_p">{{ commentData.content }}</p>
            </div>
            <img :src="comment.img_url">
            <div class="bttn">
                <button @click="deleteComment" class="btn__del"
                    v-if="user.id === commentData.user_id || user.role === 'admin'">
                    Supprimer le commentaire
                </button>
            </div>

        </div>
    </div>
</template>

<script>
import axios from "axios"
export default {
    name: "CommentModel",
    props: {
        comment: Object,
    },
    data() {
        return {
            commentData: {
                id: null,
                user_id: null,
                content: null,
                date: null,
                img_url: null
            },
            userData: [],
        }
    },
    computed: {
        user() {
            return this.$store.state.user
        }
    },
    methods: {
        getUser() {
            axios.get(`http://localhost:3000/api/user/${this.commentData.user_id}`)
                .then((res) => {
                    this.userData = res.data
                })
                .catch((error) => console.log(error))
        },
        getComment() {
            axios.get(`http://localhost:3000/api/comment/${this.postData.id}`)
                .then((res) => {
                    this.arrayComment = res.data
                }).catch((error) => console.log(error))
        },
        deleteComment() {
            axios.delete(`http://localhost:3000/api/comment/${this.commentData.id}`)
                .then(() => {
                    this.$emit('deleteCom')
                })
                .catch((error) => console.log(error))
        }
    },
    mounted() {
        this.commentData = this.comment;
        this.getUser();
    }
}
</script>

<style scoped lang="scss">
.createComm {
    width: 60%;
}

.comments {

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: rgba(211, 211, 211, 0.526);
    //text-align: center;

    height: 30rem;
    margin: 20px 0;
    border-radius: 7px;
    box-shadow: 5px 20px 50px rgb(18, 24, 117);
}


.user__card {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    font-size: 18px;
    padding-top: 10px;
    margin-bottom: -20px;
}


.comment__content {
    margin: 0;
    padding: 0;
}

.content_p {
    width: 100%;
    text-align: left;
    padding-top: 20px;
    min-height: 120px;
    background: #fff;
    border-radius: 5px;
}

img {

    border-radius: 3px;
    width: 100%;
    height: 150px;
    object-fit: contain;

    vertical-align: bottom;

}


.bttn {
    display: flex;
    flex-direction: row;
    justify-content: space-around;

}

.btn__del {
    padding: 20px
}

button {
    width: 35%;
    margin: 0px;
    justify-content: center;
    color: #fff;
    background: #a338ff;
    font-size: 1rem;
    font-weight: bold;
    margin-top: 10px;
    outline: none;
    border: none;
    border-radius: 5px 5px 0 0;
    transition: .2s ease-in;
    cursor: pointer;

    &:hover {
        background: rgb(2, 227, 247);
    }
}
</style>