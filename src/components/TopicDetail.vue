<template>
    <div class="topic-total" v-if="topicDetail">
        <div class="topic-all">
        <div class="topic-head">
            <div class="top">
                <span class="tab">{{topicDetail.top?'置顶':topicDetail.good?'精华':''}}</span>
                <h2>{{topicDetail.title}}</h2>
            </div>
            
            <p>发布于{{topicDetail.create_at | moment("from","now")}} 作者 {{topicDetail.author.loginname}} {{topicDetail.visit_count}}次浏览 来自 {{topicDetail.tab==='share'?'分享':topicDetail.tab==='ask'?'问答':topicDetail.tab==='job'?'招聘':'客户端测试'}}</p>
            <div class="button-div">
                <button class="collect" v-if="islogin" @click="isCollect">{{iscollect?'取消收藏':'收藏'}}</button>
                <div v-if="islogin && topicDetail.author.loginname === username">
                    <router-link :to="`/topic/${topicDetail.id}/update`" class="edit">编辑</router-link>
                    <button class="delete">删除</button>
                </div>
            </div>
        </div>
        <div v-html="topicDetail.content" class="detail"></div>
        </div>
        <div class="comments-con">
            <p>{{topicDetail.reply_count}} 个回复</p>
            <Comments :comments="topicDetail.replies" @addComment="addComment" @replyComment="replyComment" @ups="ups" />
        </div>
    </div>
    <div v-else>waiting...</div>
</template>

<script>
import axios from 'axios'
import Comments from './Comments'
export default {
name:'topicdetail',
components:{
    Comments
},
data:()=>({
    topicDetail:null,
    iscollect:false
}),
computed:{
    islogin(){
        return sessionStorage.getItem('token')?true:false
    },
    username(){
        return sessionStorage.getItem('name')
    }
},
methods:{
     addComment(content,clear){
        if(content.trim()){
            axios.post(`https://cnodejs.org/api/v1/topic/${this.$route.params.topicid}/replies`,{accesstoken:sessionStorage.getItem('token'),content:content}).then(res=>{
                axios.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.topicid}`).then(res=>{
                        this.topicDetail = res.data.data 
                     })
                     clear()
            })
        }
    },
    replyComment(id,content,clear){
        if(content.trim()){
            console.log(11111);
            
            axios.post(`https://cnodejs.org/api/v1/topic/${this.$route.params.topicid}/replies`,{accesstoken:sessionStorage.getItem('token'),content:content,reply_id:id}).then(res=>{
                axios.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.topicid}`).then(res=>{
                        this.topicDetail = res.data.data 
                     })
                     clear()
            })
        }
    },
    ups(id){
        axios.post(`https://cnodejs.org/api/v1/reply/${id}/ups`,{accesstoken:sessionStorage.getItem('token')}).then(res=>{
            axios.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.topicid}`).then(res=>{
                        this.topicDetail = res.data.data 
                     })
        })
    },
    isCollect(){
        if(this.iscollect){
             axios.post(`https://cnodejs.org/api/v1/topic_collect/de_collect`,{accesstoken:sessionStorage.getItem('token'),topic_id:this.$route.params.topicid}).then(res=>{
                 console.log('取消收藏');
                 
                 this.iscollect = !this.iscollect
             })
        }else{
             axios.post(`https://cnodejs.org/api/v1/topic_collect/collect`,{accesstoken:sessionStorage.getItem('token'),topic_id:this.$route.params.topicid}).then(res=>{
                 console.log('收藏');
                 this.iscollect = !this.iscollect
             })
        }
       
    }
},
created(){
    
    axios.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.topicid}`,{accesstoken:sessionStorage.getItem('token'),mdrender:true}).then(res=>{
        console.log(res.data.data);
        
        this.topicDetail = res.data.data 
        if(this.islogin){
            this.iscollect = res.data.data.is_collect
        }
    })
}
}
</script>
<style lang="scss" scoped>
.topic-all{
        background-color: #fff;
        border-radius: 3px 3px 0 0;
        
        >.topic-head{
            border-bottom: 1px solid #ccc;
            >p{
            padding-left: 10px;
        }
            >.top{
                width: 100%;
                display: flex;
                padding: 5px 10px;
                >.tab{
                    padding: 0 5px;
                    background-color: #80bd01;
                    color: #fff;
                    line-height: 20px;
                    border-radius: 3px;
                    height: 20px;
                    margin-left: 10px;
                    margin-top: 5px;
                }
            }
            
        }
        .detail{
        width: 100%;
        word-break: break-word;
        padding: 10px;
        img{
            display: block;
            width: 40%;
        }
        }}
        .button-div{
    display: flex;
    margin:10px 0;
}
.collect,.edit,.delete{
    color: #fff;
    background-color: #80bd01;
    border:none;
    outline: none;
    border-radius: 3px;
    padding: 3px 10px; 
    display: inline-block;
    margin-left: 10px;
}
.comments-con{
    width: 100%;
    margin-top: 10px;
    border-radius: 3px 3px 0 0;
    >p{
        width: 100%;
        padding: 10px;
        background-color: #f6f6f6;
        border-radius: 3px 3px 0 0;
    }
}
</style>

