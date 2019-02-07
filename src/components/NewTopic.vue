<template>
    <div class="new-topic">
        <p class="title-to"><router-link to="/">主页/</router-link>发布话题</p>
        <div class="all-con">
        <div class="choose-tab">
            <span>选择板块:</span>
            <select name="" id="tab" v-model="tab">
                <option value="choose">请选择</option>
                <option value="share">分享</option>
                <option value="ask">问答</option>
                <option value="job">招聘</option>
                <option value="dev">客户端测试</option>
            </select>
            </div>
            <div class="title-con">
            <input type="text" name="" id="title-input" placeholder="标题字数 10 字以上" v-model="title">
            </div>
            <quill-editor 
                v-model="content" 
                ref="myQuillEditor" 
                @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                @change="onEditorChange($event)" class="editor-topic">
            </quill-editor>
            <router-link to="/topics/create" class="commit" v-if="!isUpdate"><span @click="createTopic">提交</span></router-link>
            <router-link :to="`/topic/${$route.params.topicid}`" class="commit" v-else><span @click="updateTopic">提交</span></router-link>
           
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import draftToMarkdown from 'draftjs-to-markdown';
import marked from 'marked'
export default {
 name:'newtopic',
 data:()=>({
     content:null,
     allContent:null,
     title:'',
     tab:'choose',
     id:''
 }),
 computed:{
     isUpdate(){
         return this.$router.history.current.path.indexOf('update')!== -1?true:false
     }
 },
methods:{
    onEditorBlur(){//失去焦点事件
            },
            onEditorFocus(){//获得焦点事件
            },
            onEditorChange({ quill, html, text }){
                //内容改变事件
              this.allContent = quill.getText()
               console.log(quill.getText());
               
               
            },
            escapeStringHTML(str) {
            str = str.replace(/</g,'<');
            str = str.replace(/>/g,'>');
            return str;
        },

    createTopic(){
        if(this.allContent.trim()){
            axios.post(`https://cnodejs.org/api/v1/topics`,{accesstoken:sessionStorage.getItem('token'),title:this.title,tab:this.tab,content:this.allContent}).then(res=>{
                this.id = res.data.topic_id
            })
        }
    },
    updateTopic(){
       
        if(this.content.trim()){
            console.log(this.content);
            
            axios.post(`https://cnodejs.org/api/v1/topics/update`,{accesstoken:sessionStorage.getItem('token'),title:this.title,tab:this.tab,content:this.content,topic_id:this.$route.params.topicid}).then(res=>{
                console.log('true');
                
            })
        }
    },
    getTopic(){
        axios.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.topicid}`).then(res=>{
            this.tab = res.data.data.tab
            this.title = res.data.data.title
            console.log(res.data.data.content);
            
            this.content = res.data.data.content
        })
    }

},
created(){
    console.log(this.$router.history.current.path);
    if(this.isUpdate){
        this.getTopic()
    }
}
}
</script>

<style lang="scss">
.all-con{
    background-color: #fff;
    padding-bottom: 10px;
}
.title-to{
    width: 100%;
    background-color: #f6f6f6;
    margin: 0 auto;
    padding: 10px 10px;
    border-radius: 3px 3px 0 0 ;
    >a{
        color: #80bd01;
        text-decoration: none;
    }
}
.choose-tab{
    width: 100%;
    background-color: #fff;
    
    >span{
        padding: 10px 20px 10px 10px;
    }
    >#tab{
        width: 220px;
        margin: 10px;
        border: 1px solid #ccc;
        border-radius: 3px;
        outline: none;
        line-height: 30px;
        height: 30px;
        background-color: #fff;

    }
}
.title-con{
    width: 100%;
    background-color: #fff;
    #title-input{
        width: 98%;
        margin: 10px;
        box-shadow: 0 0 2px rgba(60,60,60,.5);
        height: 30px;
        line-height: 30px;
        outline: none;
        border: 1px solid #ccc;
        border-radius: 3px;
        text-indent: 10px;
    }
}
.editor-topic .ql-container{
    height: 400px;
    overflow-y: auto
}
.commit{
    display: block;
    width: 60px;
    color: #fff;
    background-color: #08c;
    border-radius: 3px;
    padding: 3px 5px;
    text-decoration: none;
    text-align: center;
    margin:10px;
}
</style>

