// Catturo l'opener

let opener = document.querySelector('.opener');
let circle = document.querySelector('.circle');

let teachers = [
    {name: 'Matteo', description: 'Docente Frontend di Hackademy 69', url:'./media/Matteo.png'},
    {name: 'Marco', description: 'Docente Frontend e responsabile Hackademy', url:'./media/Marco.png'},
    {name: 'Nicola', description: 'Docente Frontend e noto sex-symbol', url:'./media/Nicola.png'},
    {name: 'Davide', description: 'Docente Backend e giocatore di ruolo', url:'./media/Davide.png'},
];

teachers.forEach( (docente)=>{
    let div = document.createElement('div');
    div.classList.add('moved');
    div.style.backgroundImage = `url(${docente.url})`;
    circle.appendChild(div);
})

// catturo i moved
let movedDivs = document.querySelectorAll('.moved');

let check = false;

let flipCard = document.querySelector('.flip-card');


// creo l'evento che al click del + mi apre i moved e me li posiziona agli angoli selezionati
opener.addEventListener('click',()=>{
    
    if(check == false){
        
        
        opener.style.transform = `rotate(45deg)`;
        
        movedDivs.forEach((moved, i)=>{
            // Calcolo l'angolo in cui posizionare i moved, facendo 360 * l'indice quindi0,1 e così via, e li divido per la lunghezza del moveDivs, così calcolerà in automatico dove posionare ogni pallino 
            let angle = (360 * i) / movedDivs.length;
            
            // gli applico lo stile con rotate per ruotarlo e posizionarlo e translate per spostarlo tutto a destra
            moved.style.transform = `rotate(${angle}deg)  translate(150px) rotate(-${angle}deg)`;
            
            check = true;
        })
    }else{
        check = false; 
        opener.style.transform = '';
        movedDivs.forEach((moved, i)=>{
            
            
            // fa tornare al posto originario i pallini
            moved.style.transform = '';
        });

        flipCard.classList.add('d-none');
        
        
    }
    
    
    
});

let innerFace = document.querySelector('.inner-face');
let cardName = document.querySelector('#card-name');
let cardDescription = document.querySelector('#card-description');

movedDivs.forEach( (moved, i) =>{
    moved.addEventListener('click',()=>{

        flipCard.classList.remove('d-none');

        let docente = teachers[i];

        innerFace.style.backgroundImage = `url(${docente.url})` ;
        cardName.innerHTML = docente.name;
        cardDescription.innerHTML = docente.description;

    });
})