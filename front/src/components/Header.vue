<template>
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
            </ul>
        </nav>
    </header>
</template>

<script>


export default {
    name: "Header",
}
</script>

<style scoped lang="scss">
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
</style>