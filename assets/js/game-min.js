module=(()=>{"use strict";alert("Para una mejor experiencia presiona la tecla F11 (Pantalla completa)");let e=[],a=["C","D","H","S"],l=["A","J","Q","K"],r=[],t=(a=2)=>{e=o(),r=[];for(let l=0;l<a;l++)r.push(0);i.forEach(e=>e.innerText=0),n.forEach(e=>e.innerHTML=""),d.disabled=!1,s.disabled=!1};document.querySelector("#btnNewGame");let d=document.querySelector("#btnTakeCard"),s=document.querySelector("#btnStop"),n=document.querySelectorAll(".divCards"),i=document.querySelectorAll("small"),o=()=>{e=[];for(let r=2;r<=10;r++)for(let t of a)e.push(r+t);for(let d of a)for(let s of l)e.push(s+d);return _.shuffle(e)},c=()=>{if(0===e.length)throw"No hay cartas en el deck";return e.pop()},u=e=>{let a=e.substring(0,e.length-1);return isNaN(a)?"A"===a?11:10:1*a},$=(e,a)=>(r[a]=r[a]+u(e),i[a].innerText=r[a],r[a]),p=(e,a)=>{let l=document.createElement("img");l.src=`assets/cartas/${e}.png`,l.classList.add("cards"),n[a].append(l)},h=()=>{let[e,a]=r;setTimeout(()=>{a===e?alert("Iguales"):e>21?alert("Has perdido :["):a>21?alert("Has Ganado!"):alert("Has perdido :[")},500)},f=e=>{let a=0;do{let l=c();a=$(l,r.length-1),p(l,r.length-1)}while(a<e&&e<=21);h()};return d.addEventListener("click",()=>{let e=c(),a=$(e,0);p(e,0),a>21?(console.warn("Has perdido"),d.disabled=!0,s.disabled=!0,f(a)):21===a&&(console.warn("21 Felicidades has ganado"),d.disabled=!0,s.disabled=!0,f(a))}),s.addEventListener("click",()=>{d.disabled=!0,s.disabled=!0,f(r[0])}),{nuevoJuego:t}})();