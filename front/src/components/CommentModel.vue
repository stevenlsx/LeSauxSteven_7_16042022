<template>
    <form class="comments" v-for="data in userData" :key="data.id">
        <div class="user__card">
            <img src="user__card_img" alt="photo de profil" />
            <p class="user__card_first"> {{ data.firstname }}</p>
            <p class="user__card_last">{{ data.lastname }}</p>
            <p class="user__card_date">{{ commentData.date }}</p>
        </div>
        <div class="comment__content">
            <p class="content_p">{{ commentData.content }}</p>
            <label for="addImg">Ajoutez une image ou un gif !</label>
            <input type="image" id="addImg" alt="illustration du comment" src="">

        </div>
        <div class="btn__option">
            <button class="btn__submit" type="submit"> Répondre !</button>
            <!--<button type="submit" class="btn__modif">Modifier le post</button>-->
            <!--<button type="submit" class="btn__showcomments">Afficher les réponses</button>-->
            <!--<button type="submit" class="btn__del">Supprimer le post</button>-->
        </div>
    </form>
</template>

<script>
import axios from "axios"
export default {
    name: "CommentModel",
    props: {
        comment: Object
    },
    data() {
        return {
            commentData: {
                id: null,
                user_id: null,
                content: null,
                date: null
            },
            userData: [],
        }
    },
    methods: {
        getUser() {
            axios.get(`http://localhost:3000/api/user/${this.commentData.user_id}`)
                .then((res) => {
                    this.userData = res.data
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
.comments {
    margin-top: -59.8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: rgba(211, 211, 211, 0.526);
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

.comment__content {
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

    .btn__submit {
        padding: 20px;
        border-radius: 7px 7px 0 0;
    }

    //.btn__showcomments {
    //    padding: 20px;
    //    border-radius: 0 7px 0 7px;
    //}

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
</style>