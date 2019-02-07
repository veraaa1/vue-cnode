<template>
    <div class="left-side">
        <nav>
            <ul>
                <li><router-link to="/">全部</router-link></li>
                <li><router-link to="/good">精华</router-link></li>
                <li><router-link to="/share">分享</router-link></li>
                <li><router-link to="/ask">问答</router-link></li>
                <li><router-link to="/job">招聘</router-link></li>
            </ul>
        </nav>
        <div v-if="topicList.length" class="list-content">
            <ul class="lists">
                <li v-for="topic in topicList" :key="topic.id">
                    <router-link :to="`/user/${topic.author.loginname}`" class="avatar">
                        <img :src="topic.author.avatar_url" alt="">
                    </router-link>
                    <span class="number"><span>{{topic.reply_count}}</span>/{{topic.visit_count}}</span>
                    <span :class="`tab ${topic.top || topic.good?'active-tab':''}`">{{topic.top?'置顶':topic.good?'精华':topic.tab==='share'?'分享':topic.tab==='ask'?'问答':'招聘'}}</span>
                    <router-link :to="`/topic/${topic.id}`" class="title">{{topic.title}}</router-link>
                    <span>{{ topic.last_reply_at | moment("from","now") }}</span>
                    <!-- <span class="time">{{moment(topic.last_reply_at)}}</span> -->
                </li>
            </ul>
            <el-pagination
                        
                        layout="prev, pager, next"
                        :total="tab==='all'?3256:tab==='good'?676:tab==='share'?1346:tab==='ask'?1912:475" :page-size="40" @current-change="pageChange" :current-page="current">
            </el-pagination>
        </div>
        <div v-else>waiting...</div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'list',
    components:{
    
    },
    data:()=>({topicList:[],current:1}),
    watch:{
        "tab"(){
            this.getTopicList(this.tab,1)
        }
    },
    computed:{
        tab(){
            return this.$route.params.tab?this.$route.params.tab:'all'
        }
    },
    methods:{
        getTopicList(tab,page){
            this.topicList = []
            axios.get(`https://cnodejs.org/api/v1/topics?tab=${tab}&page=${page}`).then(res=>{
                this.topicList = res.data.data
            })
        },
        pageChange(page){
            this.current = page
           this.getTopicList(this.tab,page)
            
        }
    },
    created(){
        this.getTopicList(this.tab,1)   
    }
}
</script>

<style lang="scss" scoped>
.left-side{
   width: 100%;
   >nav{
    width: 100%;
    background-color: #f6f6f6;
    border-radius: 3px 3px 0 0;
    padding: 10px  0 10px 0;
    >ul{
        width: 100%;
        display: flex;
        >li{
            margin-left: 10px;
            >a{
                color: #80bd01;
                text-decoration: none;
                border-radius: 3px;
                padding: 0 5px;
            }
            >.router-link-exact-active{
                background-color: #80bd01;
                color: #fff;
            }
        }
    }
} 
}
.list-content{
    background-color: #fff;
    width: 100%;
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

