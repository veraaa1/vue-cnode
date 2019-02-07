<template>
  <div id="app">
   
    <Header/>
    <div class="app-inner">
    <div class="left">
      <router-view></router-view>
    </div>
    <div class="right">
      <router-view name="user"></router-view>
    </div>
     </div>
  </div>
</template>

<script>
import Header from './components/Header'
export default {
  name: 'app',
  components:{
    Header
  }
}
</script>

<style lang="scss">
*{
  box-sizing: border-box;
  margin: 0;
}
ul{
  list-style: none;
  padding: 0
};
body{
  background: #ccc;
}
#app{
  .app-inner{
  width: 90%;
  margin: 0 auto;
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  .right{
    width: 290px;
  }
  .left{
    width: calc(100% - 290px);
  }
}
}
</style>



