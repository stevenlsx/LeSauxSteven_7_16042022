<template>

    <form class="post">
        <div class="user__card">
            <img src="user__card_img" alt="photo de profil" />
            <p class="user__card_first"> {{ firstname }}</p>
            <p class="user__card_last">{{ lastname }}</p>
        </div>
        <div class="post__content">

            <textarea class="post__content_textarea" name="textarea" placeholder="Partagez quelque chose !" cols="100"
                rows="10" v-model="content"></textarea>
            <label for="addImg">Ajoutez une image ou un gif !</label>
            <input type="image" id="addImg" alt="illustration du post" src="{{img_url}}">
            <button class="btn__submit" type="submit"> Partagez !</button>
        </div>
        <div class="btn__option">
            <button type="submit" class="btn__modif">Modifier le post</button>
            <button type="submit" class="btn__showcomments">Afficher les réponses</button>
            <button type="submit" class="btn__del">Supprimer le post</button>
        </div>
    </form>
</template>

<script>

import axios from "axios"
export default {
    name: "PostModel",
    data() {
        return {
            postData: {
                id: null,
                firstname: null,
                lastname: null,
                img: null,
                user_id: null,
                content: null,
                img_url: null,
                date: null
            },

            allUser: [],
            allPost: [],
            arrayPostData: []
        }
    },

    methods: {
        getAllUser() {
            axios.get("http://localhost:3000/api/user/")
                .then((res) => console.log(res))
                .then((data) => this.allUser = data,
                    console.log(this.allUser))
        },
        getAllPost() {
            axios.get("http://localhost:3000/api/post/")
                .then((res) => console.log(res))
                .then((data) => this.allPost = data,
                    console.log(this.allPost))
        },
        newPostData() {
            for (let i = 0; i < this.allPost.length; i++) {
                for (let j = 0; j < this.allUser.length; j++) {
                    if (this.allPost[i].user_id === this.allUser[j].id) {
                        this.postData.firstname = this.allUser[j].firstname;
                        this.postData.lastname = this.allUser[j].lastname;
                        this.postData.img = this.allUser[j].img_url;
                        this.postData.user_id = this.allPost[i].user_id;
                        this.postData.content = this.allPost[i].content;
                        this.postData.img_url = this.allPost[i].img_url;
                        this.postData.date = this.allPost[i].date;
                        this.arrayPostData.push(this.postData);
                        console.log(this.arrayPostData);
                    }
                }
            }
        },
        emitArray() {
            this.$emit(this.arrayPostData);
        }

    }
}


</script>

<style scoped lang="scss">
body {
    text-align: center;
    font-family: 'Jost', sans-serif;
    background: rgb(0, 71, 144);
    background: linear-gradient(0deg, rgba(26, 51, 168, 1) 0%, rgba(16, 116, 205, 1) 12%, rgba(163, 56, 255, 1) 49%, rgba(16, 116, 205, 1) 76%, rgba(26, 51, 168, 1) 94%) no-repeat;
}

/* Header */

header {
    display: grid;
    align-items: center;
    margin: 0 auto;
    grid-template-columns: 1fr 1fr 2fr;
    grid-template-areas: "logo . navbar ";
}

.header__logo {
    grid-area: logo;
    height: 300px;
    margin: -47px -40px 0px 58px;
}

.header__nav {
    grid-area: navbar;
    margin-top: -37px;
}

.routing__list {
    display: flex;
    justify-content: flex-start;
    gap: 8%;
    list-style: none;

    li {
        border-right: 1px white solid;
        line-height: 26px;
        padding-right: 28px;
    }

}

a {
    text-decoration: none;
    color: white;
}

.router-link-active {

    font-weight: bold;
    color: white;
    background-color: #a338ff;
    border: 2px solid #a338ff;
    padding: 3px;
    border-radius: 5px;
    box-shadow: 4px 5px 12px rgb(18, 24, 117);

    &:hover {
        background-color: rgb(2, 227, 247);
        border: 2px solid rgb(2, 227, 247);
    }
}

// THREAD DES POSTES //
.post {
    border: 1px #6d44b8 solid;
    background-color: lightgray;
    text-align: center;
    width: 70%;
    margin-left: 15%;
    border-radius: 5px 5px 0 0;
    box-shadow: 5px 20px 50px rgb(18, 24, 117);
}

.user__card {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
    padding-left: 20px;
}

.user__card_img {
    padding-left: 20px;
}

.post__content {
    display: flex;
    flex-direction: column;
}

.btn__submit {
    width: 25%;
    margin: 10px auto;
    padding: 10px 0;
    justify-content: center;
    display: block;
    color: #fff;
    background: #a338ff;
    font-size: 1em;
    font-weight: bold;
    margin-top: 20px;
    outline: none;
    border: none;
    border-radius: 0 0 5px 5px;
    transition: .2s ease-in;
    cursor: pointer;

    &:hover {
        background: rgb(2, 227, 247);
        ;
    }
}


.btn__option {
    display: flex;
    margin-bottom: -10px;

    button {
        width: 25%;
        margin: 10px auto;
        justify-content: center;
        display: block;
        color: #fff;
        background: #a338ff;
        font-size: 1em;
        font-weight: bold;
        margin-top: 20px;
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

//THREAD DES COMMENT//
.comments {
    border: 1px #6d44b8 solid;
    background-color: rgba(211, 211, 211, 0.526);
    text-align: center;
    width: 70%;
    margin-left: 15%;
    border-radius: 0 0 5px 5px;
    box-shadow: 5px 20px 50px rgb(18, 24, 117);
}

.comment__content {
    display: flex;
    flex-direction: column;
}

//FOOTER//
footer {

    padding: 100px 34px 50px 0;
    color: white;
}

footer ul {

    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    text-align: center;
    list-style: none;

    button {
        width: 50%;
        font-size: 1em;
        background-color: #a338ff;
        color: white;
        border: 1px solid #a338ff;
        border-radius: 5px;
        box-shadow: 4px 5px 12px rgb(18, 24, 117);

        &:hover {
            background-color: rgb(2, 227, 247);

        }
    }

    li {
        display: flex;
        justify-content: space-around;
        border-right: 2px solid goldenrod;

        &:last-child {
            border: none;
        }
    }

}
</style>