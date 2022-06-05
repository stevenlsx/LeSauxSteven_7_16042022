<template>
    <form class="post" v-for="user in arrayUser" :key="user.id">
        <div class="user__card">
            <!--<img class="user__card_img" src="" alt="photo de profil" />-->
            <p class="user__card_first"> {{ user.firstname }}</p>
            <p class="user__card_last">{{ user.lastname }}</p>
            <p class="user__card_date">{{ postData.date }}</p>
        </div>
        <div class="post__content">
            <p class="content_p">{{ postData.content }}</p>
            <!--<label for="addImg">Ajoutez une image ou un gif !</label>-->
            <input type="image" id="addImg" alt="illustration du post" src="">

        </div>
        <div class="btn__option">
            <!--<button class="btn__submit" type="submit"> Partagez !</button>-->
            <!--<button type="submit" class="btn__modif">Modifier le post</button>-->
            <button type="click" @click.prevent="showComment = !showComment" class="btn__showcomments">
                Afficher les réponses</button>
            <!--<button @click="deletePost" class="btn__del">Supprimer le post</button>-->
        </div>
    </form>
    <div class="commentDiv" v-show="showComment">
        <CommentModel v-for="comment in arrayComment" :key="comment.id" :comment="comment" />
    </div>
</template>

<script>
import CommentModel from "./CommentModel.vue"
import axios from "axios"
export default {
    name: "PostModel",
    components: {
        CommentModel
    },
    props: {
        post: Object
    },
    data() {
        return {
            postData: {
                id: null,
                user_id: null,
                content: null,
                img_url: null,
                date: null
            },
            arrayUser: [],
            arrayComment: [],
            showComment: false
        }
    },

    methods: {
        //Recupère dans arrayUser les data user dont l'user.id correspondant à l'user_id du post. 
        getUser() {
            axios.get(`http://localhost:3000/api/user/${this.postData.user_id}`)
                .then((res) => {
                    this.arrayUser = res.data
                })
                .catch((error) => console.log(error))
        },
        getComment() {
            axios.get(`http://localhost:3000/api/comment/${this.postData.id}`)
                .then((res) => {
                    this.arrayComment = res.data
                }).catch((error) => console.log(error))
        }

    },
    mounted() {
        this.postData = this.post;
        this.getUser();
        this.getComment();
    },

}


</script>

<style scoped lang="scss">
.post {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: rgb(216, 205, 228);
    text-align: center;
    width: 60%;
    height: 30rem;
    margin-left: 15%;
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
    label {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 30px;
    }
}

.content_p {
    margin-top: -10px;
    width: 98.3%;
    text-align: left;
    padding-left: 10px;
    padding-top: 20px;
    min-height: 100px;
    background: #fff;
    border-radius: 5px;
}

#addImg {
    text-align: center;
}

.btn__option {
    display: flex;
    flex-direction: row;
    justify-content: center;

    .btn__showcomments {
        padding: 20px;
        border-radius: 7px 7px 0 0;
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

        &:hover {
            background: rgb(2, 227, 247);
        }
    }
}

//.commentDiv {
//    position: relative;
//    transform: translateY(25px);
//    transition: 2s ease-in-out;
//}
</style>
<!--.post {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: rgb(216, 205, 228);
    text-align: center;
    width: 60%;
    height: 30rem;
    margin-left: 15%;
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
    label {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 30px;
    }
}

.content_p {
    margin-top: -10px;
    width: 98.3%;
    text-align: left;
    padding-left: 10px;
    padding-top: 20px;
    min-height: 100px;
    background: #fff;
    border-radius: 5px;
}

#addImg {
    text-align: center;
}

.btn__option {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;

    .btn__submit {
        padding: 20px;
        border-radius: 7px 0 7px 0;
    }

    .btn__showcomments {
        padding: 20px;
        border-radius: 0 7px 0 7px;
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

        &:hover {
            background: rgb(2, 227, 247);
        }
    }
}-->