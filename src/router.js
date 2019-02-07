import Vue from 'vue'
import Router from 'vue-router'
import TopicList from './components/TopicList'
import ShowInfo from './components/ShowInfo'
import UserInfo from './components/UserInfo'
import TopicDetail from './components/TopicDetail'
import NewTopic from './components/NewTopic'
import ReadMore from './components/ReadMore'
Vue.use(Router)
const router = new Router({
    routes:[{
        path:'/',
        components:{
            default:TopicList,
            user: ShowInfo
            }
    },{
        path:'/:tab',
        components:{
            default:TopicList,
            user:ShowInfo
        }
    },{
        path:'/user/:username',
        components:{
            default:UserInfo,
            user:ShowInfo}  
    },{
        path:'/topic/:topicid',
        components:{
            default:TopicDetail,
            user:ShowInfo}
    },{
        path:'/topics/create',
        component:NewTopic
    },{
        path:'/topics/:username/:status',
        components:{
           default: ReadMore,
           user:ShowInfo
        }
    },{
        path:'/topic/:topicid/update',
        component:NewTopic
    }],
    mode:'history'
})
export default router