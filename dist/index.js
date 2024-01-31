!function(){"use strict";const t={},e=(e,n)=>{t[e]=n},n=(e,n)=>{t[e]=void 0,n.querySelector(`[data-component="${e}"]`)&&(n.querySelector(`[data-component="${e}"]`).innerHTML="")},o=async(e,n,a,r)=>{console.log(t);const c=r?await t[r](e,n,a):e.cloneNode(!0);return[...c.querySelectorAll("[data-component]")].forEach((async e=>{const{component:r}=e.dataset;if(void 0!==t[r]){const t=await o(e,n,a,r);e.replaceWith(t)}})),c};var a=()=>{const t=document.getElementById("root"),e=t.querySelector('[data-component="404"]').cloneNode(!0);t.querySelector('[data-component="app"]').innerHTML="",t.querySelector('[data-component="detail"]').innerHTML="",t.querySelector('[data-component="posts"]').innerHTML="",e.innerHTML="",e.appendChild(document.getElementById("template-404").content.firstElementChild.cloneNode(!0)),t.querySelector('[data-component="404"]').replaceWith(e)};const r=({attributes:t},e)=>{const n=document.getElementById("template-post").content.firstElementChild.cloneNode(!0);return console.log(t),t.tag.forEach((t=>{n.querySelector(".tag").innerHTML+=`<label><mark>#${t}</mark></label>`})),n.querySelector(".post").dataset.index=e+1,n.querySelector(".title").textContent=t.title,n.querySelector(".summary").textContent=t.summary,n.querySelector(".date").textContent=t.date.slice(0,10),n};var c=async(t,e,n)=>{const o=await e("posts"),a=t.cloneNode(!0);return a.innerHTML="",o.map(((t,e)=>r(t,e))).forEach((t=>a.appendChild(t))),a.addEventListener("click",(t=>{const e=t.target.closest("article.post");if(e){const t=e.getAttribute("data-index");n(`/posts/${t}`)}})),a};const s=/:(\w+)/g;const i={attributes:{title:"존재하지않는 포스트입니다."},htmlBody:""};var l=async(t,e,n)=>{const o=(await n("posts"))[Number(t)-1],{attributes:a,htmlBody:r}=o||i,c=document.getElementById("template-detail").content.firstElementChild.cloneNode(!0);c.querySelector(".markdown-body").innerHTML=r,c.querySelector(".title").textContent=a.title,c.querySelector(".date").textContent=a.date?.slice(0,10);const s=e.cloneNode(!0);return s.innerHTML="",s.appendChild(c),s};const d={posts:[],isPending:!0};var p=async t=>{try{if(await(async()=>{try{if(!d.isPending)return;const t=await fetch("./data/react.json");if(!t.ok)throw new Error("Failed to fetch JSON file");const{posts:e}=await t.json();d.posts=e,d.isPending=!1}catch(t){console.error("Error fetching JSON file:",t)}})(),void 0===d[t])throw new Error("undefined key");return d[t]}catch(t){console.error("Error load state:",t)}};e("app",(t=>{const e=t.cloneNode(!0);return e.innerHTML="",e.appendChild(document.getElementById("template-header").content.firstElementChild.cloneNode(!0)),e}));const u=(()=>{const t=[];let e=()=>{},n=null;const a={},r=(a,r)=>{const{hash:c}=window.location;if(n===c)return;n=c;const s=document.getElementById("root"),i=t.find((t=>{const{testRegExp:e}=t;return e.test(c)}));if(!i)return void e();const l=((t,e)=>{const n={};if(0===t.params.length)return n;const o=e.match(t.testRegExp);return o.shift(),o.forEach(((e,o)=>{const a=t.params[o];n[a]=e})),n})(i,window.location.hash);i.component(s,l),((t,e,n)=>{window.requestAnimationFrame((async()=>{console.log("원본 rootElement >>>> ",t);const a=await o(t,e,n);console.log("교체 newRootElement >>>>>>>>>>>>>>>  ",a),t.replaceWith(a)}))})(s,a,r)};return a.addRoute=(e,n)=>{const o=[],r=e.replace(s,((t,e)=>(o.push(e),"([^\\/]+)"))).replace(/\//g,"\\/");return t.push({testRegExp:new RegExp(`^${r}$`),component:n,params:o}),a},a.setNotFound=t=>(e=t,a),a.navigate=t=>{window.location.hash=t},a.start=(t,e)=>{window.addEventListener("hashchange",(()=>{console.log("hash changed !"),r(t,e)})),window.location.hash||(window.location.hash="#/posts"),r(t,e)},a})();u.addRoute("#/posts",(t=>{e("posts",c),n("detail",t),n("404",t)})).addRoute("#/posts/:id",((t,{id:o})=>{e("detail",((...t)=>l(o,...t))),n("posts",t),n("404",t)})).setNotFound((()=>{a()})).start((async t=>await p(t)),(t=>{window.location.hash=t}));document.body.addEventListener("click",(t=>{const{target:e}=t;if(e.matches("a[data-navigation]")){const{navigate:t}=e.dataset;u.navigate(t)}}))}();
//# sourceMappingURL=index.js.map
