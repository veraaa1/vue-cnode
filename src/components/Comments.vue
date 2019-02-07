<template>
    <div class="comments-con" v-if="comments">
        <ul class="comments">
            <li v-for="comment in comments" :key="comment.id" :style="{backgroundColor:replyId===comment.id && isShow?'#f6f6f6':'#fff'}">
                <router-link :to="`/user/${comment.author.loginname}`" class="avatar">
                <img :src="comment.author.avatar_url" alt="">
                </router-link>
               <div class="comment-content">
                    <p class="userinfo">
                        <span class="username">{{comment.author.loginname}}</span>
                        <span class="blue">&nbsp;&nbsp;.{{comments.indexOf(comment)+1}}楼</span>
                        <span class="blue">&nbsp;&nbsp;.{{comment.create_at | moment("from","now")}}</span>
                    </p>
                     <div v-html="comment.content" class="con"></div>
                      <div class="reply-all" :style="{display:replyId===comment.id && isShow?'block':'none'}">
                <quill-editor 
                v-model="replyContent" 
                ref="myQuillEditor" 
                :options="editorOption" 
                @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                @change="onEditorChanges($event)" >
            </quill-editor>
            <button @click="$emit('replyComment',comment.id,replyAllContent,clearReply)">提交</button>
            </div>
               </div>
                   
                   
                    <div class="reply-ups" v-if="islogin && comment.ups.length">
                        <a href="javascript:;" @click="$emit('ups',comment.id)">
                            <icon name="点赞"></icon>
                        </a>
                        <span>{{comment.ups.length}}</span>
                       
                        <a href="javascript:;" @click="showReply(comment.id,comment.author.loginname)">
                            <icon name="回复"></icon>
                        </a>
                    </div>
                    <div v-else-if="islogin && comment.ups.length===0" class="reply-ups">
                        <a href="javascript:;" @click="$emit('ups',comment.id)">
                            <icon name="点赞" class="up"></icon>
                        </a>
                        <a href="javascript:;" @click="showReply(comment.id,comment.author.loginname)">
                            <icon name="回复"></icon>
                        </a>
                    </div>
                    <div class="reply-ups" v-else-if="!islogin && comment.ups.length">
                        <a href="javascript:;">
                            <icon name="点赞"></icon>
                        </a>
                        <span>{{comment.ups.length}}</span>
                      
                    </div>
                    <div class="reply-ups" v-else>
                    </div>
               
            </li>
        </ul>
        <div v-if="islogin" class="add-comment">
            <p>评论</p>
            <quill-editor 
                v-model="content" 
                ref="myQuillEditor" 
                :options="editorOption" 
                @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                @change="onEditorChange($event)">
            </quill-editor>
            <button @click="$emit('addComment',allContent,clear)">提交</button>
        </div>
        <div v-else></div>
    </div>
    <div v-else>waiting...</div>
</template>

<script>
import axios from 'axios'
export default {
name:'comments',
props:['comments'],
data:()=>({
    content:null,
    allContent:null,
    replyContent:null,
    replyAllContent:null,
    editorOption:{},
    replyId:'',
    isShow:false
}),
computed:{
    islogin(){
        return sessionStorage.getItem('token')?true:false
    }
},
methods:{
    onEditorBlur(){//失去焦点事件
            },
    onEditorFocus(){//获得焦点事件
            },
    onEditorChange({ quill, html, text }){//内容改变事件
    this.allContent = quill.getText()
            },
            onEditorChanges({ quill, html, text }){//内容改变事件
             this.replyAllContent = quill.getText()
            },
   
    clear(){
        this.content = null
    },
    clearReply(){
        this.replyContent = null 
        this.isShow = false
    },
    showReply(id,name){
        this.replyId = id
        this.isShow = !this.isShow
        this.replyContent = `@${name}`
    },
    

}
}
</script>
<style lang="scss" scoped>
  .comments{
        width: 100%;
        background-color: #fff;
        >li:hover .up{
            display: block
        }
        .up{
            display: none;
        }
        >li{
            width: 100%;
            border-top: 1px solid #f0f0f0;
            display: flex;
            position:relative;
            transition: all 0.3s;
            >.comment-content{
                width: 80%;
            }
            >.avatar{
                width: 30px;
                height: 30px;
                border-radius: 5px;
                margin: 10px;
                >img{
                    width: 100%;
                    border-radius: 5px;
                }
            }
            .userinfo{
                padding: 10px;
            }
            .con{
                padding: 10px;
               
            }
            .con>.markdown-text img{
                    width: 70px;
            }
            .reply-all{
                width: 125%;
                position: relative;
                display: none;
                margin-left: -50px;
                >#reply{
                    width: 100%;
                    resize: none;
                    outline: none;
                    border: none;
                    background-color: rgba(0,0,0,0);
                }
                >button{
                    position: absolute;
                    display: block;
                    color: #fff;
                    background-color: #08c;
                    outline: none;
                    border:none;
                    padding: 5px 10px 5px 10px;
                    margin: 10px;
                    border-radius: 5px;
                    right: 0;
                    bottom: 20px;
                }
            }
            .username{
                font-weight: bold;
                
            }
            .blue{
                color: #08c;
                padding-left: 10px;
            }
           

        }
        
    }
    .reply-ups{
        position: absolute;
        right: 10px;
        top: 30px;
        display: flex;
        width: 80px;
        justify-content:flex-end;
        >a{
            display: block;
            width: 15px;
            height: 15px;
            margin-top: 4px; 
            >svg{
                display: block;
                width: 100%;
                height: 15px;
            }
        }
    }
.add-comment{
    width: 100%;
    background-color: #fff;
    margin-top: 10px;
    .ql-container{
        height: 300px;
        overflow-y: auto;
    }
    >p{
        width: 100%;
        background: #f6f6f6;
        padding: 10px;
        border-radius: 3px 3px 0 0;
    }
    >button{
        width: 60px;
        border-radius: 3px;
        background-color: #08c;
        color: #fff;
        padding: 3px 5px;
        border: none;
        margin: 10px
    }
}
</style>

