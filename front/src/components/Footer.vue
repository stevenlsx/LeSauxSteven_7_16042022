<template>
    <footer>
        <ul>
            <li><button @click="disconnect">Se déconnecter</button></li>
            <li><button @click="deleteUser">Supprimer mon compte</button></li>
        </ul>
    </footer>
</template>

<script>

import axios from "axios"
import router from "@/router/"
export default {
    name: "Footer",
    computed: {
        user() {
            return this.$store.state.user
        }
    },
    methods: {

        deleteUser() {
            axios.delete(`http://localhost:3000/api/user/${this.user.id}`)
                .then(() => {
                    router.push("/")
                    localStorage.clear()
                })
                .catch((error) => console.log(error))
        },
        disconnect() {
            router.push("/")
            localStorage.clear();
        }
    },


}

</script>

<style scoped lang="scss">
footer {

    padding: 100px 34px 50px 0;
    color: white;
    text-overflow: ellipsis;
}

footer ul {

    display: grid;
    grid-template-columns: 1fr 1fr;
    text-align: center;
    list-style: none;
    text-overflow: ellipsis;

    button {
        width: 50%;
        height: 50px;
        font-size: 1rem;
        text-overflow: ellipsis;
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
        text-overflow: ellipsis;

        &:last-child {
            border: none;
        }
    }
}
</style>