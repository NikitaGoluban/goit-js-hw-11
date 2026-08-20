import{a as i,S as u,i as l}from"./assets/vendor-DQvd0HNi.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const g="34730863-c268bffb7a5a82490d4aafc58";i.defaults.baseURL="https://pixabay.com/api/";function m(a){return i.get("",{params:{key:g,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0}}).then(t=>t.data)}const c=document.querySelector(".gallery"),d=document.querySelector(".loader-wrapper"),f=new u(".gallery a",{captionsData:"alt",captionDelay:250}),y=a=>{const t=a.map(s=>`<li class="gallery-item">
          <a href="${s.largeImageURL}" class="gallery-link">
            <img
              class="gallery-img"
              src="${s.webformatURL}"
              alt="${s.tags}"
              loading="lazy"
            />
          </a>  
          <div class="img-descr-wrapper">
            <p class="img-descr">
              <span class="descr-title">Likes</span>
              <span class="descr-text">${s.likes}</span>
            </p>
            <p class="img-descr">
              <span class="descr-title">Views</span>
              <span class="descr-text">${s.views}</span>
            </p>
            <p class="img-descr">
              <span class="descr-title">Comments</span>
              <span class="descr-text">${s.comments}</span>
            </p>
            <p class="img-descr">
              <span class="descr-title">Downloads</span>
              <span class="descr-text">${s.downloads}</span>
            </p>
          </div>
        </li>`).join("");c.insertAdjacentHTML("beforeend",t),f.refresh()},h=()=>{c.innerHTML=""},L=()=>{d.classList.remove("is-hidden")},b=()=>{d.classList.add("is-hidden")},p=document.querySelector(".form");p.addEventListener("submit",w);function w(a){a.preventDefault();const t=a.currentTarget.elements["search-text"].value.trim();if(t===""){l.error({position:"topRight",message:"Please enter your request in the search field!",messageColor:"black",messageSize:"16",backgroundColor:"yellow",closeOnClick:!0});return}h(),L(),m(t).then(s=>{if(s.hits.length===0){l.warning({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#ffffff",messageSize:"16",backgroundColor:"#EF4040",progressBarColor:"#B51B1B",position:"topRight",closeOnClick:!0});return}y(s.hits)}).catch(()=>{l.error({position:"topRight",message:"Sorry, something went wrong...Try later",messageColor:"black",messageSize:"18",backgroundColor:"yellow",closeOnClick:!0})}).finally(()=>{b()}),p.reset()}
//# sourceMappingURL=index.js.map
