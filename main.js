let navbar = document.querySelector('#navbar');
let links = document.querySelectorAll('.nav-link');
let logoNavbar = document.querySelector('#logoNavbar')



window.addEventListener('scroll',()=>{
   let scrolled = window.scrollY;

   if(scrolled > 0){
    navbar.classList.remove('bg-black');
    navbar.classList.add('bg-yellow');
    navbar.style.height= '70px';
   //cambio il colore dei link della navbar in nero quando avviene lo scroll 
    links.forEach((link)=>{
        link.style.color = 'var(--black)';
    });
    logoNavbar.src = "http://127.0.0.1:5500/media/logo-b.png";

   }else{
    navbar.classList.add('bg-yellow');
    navbar.classList.add('bg-black');
    navbar.style.height= '140px';
    //cambio il colore dei link della navbar in giallo quando la navbar torna al suo posto
    links.forEach((link)=>{
        link.style.color = 'var(--yellow)';
    });
    logoNavbar.src = "http://127.0.0.1:5500/media/logo-y.png";


   }
})