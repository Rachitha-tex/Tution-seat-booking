 const container=document.querySelector('.container');
 const screen=document.querySelector('.screen');
 const count=document.querySelector('#count');
 const total=document.querySelector('#total');
 const seat=document.querySelectorAll('.row .seat:not(.occupied)');
 const selectTution=document.querySelector("#tution");

 let subjectFee=+selectTution.value;

 populateUI();

 function setTutionData(price){
    localStorage.setItem('tutionFee',price);
 }
 //count and price
function updateSelectedCount(){
    const selectedSeats=document.querySelectorAll( '.row .seat.selected' );

  const seatsIndex=[...selectedSeats].map(function(seats){
      return [...seat].indexOf(seats);//selecting the index of seat
  });
  localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));

    
    const selectedCount=selectedSeats.length;
    
    count.innerText=selectedCount;
    total.innerText=selectedCount*subjectFee;
}

selectTution.addEventListener('change',(e)=>{
    subjectFee=+e.target.value;

    setTutionData(e.target.value);
    updateSelectedCount();
})

function populateUI(){
    const selectedSeats=JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats !== null && selectedSeats.length>0){
        seat.forEach((seats,index)=>{
            if(selectedSeats.indexOf(index)>-1){
                seats.classList.add('selected');
            }
        })
    }

    const selectedTutionIndex=localStorage.getItem('selectedTutionIndex');
    if(selectedTutionIndex!==null){
        tutSelect.selectedIndex=selectedTutionIndex;
    }
}

//selecting the seat 
container.addEventListener('click',(e)=>{
   if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
      e.target.classList.toggle('selected');

      updateSelectedCount();
   }
})
updateSelectedCount();