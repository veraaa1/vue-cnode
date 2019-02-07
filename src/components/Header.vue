<template>
    <header>
        <div class="header-inner">
            <div class="left">
                <router-link to="/"><h1><img src="https://static2.cnodejs.org/public/images/cnodejs_light.svg" alt=""></h1></router-link>
                <input type="text">
            </div>
            <ul>
                <li><a href="javascript:;">首页</a></li>
                <li><a href="javascript:;">新手入门</a></li>
                <li><a href="javascript:;">API</a></li>
                <li><a href="javascript:;">关于</a></li>
                <li><a href="javascript:;">注册</a></li>
                <li v-if="isloginState"><a href="javascript:;" @click="logOut">退出</a></li>
                <li v-else><a href="javascript:;">登录</a></li>
            </ul>
        </div>
    </header>
</template>

<script>
import axios from 'axios'
export default {
    name:'heads',
    data:()=>({
        islogin:false
    }),
    watch:{
      "isloginState"(){
          this.islogin = this.loginState
      } 
    },
    computed:{
         isloginState(){
        return sessionStorage.getItem('token')?true:false
    }
    },
    methods:{
        logOut(){
            sessionStorage.clear()
        }
    },
    created(){
           axios.get(`https://cnodejs.org/api/v1/message/count`,{accesstoken:sessionStorage.getItem('token')}).then(res=>{
               console.log(res.data.data); 
           })
    }
}
</script>

<style lang="scss" scoped>
header{
    width: 100%;
    background-color: #444;
    >.header-inner{
        width: 90%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        padding: 5px 0;
        >.left{
            width: 400px;
            display: flex;
            justify-content: space-around;
        >a{
            width: 120px;
            padding: 3px 20px;
            height: 34px;
            line-height: 34px;
            color: #ccc;
            font-weight: 700;
            >h1{
                width: 100%;
                >img{
                    width: 100%;
                    display: block;
                }
            }
        }
        >input{
                background: #888;
                padding: 3px 5px 3px 22px;
                color: #666;
                border: 0;
                margin-top: 2px;
                transition: all .5s;
                border-radius: 15px;
                line-height: 30px;
                height: 30px;

        }
        }
        
        >ul{
            width: 360px;
            display: flex;
            justify-content: space-around;
            >li{
                >a{
                    text-decoration: none;
                    color: #ccc;
                    font-size: 13px;
                    display: block;
                    width: 100%;
                    text-align: center;
                    line-height: 34px;
                }
            }
        }
    }
}
</style>

