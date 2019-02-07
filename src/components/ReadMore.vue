<template>
    <div class="read-more">
        <p class="title-more"><router-link to="/">主页/</router-link><router-link :to="`/user/${$route.params.username}`">{{$route.params.username}}的主页</router-link></p>
        <div v-if="fullReplies.length" class="con-lists">
            <p class="title-in">{{$route.params.username}}最近{{$route.params.status==='create'?'创建':'参与'}}的话题</p>
            <ul class="lists" >
                <li v-for="topic in fullReplies.slice((current-1)*5,(current)*5)" :key="topic.id">
                    <router-link :to="`/user/${topic.author.loginname}`" class="avatar">
                        <img :src="topic.author.avatar_url" alt="">
                    </router-link>
                    <!-- <span class="number"><span>{{topic.reply_count}}</span>/{{topic.visit_count}}</span> -->
                    <span class="tab">{{topic.top?'置顶':topic.good?'精华':topic.tab==='share'?'分享':topic.tab==='ask'?'问答':'招聘'}}</span>
                    <router-link :to="`/topic/${topic.id}`" class="title">{{topic.title}}</router-link>
                    <span>{{ topic.last_reply_at | moment("from","now") }}</span>
                </li>
            </ul>
            <el-pagination
                        
                        layout="prev, pager, next"
                        :total="fullReplies.length" :page-size="5" @current-change="pageChange" :current-page="current">
            </el-pagination>
            </div>
            <div v-else>waiting...</div>
        
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'more',
    data:()=>({
        fullReplies:[],
        current:1
    }),
    methods:{
        getTopics(username,status){
            axios.get(`https://cnodejs.org/api/v1/user/${username}`).then(res=>{
                 if(status === 'create'){
                     this.fullReplies = res.data.data.recent_topics
                 }else{
                     this.fullReplies = res.data.data.recent_replies
                 }
        })
        }
        ,
        pageChange(page){
            this.current = page
        }
    }
    ,
    created(){
        const {username,status} = this.$route.params
        this.getTopics(username,status)
    }
}
</script>

<style lang="scss" scoped>
.read-more{
    width: 100%;
    >.title-more{
        border-radius: 3px 3px 0 0;
        background-color: #f6f6f6;
        width: 100%;
        padding: 10px;
        color: #081;
    }
    .title-in{
        border-radius: 3px 3px 0 0;
        background-color: #f6f6f6;
        width: 100%;
        padding: 10px;
        margin-top: 10px;

    }
    .con-lists{
        background-color: #fff;
        border-radius: 3px 3px 0 0;
    }
}
.lists{
            width: 100%;
            >li:hover{
                background-color: #f0f0f0;
            }
            >li{
                
                width: 100%;
                font-size: 14px;
                padding: 10px 0 10px 10px;
                display: flex;
                justify-content: flex-start;
                border-top: 1px solid #f0f0f0;
                >.avatar{
                    width: 30px;
                    height: 30px;
                    >img{
                        display: block;
                        width: 100%;
                        border-radius: 5px;
                    }
                    
                    }
                    >.tab{
                        padding: 0 5px;
                        background-color: #e5e5e5;
                        color: #999;
                        line-height: 20px;
                        border-radius: 3px;
                        height: 20px;
                        margin-left: 10px;
                    }
                    >.active-tab{
                        background-color: #80bd01;
                        color: #fff;
                    }
                   >.number{
                        color: #b4b4b4;
                        margin-left: 10px;
                        width: 60px;
                        >span{
                            color: #9e78c0;
                        }
                }
                >.title{
                    width: 626px;
                    white-space: nowrap;
                    overflow: hidden;
                    margin-left: 10px;
                    color: #000;
                    text-decoration: none;
                    text-overflow: ellipsis;
                }
                >.title:hover{
                    text-decoration: underline;
                }
                >.time{
                    width: 100px;
                    text-align: right;
                }
                
            }}
</style>

