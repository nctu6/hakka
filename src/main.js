import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';
import store from './store';
import App from './App.vue'
import homepage from './components/homepage.vue'
import content from './components/content.vue'
import './assets/global.css'; // 或 './styles/global.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import VueGtag from 'vue-gtag'

const routes = [
    { 
        path: '/', 
        component: homepage, 
        meta: { title: '中央大學電子報'} 
    },
    { 
        path: `/${process.env.VUE_APP_PAPER_ID}-:subId`, 
        component: content, 
        meta: { title: (route) => `中大客家學院電子報第 ${process.env.VUE_APP_PAPER_ID} 期第 ${route.params.subId} 篇`} 
    },
]


const router = createRouter({
    history: createWebHistory(`/Hakka_ePaper/paper/paper${process.env.VUE_APP_PAPER_ID}`),
    routes,
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        if (to.meta.savedPosition) {
            return { left: 0, top: to.meta.savedPosition };
        }
        return { left: 0, top: 0};
    }
});

router.afterEach((to) => {
    // 使用路由的meta欄位設置標題
    const title = typeof to.meta.title === 'function' ? to.meta.title(to) : to.meta.title;
    document.title = title || '中央大學電子報';
});

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');

app.use(VueGtag, {
    config: {
        id: process.env.VUE_APP_GA_ID
    }
})