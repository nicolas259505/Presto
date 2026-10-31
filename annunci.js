// .json: Javascript Object Notification,

//API: chiavi che ci permettono di raggiungere un .json online

// fetch(): Chiamata asincrona che ci permette di collegarci ad un json e da esso estrarre il dato sotto forma di promessa
//.then(): Questo metodo permette di convertire la Promise nel dato Strutturale e di poterlo utilizzare come tale su JS


//1. fetch()= collego al .json e ne ottengo una promise
//2. then()= converte la Promise in un dato Strutturale JS
//3. then()= utilzzare il dato ottenuto

//.json(): metodo delle Promise che mi permette di convertirla in Oggetto JS




fetch('./annunci.json').then((response) => response.json()).then((data) => {
    
    data.sort((a, b)=> a.price - b.price);
    
    let radioWrapper = document.querySelector('#radioWrapper');
    let cardWrapper = document.querySelector('#cardWrapper');

    
    function radioCreate() {
        let categories = data.map((annuncio) => annuncio.category);
        console.log(categories);
        
        // let uniqueCategories = [];
        
        // categories.forEach((category) => {
            
        
        //     if (!uniqueCategories.includes(category)){
        //         uniqueCategories.push(category);
        //     }
        // });
        
        // Set(): Classe che mi restituisce, partendo da un array, un nuovo oggetto Set il quale contiene solo valori univoci
        // Array.from(): mi permette di convertire un array-like in un array
        
        let uniqueCategories = Array.from(new Set(categories));
        console.log(uniqueCategories);
        
        uniqueCategories.forEach((category) => {
            let div = document.createElement('div');
            div.classList.add('form-check');
            div.innerHTML = `    <input class="form-check-input" type="radio" name="categories" id="${category}"><label class="form-check-label" for="${category}">${category}</label>`;
            radioWrapper.appendChild(div);
        });
    }
    radioCreate();

    // Funzione che serve per limitare la parola nella scheda a 15 caratteri
    function troncateWord(string){
        if(string.length > 15){
            return string.split(' ')[0] + '...';
        }else{
            return string;
        }
    }
    

    // funzione che serve a creare la scheda automaticamente per ogni oggetto nell'array,come elemento della funzione in questo caso viene utilizzato data, ovvero il file del json da dove prenderemo tutti i dati degli oggetti contenuti in esso
    function showCards(array) {
        
        cardWrapper.innerHTML = '';
        array.forEach((annuncio) => {
            let div = document.createElement('div');
            div.classList.add('card-custom');
            div.innerHTML =
            `<p class="h2" title="${annuncio.name}">${troncateWord(annuncio.name)}</p>
             <p class="h4">${annuncio.category}</p>
             <p class="lead">${annuncio.price} €</p>`;
             cardWrapper.appendChild(div);
        });
        
    }

    showCards(data);

    // Funzione per creare il filtro per categoria, se diverso dal filtro All allora mostrerà la categoria che verrà selezionata tramite il bottone dalla persona,dopo avere creato la funzione filter, verrà richiamata la funzione showcards() con all'interno il nuovo array che si crea e mostra solo gli array appartenenti alla categoria selezionata

    function filterByCategory(categoria){

        if(categoria != 'All'){

            
                    let filtered = data.filter((annuncio)=> annuncio.category == categoria );
                    showCards(filtered);


        }else{
            showCards(data);
        }



    }

// Qui andiamo a prenderci tutti i bottoni col selectorAll, e ci applichiamo il forEach, quindi per ogni bottone al click, verrà selezionata la categori in base all'id che abbiamo applicato al bottone stesso 
    let radioButtons = document.querySelectorAll('.form-check-input');

    radioButtons.forEach((button)=>{
        button.addEventListener('click', ()=>{
            filterByCategory(button.id);
        })
    });

    let priceInput = document.querySelector('#priceInput');
    let priceValue = document.querySelector('#priceValue');

    function setPriceInput(){

        // Dopo aver catturato l'input,voglio settare come proprietà max dello stesso, il valore max tra i price di ogni prodotto. Per farlo avrò bisogno di un array che contenga solo i prezzi, a quel punto lo ordino in maniera crescente/decrescente e prendermi l'elemento con il valore più alto.
        // Mettendo il + davanti trasformo la stringa in numeri

        let prices = data.map((annuncio)=> +annuncio.price);
        prices.sort( ( a, b) => a - b);
        let maxPrice = Math.ceil(prices.pop());
        priceInput.max = maxPrice;
        priceInput.value = maxPrice;
        priceValue.innerHTML = maxPrice;


    }

    setPriceInput();


    // creo la funzione che effettivamente filtri per prezzo, quindi partendo dall'array filtro passandogli il dato annuncio, e quindi faccio si che vengano mostrate le card minori o ugiali al price Value che sto selezionando in quel momento

    function filterByPrice(){

        let filtered = data.filter((annuncio) => +annuncio.price <= priceInput.value );

        showCards(filtered);

    }

    // Qui vado a mettere l'evento sulla barra a scorrimento del prezzo, cio' all'input cioè al movimento della barra priceValue, diventa uguale al valore che si sta selezionando e richiamo la funzione che filta per prezzo, per far si che vengano filtrati e mostrati gli oggetti che sono in quel range di prezzo
    priceInput.addEventListener('input',()=>{
        priceValue.innerHTML = priceInput.value;
        filterByPrice();
    });

    let wordInput = document.querySelector('#wordInput');

    function filteredByWord(parola){

        let filtered = data.filter((annuncio)=> annuncio.name.toLowerCase().includes(parola.toLowerCase()));

        showCards(filtered);

    }

    wordInput.addEventListener('input', ()=>{
        filteredByWord(wordInput.value);
    });
});

