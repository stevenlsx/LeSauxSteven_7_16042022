<template>
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
</template>

<script>


export default {
    name:


</script>

<style>
</style>