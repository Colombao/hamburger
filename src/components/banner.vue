<template>
   <div id="main-banner">
    <h1>{{titulo}}</h1>
   </div>
</template>

<script>
export default {
  name: "Banner",
  props: {
    titulo: {
      type: String,
      default: "Make Your Burger" 
    }
  }
}
</script>

<style scoped>
#main-banner{
    background-image: url('../../public/img/burger.jpg');
    background-position: 0 -300px;
    background-size: cover;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
#main-banner h1{
    color: #fff;
    text-align: center;
    font-size: 60px;
    background-color: #22222275;
    padding: 20px 40px;
    border-radius: 10px;


    
}
</style>