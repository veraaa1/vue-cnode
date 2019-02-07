<template>
    <div class="user-info">
            <div class="info" v-if="userInfo">
                <p><router-link to="/">主页/</router-link></p>
                <div class="url-name">
                    <img :src="userInfo.avatar_url" alt="">
                    <span>{{userInfo.loginname}}</span>
                </div>
                <p>{{userInfo.score}} 积分</p>
                <p>{{collectArr.length}}个话题收藏</p>
                <p>github 账号: @{{userInfo.githubUsername}}</p>
                <p>注册时间于 {{userInfo.create_at | moment('from','now')}}</p>
            </div>
            <div v-else>waiting...</div>
        <div class="create-topic lists-content" v-if="userInfo">
            <p>最近创建的话题</p>
            <ul class="lists">
                <li v-for="topic in userInfo.recent_topics.slice(0,5)" :key="topic.id">
                    <router-link :to="`/user/${topic.author.loginname}`" class="avatar">
                        <img :src="topic.author.avatar_url" alt="">
                    </router-link>
                    <!-- <span class="number"><span>{{topic.reply_count}}</span>/{{topic.visit_count}}</span> -->
                    <span class="tab">{{topic.top?'置顶':topic.good?'精华':topic.tab==='share'?'分享':topic.tab==='ask'?'问答':'招聘'}}</span>
                    <router-link :to="`/topic/${topic.id}`" class="title">{{topic.title}}</router-link>
                    <span>{{ topic.last_reply_at | moment('from','now') }}</span>
                </li>
                <li><router-link :to="`/topics/${this.$route.params.username}/create`">查看更多 &gt;&gt;</router-link></li>
            </ul>
        </div>
        <div class="join-topic lists-content" v-if="userInfo">
            <p>最近参与的话题</p>
            <ul class="lists">
                <li v-for="topic in userInfo.recent_replies.slice(0,5)" :key="topic.id">
                    <router-link :to="`/user/${topic.author.loginname}`" class="avatar" >
                        <img :src="topic.author.avatar_url" alt="" @click="getAuthor(topic.author.loginname)">
                    </router-link>
                    <!-- <span class="number"><span>{{topic.reply_count}}</span>/{{topic.visit_count}}</span> -->
                    <span class="tab">{{topic.top?'置顶':topic.good?'精华':topic.tab==='share'?'分享':topic.tab==='ask'?'问答':'招聘'}}</span>
                    <router-link :to="`/topic/${topic.id}`" class="title">{{topic.title}}</router-link>
                    <span>{{ topic.last_reply_at | moment('from','now') }}</span>
                </li>
                <li><router-link :to="`/topics/${this.$route.params.username}/join`">查看更多 &gt;&gt;</router-link></li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'userinfo',
    data:()=>({
        userInfo:null,
        collectArr:[]
    }),
    methods:{
        getAuthor(name){
            
            axios.get(`https://cnodejs.org/api/v1/user/${name}`).then(res=>{
                 this.userInfo = res.data.data
        })
        },
        getCollect(name){
            axios.get(`https://cnodejs.org/api/v1/topic_collect/${name}`).then(res=>{
                console.log(res.data.data);
                this.collectArr = res.data.data
            })
        }

    },
    created(){
        this.getAuthor(this.$route.params.username)
        this.getCollect(this.$route.params.username)
    }
}
</script>

<style lang="scss" scoped>
.info{
        width: 100%;
        background-color: #fff;
        border-radius: 3px;
        margin-bottom: 10px;
        >p{
            padding-left: 10px;
        }
        >p:first-child{
            width: 100%;
            background-color: #f6f6f6;
            padding: 10px;
            >a{
                color: #080;
                text-decoration: none;
            }
        }
        .url-name{
            width: 100%;
            display: flex;
            >img{
                width: 30px;
                height: 30px;
                border-radius: 3px;
                margin: 10px;
            }
            >p{
                line-height: 30px;
                margin: 10px 10px 10px 0
            }
        }
    }
.lists-content{
    background-color: #fff;
    width: 100%;
    margin-top: 10px;
    border-radius: 3px 3px 0 0;
    >p{
        width: 100%;
        background-color: #f6f6f6;
        padding: 10px;
        border-radius: 3px 3px 0 0;
    }
    >.lists{
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
}
</style>

