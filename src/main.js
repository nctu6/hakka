import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';
import store from './store';
import App from './App.vue'
import homepage from './components/homepage.vue'
import content from './components/content.vue'
import './assets/global.css'; // 或 './styles/global.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const routes = [
    { path: '/', component: homepage },
    { path: `/${process.env.VUE_APP_PAPER_ID}-:subId`, component: content },
]


const router = createRouter({
    history: createWebHistory(`/Hakka_ePaper/paper/paper${process.env.VUE_APP_PAPER_ID}`),
    routes,
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        return { left: 0, top: 0};
    }
});


const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
