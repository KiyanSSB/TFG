<script>
export default {
  data() {
    return {
      open: false
    }
  }
}
</script>

<template>
  <p class="router-link-active router-link-exact-active nav-link active " @click="open = true">Tutorial</p>
    <div class="modal-bg" v-if="open">
        <div>
            patata
        </div>

        <div>
            patata
        </div>
            holi
            <button @click="open = false">Close</button>
  </div>
</template>

<style scoped>
.modal-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;

    background: rgba(0, 0, 0, 0.5);
    
    display: flex;
    justify-content: center;
    align-items: center;
}


</style>

