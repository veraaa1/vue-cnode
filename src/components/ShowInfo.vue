<template>
    <div>
        <span>{{authorInfoCheck}}</span>
       <div class="login-state" v-if="!userInfo && (!$route.params.topicid &&!$route.params.username)" >
           <p class="titles">登录</p>
           <div class="user-info">
               <div class="login">
                   <input type="text" v-model="tokenVal">
                   <button @click="login">登录</button>
               </div> 
           </div>
       </div>
       <div v-if="userInfo && (!$route.params.topicid && !$route.params.username)" class="user-state">
           <p class="titles">个人信息</p>
           <div class="user-info">
               <router-link :to="`/user/${userInfo.loginname}`">
               <img :src="userInfo.avatar_url" alt="">
               </router-link>
               <span>{{userInfo.loginname}}</span>
               <p>积分{{userInfo.score}}</p>
               <p>”这家伙很懒什么也没留下“</p>
               <button @click="logOut">退出</button>
           </div>
           <div class="create-topic">
               <router-link to="/topics/create">发布话题</router-link>
           </div>
       </div>
       
       <div v-if="authorInfo && ($route.params.topicid || $route.params.username)" class="author-state">
           <p class="titles">作者信息</p>
           <div class="user-info">
               <router-link :to="`/user/${authorInfo.loginname}`">
               <img :src="authorInfo.avatar_url" alt="">
               </router-link>
               <span>{{authorInfo.loginname}}</span>
               <p>积分{{authorInfo.score}}</p>
               <p>”这家伙很懒什么也没留下“</p>
           </div>
       </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'info',
    data:()=>({
        tokenVal:'',
        userInfo:null,
        authorInfo:null
    }),
    methods:{
        login(){
            if(this.tokenVal.trim()){
                axios.post('https://cnodejs.org/api/v1/accesstoken',{accesstoken:this.tokenVal}).then(res=>{
                    sessionStorage.setItem('token',this.tokenVal)
                    sessionStorage.setItem('name',res.data.loginname)
                    sessionStorage.setItem('avatar',res.data.avatar_url)
                    axios.get(`https://cnodejs.org/api/v1/user/${res.data.loginname}`).then(res=>{
                        sessionStorage.setItem('userdata',res.data.data)
                        sessionStorage.setItem('score',res.data.data.score)
                        this.userInfo = res.data.data
                    })
                })
            }
        },
        logOut(){
            this.userInfo =null
            sessionStorage.clear()
        }
    },
    computed:{
        islogin(){
            console.log(1111);
            
        return sessionStorage.getItem('token')?true:false
    },
    authorInfoCheck(){
       
      this.authorInfo = null
        if(this.$route.params.topicid){
            console.log(333);
            axios.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.topicid}`,{accesstoken:sessionStorage.getItem('token'),mdrender:true}).then(res=>{
                console.log(res.data.data.author.loginname);
                
                axios.get(`https://cnodejs.org/api/v1/user/${res.data.data.author.loginname}`).then(res=>{
                this.authorInfo = res.data.data
                return this.authorInfo
            })
                
            })
        }else if(this.$route.params.username){
            console.log(2222);
            
            axios.get(`https://cnodejs.org/api/v1/user/${this.$route.params.username}`).then(res=>{
                this.authorInfo = res.data.data
                return this.authorInfo
            })
        }
    }

    },
    created(){
        console.log(this.islogin);
        
        this.userInfo = sessionStorage.getItem('token')?{
            loginname:sessionStorage.getItem('name'),
            avatar_url:sessionStorage.getItem('avatar'),
            token:sessionStorage.getItem('token'),
            score:sessionStorage.getItem('score')
        }:null
        if(this.$route.params.topicid){
            axios.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.topicid}`).then(res=>{
                axios.get(`https://cnodejs.org/api/v1/user/${res.data.data.author.loginname}`).then(res=>{
                this.authorInfo = res.data.data
            })
                
            })
        }else if(this.$route.params.username){
            axios.get(`https://cnodejs.org/api/v1/user/${this.$route.params.username}`).then(res=>{
                this.authorInfo = res.data.data
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.titles{
        background-color: #f6f6f6;
        padding: 10px;
        width: 90%;
        margin: 0 auto;
        border-radius: 3px;
}
.user-info{
    width: 90%;
    margin: 0 auto;
    background-color: #fff;
    padding-bottom: 10px;
    img{
        width: 60px;
        height: 60px;
        border-radius: 3px;
        margin: 10px;
    }
    >button{
        display: block;
        outline: none;
        background-color: #080;
        border-radius: 3px;
        color: #fff;
        border: none;
        margin: 10px;
    }
    .score{
        padding-left: 10px;
    }

}
.login{
    width: 90%;
    margin: 0 auto;
    background-color: #fff;
    
}
.create-topic{
    width: 90%;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 3px 3px 0 0;
    margin-top: 10px;
    padding: 10px;
    >a{
        display: block;
        width: 80px;
        color: #fff;
        background-color: #80bd01;
        border-radius: 3px;
        border: 0;
        padding: 10px;
        font-size: 14px;
    }
}
</style>

