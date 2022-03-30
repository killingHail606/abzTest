var h=Object.defineProperty;var _=(e,t,o)=>t in e?h(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o;var l=(e,t,o)=>(_(e,typeof t!="symbol"?t+"":t,o),o);import{c as y,a as k,b as i,d as v,e as P,r as b,o as S,f as U,g as T}from"./vendor.5a140c39.js";const C=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function o(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerpolicy&&(r.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?r.credentials="include":s.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=o(s);fetch(s.href,r)}};C();const w="modulepreload",p={},$="/",u=function(t,o){return!o||o.length===0?t():Promise.all(o.map(n=>{if(n=`${$}${n}`,n in p)return;p[n]=!0;const s=n.endsWith(".css"),r=s?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${n}"]${r}`))return;const a=document.createElement("link");if(a.rel=s?"stylesheet":w,s||(a.as="script",a.crossOrigin=""),a.href=n,document.head.appendChild(a),s)return new Promise((g,f)=>{a.addEventListener("load",g),a.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${n}`)))})})).then(()=>t())},A=[{path:"/",redirect:{name:"index"},component:()=>u(()=>import("./default.9fa0f393.js"),["assets/default.9fa0f393.js","assets/default.24a542d4.css","assets/plugin-vue_export-helper.21dcd24c.js","assets/vendor.5a140c39.js"]),children:[{name:"index",path:"",component:()=>u(()=>import("./Index.2f736a5d.js"),["assets/Index.2f736a5d.js","assets/Index.2a07bb68.css","assets/plugin-vue_export-helper.21dcd24c.js","assets/vendor.5a140c39.js"])}]}],L=y({history:k(),scrollBehavior(){return{top:0,left:0,behavior:"smooth"}},routes:A}),d="https://frontend-test-assignment-api.abz.agency/api/v1",O=`${d}/token`;i.interceptors.response.use(e=>e,e=>{const t=e.config;return e.response.status===401?(t._retry=!0,i.get(O).then(o=>{if(o.status===200){const{data:n}=o;return localStorage.setItem("token",n.token),i.defaults.headers.common.Authorization=`Token ${localStorage.getItem("token")}`,i(t)}}).catch(o=>{console.error(o)})):Promise.reject(e)});i.interceptors.request.use(e=>(e.headers&&(e.headers.Authorization=`Token ${localStorage.getItem("token")}`),e));class I{constructor(){l(this,"apiClient");var t;this.apiClient=i.create({baseURL:d,headers:{Accept:"application/json","Content-Type":"application/json",Token:(t=localStorage.getItem("token"))!=null?t:""}})}getPositions(){return this.apiClient.get("/positions")}getUsers(t){return this.apiClient.get("/users",{params:{page:t,count:6}})}registerUser(t){var o;return this.apiClient.post("/users",t,{headers:{Accept:"*/*","Content-Type":"multipart/form-data",Token:(o=localStorage.getItem("token"))!=null?o:""}})}getToken(){return this.apiClient.get("/token")}}const c=new I,R=()=>({users:[],page:1}),E={users:e=>e.users,page:e=>e.page},j={setUsers(e,t){e.users.push(...t)},setPage(e,t){t?e.page=1:e.page+=1}},x={async fetchUsers({commit:e,state:t}){const o=await c.getUsers(t.page);return console.log(o.data.users),e("setUsers",o.data.users),o.data.total_pages},async fetchUser({commit:e,dispatch:t,state:o}){e("setPage",!0),o.users.length=0,t("fetchUsers")},async registerUser({commit:e,dispatch:t},o){const n=new FormData;n.append("name",o.name),n.append("email",o.email),n.append("phone",o.phone),n.append("position_id",o.position_id),n.append("photo",o.photo);try{const s=await c.registerUser(n);return t("fetchUser"),s.data}catch(s){return s.response.data}}};var z=Object.freeze(Object.defineProperty({__proto__:null,state:R,getters:E,mutations:j,actions:x},Symbol.toStringTag,{value:"Module"}));const D=()=>({positions:[]}),V={positions:e=>e.positions},B={setPositions(e,t){e.positions=t}},N={async fetchToken({commit:e}){const t=await c.getToken();localStorage.setItem("token",t.data.token)},async fetchPositions({commit:e}){const t=await c.getPositions();e("setPositions",t.data.positions)}},m=[async e=>{await Promise.all([e.dispatch("fetchToken"),e.dispatch("fetchPositions")])}];var q=Object.freeze(Object.defineProperty({__proto__:null,state:D,getters:V,mutations:B,actions:N,plugins:m},Symbol.toStringTag,{value:"Module"}));const F=v({modules:{users:z,info:q},plugins:[...m]});const M=P({setup(e){return(t,o)=>{const n=b("RouterView");return S(),U(n)}}});T(M).use(L).use(F).mount("#app");
