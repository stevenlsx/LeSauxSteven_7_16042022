<template>

    <body>

        <header>
            <img class="header__logo" src="../assets/logo_accueil.png" alt="Logo Groupomania">
            <nav class="header__nav">
                <ul class="routing__list">
                    <li>
                        <router-link to="/Home">Accueil</router-link>
                    </li>
                    <li>
                        <router-link to="/MyPost">Mes posts</router-link>
                    </li>
                    <li>
                        <router-link to="/MyComment">Mes commentaires</router-link>
                    </li>
                </ul>
            </nav>
        </header>

        <section>
            <form class="post">
                <div class="user__card">
                    <img src="user__card_img" alt="photo de profil" />
                    <p class="user__card_first"> firstname</p>
                    <p class="user__card_last">lastname</p>
                </div>
                <div class="post__content">

                    <textarea class="post__content_textarea" name="textarea" placeholder="Partagez quelque chose !"
                        cols="100" rows="10"></textarea>
                    <label for="addImg">Ajoutez une image ou un gif !</label>
                    <input type="image" id="addImg" alt="illustration du post" src="">
                    <button class="btn__submit" type="submit"> Partagez !</button>
                </div>
                <div class="btn__option">
                    <button type="submit" class="btn__modif">Modifier le post</button>
                    <button type="submit" class="btn__showcomments">Afficher les réponses</button>
                    <button type="submit" class="btn__del">Supprimer le post</button>
                </div>
            </form>


            <form class="comments">
                <div class="user__card">
                    <img src="user__card_img" alt="photo de profil" />
                    <p class="user__card_first"> firstname</p>
                    <p class="user__card_last">lastname</p>
                </div>
                <div class="comment__content">
                    <textarea class="comment__textarea" name="textarea" placeholder="Votre réponse..." cols="70"
                        rows="6"></textarea>
                    <label for="addImg">Ajoutez une image ou un gif !</label>
                    <input type="image" id="addImg" alt="illustration du comment" src="">
                    <button class="btn__submit" type="submit"> Répondre !</button>
                </div>
                <div class="btn__option">
                    <button type="submit" class="btn__modif">Modifier le post</button>
                    <button type="submit" class="btn__showcomments">Afficher les réponses</button>
                    <button type="submit" class="btn__del">Supprimer le post</button>
                </div>
            </form>
        </section>
        <footer>
            <ul>
                <li><button>Ajouter photo de profil</button></li>
                <li><button>Se déconnecter</button></li>
                <li><button>Supprimer mon compte</button></li>
            </ul>
        </footer>



    </body>
</template>


<script>

export default {
    name: "Home",
    data() {
        return {}
    }
}
</script>

<style scoped lang="scss">
body {
    margin: 0;
    padding: 0;
    text-align: center;
    font-family: 'Jost', sans-serif;
    background: linear-gradient(to bottom, #0f0c29, #302b63, #24243e) no-repeat;
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
    background-color: gold;
    border: 2px solid gold;
    padding: 3px;
    border-radius: 5px;
    box-shadow: 4px 5px 12px #000;
}

// THREAD DES POSTES //
.post {
    border: 1px #6d44b8 solid;
    background-color: lightgray;
    text-align: center;
    width: 70%;
    margin-left: 15%;
    border-radius: 5px 5px 0 0;
    box-shadow: 5px 20px 50px #000;
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
    background: #573b8a;
    font-size: 1em;
    font-weight: bold;
    margin-top: 20px;
    outline: none;
    border: none;
    border-radius: 0 0 5px 5px;
    transition: .2s ease-in;
    cursor: pointer;

    &:hover {
        background: #6d44b8;
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
        background: #573b8a;
        font-size: 1em;
        font-weight: bold;
        margin-top: 20px;
        outline: none;
        border: none;
        border-radius: 5px 5px 0 0;
        transition: .2s ease-in;
        cursor: pointer;

        &:hover {
            background: #6d44b8;
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
    box-shadow: 5px 20px 50px #000;
}

.comment__content {
    display: flex;
    flex-direction: column;
}

//FOOTER//
footer {
    margin: 50px auto;
    border-top: 1px white solid;
    line-height: 20%;
    color: white;
}

footer ul {
    justify-content: center;
    display: flex;
    gap: 20%;
    margin-right: 120px;
    margin-left: -120px;
    margin-bottom: 50px;

    list-style: none;

    li {
        border-right: 2px solid goldenrod;
        padding-right: 90px;
        margin-right: -230px;
        margin-left: 70px;

        &:last-child {
            border: none;
            padding-left: 3px;
        }

        &:hover {
            color: goldenrod;
        }
    }

}
</style>
