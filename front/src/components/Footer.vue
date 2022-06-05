<template>
    <footer>
        <ul>
            <li><button>Ajouter photo de profil</button></li>
            <li><button>Se déconnecter</button></li>
            <li><button type="click" @submit="deleteUser">Supprimer mon compte</button></li>
        </ul>
    </footer>
</template>

<script>
//import { mapState } from 'vuex'
import axios from "axios"
import router from "@/router/"
export default {
    name: "Footer",
    //data() {
    //    return {
    //        id: this.userCoId
    //    }
    //},
    //computed: {
    //    ...mapState(["userCoToken", "userCoId"])
    //},
    methods: {

        deleteUser() {
            axios.delete(`http://localhost:3000/api/user/${this.$store.state.userCoId}`)
                .then(() => {
                    router.push("/")
                    console.log("deleted af");
                })
                .catch((error) => console.log(error))
        },
    },


}

</script>

<style scoped lang="scss">
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