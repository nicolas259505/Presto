let navbar = document.querySelector('#navbar');
let links = document.querySelectorAll('.nav-link');
let logoNavbar = document.querySelector('#logoNavbar');
let lightsaber = document.querySelector('#lightsaber');
let collapse = document.querySelector('#collapse');
let check = false;



window.addEventListener('scroll', () => {
    let scrolled = window.scrollY;

    if (scrolled > 0) {
        navbar.classList.remove('bg-black');
        navbar.classList.add('bg-yellow');
        collapse.classList.remove('bg-black');
        collapse.classList.add('bg-yellow');
        navbar.style.height = '70px';
        //cambio il colore dei link della navbar in nero quando avviene lo scroll 
        links.forEach((link) => {
            link.style.color = 'var(--black)';
        });
        logoNavbar.src = "http://127.0.0.1:5500/media/logo-b.png";
        lightsaber.src = "http://127.0.0.1:5500/media/lightsaber-b.png";

    } else {
        navbar.classList.add('bg-yellow');
        navbar.classList.add('bg-black');
        collapse.classList.add('bg-yellow');
        collapse.classList.add('bg-black');
        navbar.style.height = '140px';
        //cambio il colore dei link della navbar in giallo quando la navbar torna al suo posto
        links.forEach((link) => {
            link.style.color = 'var(--yellow)';
        });
        logoNavbar.src = "http://127.0.0.1:5500/media/logo-y.png";
        lightsaber.src = "http://127.0.0.1:5500/media/lightsaber-y.png";



    }
})

lightsaber.addEventListener('click', () => {
    if (check == false) {

        lightsaber.style.transform = 'rotate(-90deg)';
        check = true;

    } else {

        lightsaber.style.transform = 'rotate(0deg)';
        check = false;

    }
})

// chiamate asincrone:
// setInterval(): crea un loop infinito in cui possiamo gestire la durata delle singole interazioni
// il setinterval è una funzione che vuole due parametri . Il primo parametro è la callback
// il secondo parametro è l'intervallo di tempo che deve passare tra una iterazione e l'altra
// clearInterval():pulire l'intervallo
// setTimeout: fa partire un blocco di istruzioni dopo tot secondi
let firstNumber = document.querySelector('#firstNumber');
let secondNumber = document.querySelector('#secondNumber');
let thirdNumber = document.querySelector('#thirdNumber');

let confirm = true;

function createInterval(n, element, time) {
    let counter = 0;

    let interval = setInterval(() => {
        if (counter < n) {
            counter++
            element.textContent = counter;

        } else {
            console.log('Adesso mi fermo');
            clearInterval(interval);
        }
    }, time);

    setTimeout(() => {
        confirm = true;
    }, 8000);

}

createInterval(100, firstNumber, 100);
createInterval(200, secondNumber, 50);
createInterval(300, thirdNumber, 20);

//IntersectioonObserver: è una Classe del browser che si occupa di far scattare una funzione nel momento in cui sul browser sono visibili gli elementi HTML che noi gli indichiamo 
// new: keyword che mi permette di GENERARE un oggetto partendo da una Classe

let observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting && confirm) {
            createInterval(100, firstNumber, 100);
            createInterval(200, secondNumber, 50);
            createInterval(300, thirdNumber, 20);
            confirm = false;
        }
    });
});

observer.observe(firstNumber);

let reviews = [
    { user: 'Matteo', description: `Il più bel sito del mondo`, rank: 5},
    { user: 'Mario', description: `Veramente non mi da di niente`, rank: 1 },
    { user: 'Nicolas', description: `Mi piace tranne per Star Trek`, rank: 3 },
    { user: 'Celeste', description: `Star Wars è meglio`, rank: 4 },
];

let swiperWrapper = document.querySelector('.swiper-wrapper');

reviews.forEach((recensione) => {
    let div = document.createElement('div');
    div.classList.add('swiper-slide');
    div.innerHTML = `<div class="card-review">
                                <p class="lead text-center">${recensione.description}</p>
                                <p class="h4 text-center">${recensione.user}</p>
                                <div class="d-flex justify-content-center star">

                                </div>
                            </div>`;
    swiperWrapper.appendChild(div);
});

let stars = document.querySelectorAll('.star');

// <i class="fa-solid fa-star"></i>

stars.forEach((star, index)=>{

    for(let i = 1; i <= reviews[index].rank; i++ ){
        let icon = document.createElement('i');
        icon.classList.add('fa-solid', 'fa-star');
        star.appendChild(icon);
    }

    let difference = 5 - reviews[index].rank;

      for(let i = 1; i <= difference; i++ ){
        let icon = document.createElement('i');
        icon.classList.add('fa-regular', 'fa-star');
        star.appendChild(icon);
    }

})


// Swiper
const swiper = new Swiper('.swiper', {
    // Optional parameters
    effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
          loop: true},
    autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        }
    
});