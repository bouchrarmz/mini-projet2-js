const nom = document.getElementById('nom')
const montant = document.getElementById('montant')
const selectCat= document.getElementById('cat')
const total = document.getElementById('total')
const liste = document.querySelector('#liste')
const form= document.querySelector('#form')
const error= document.querySelector('#erreur')
 const filters=document.querySelector("#filtres")
 const recherche=document.querySelector('#recherche')
 const stat=document.querySelector('#stats')
const regexNom = /^[A-Za-zÀ-ÿ\s-]{2,}$/;
// const regexmontant= 
let depenses = [{ id: 1, nom: "Café", montant: 12, cat: "food" }, { id: 2, nom: "Tram", montant: 8, cat: "transport" }];
// const a = document.querySelectorAll(".filtre");
// const b =document.getElementsByClassName("filtre");
// // console.log(a.length );
// // console.log(b.length );
// const n = document.createElement("button");
//  n.className = "filtre";
//   document.querySelector("#filtres").append(n)
// console.log(a.length );
// console.log(b.length );
// console.log(a.forEach)
// console.log(b.forEach);
//  console.log (liste.children.length)
//  console.log(liste.childNodes.length)
//  console.log (liste.firstChild)
function afficher(tableau){
    liste.innerHTML=''
     tableau.forEach(elem => {
    const li= document.createElement('li')
    li.dataset.id = elem.id 
    li.textContent= elem.nom +'.'+ elem.montant+'DH'
    const button= document.createElement('button')
    button.classList.add('suppr')
    const span =document.createElement('span')
    span.textContent='🗑'
    button.append(span)
    li.append(button)
    liste.append(li) 
    })
    total.textContent= "Total :"+tableau.reduce((sum ,prix)=>sum+prix.montant ,0);
}
afficher(depenses)
// afficher(depenses)
form.addEventListener('submit' ,function(e){
      e.preventDefault()
        // 
       const nomexist=depenses.map((d) => d.nom.toLowerCase()).includes(nom.toLowerCase())
       if (nomexist){
              error.textContent=' Cette dépense existe déjà '
       }
      if(!regexNom.test(nom.value.trim())|| montant.value<= 0 ){
      error.textContent=' LES CHEMPES INVALIDE  '
      }
      else{ depenses. push({ id: Date.now(),nom:nom.value.trim(),
         montant:Number(montant.value) ,
          cat:selectCat.value })}
          console.log(depenses)
form.reset()
 afficher(depenses)

})

liste.addEventListener('click' , function(e){
     const btnclick = e.target.closest('.suppr')
    if(btnclick){
        const elemtrget= e.target.closest('li')
        const id= Number(elemtrget.dataset.id)
       depenses=depenses.filter((dep)=>dep.id!== id )
         afficher(depenses)
         console.log(depenses)
    }
})

function affichercat(tableau){
    const filtre=document.querySelectorAll(".filtre")
filtre.forEach((cati)=>{
    cati.addEventListener('click' , function(){
        if(cati.dataset.cat==='tous'){
            afficher(tableau)}
   else{
    const ctego=tableau.filter((ct)=>ct.cat===cati.dataset.cat)
     afficher(ctego)
   }
    })
})
}
 affichercat(depenses)
 function appliquer(tableau){
    recherche.addEventListener('input', function(){
     const recherchnom=recherche.value.toLowerCase()
     const resultat= tableau.filter((nm)=>nm.nom.toLowerCase().includes(recherchnom))
      afficher(resultat);

    })

 }
 appliquer(depenses)
 function stats(tableau) {
    const montants = tableau.map((m)=>m.montant)
    const sts=Math.max(...montants)
    stat.textContent="stats :"+sts
 }
 stats(depenses)
 afficher(depenses)

 




