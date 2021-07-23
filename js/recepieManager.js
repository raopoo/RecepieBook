const createRecepie = (recepieId,recepieName,ingredients,procedure) => {
  let displayRecepie = ``;
    displayRecepie = `<li class="list-group-item">
    <div class="card" data-current="${recepieId}" >
      <div class="card-body">
        <h5 class="card-title name">${recepieName}</h5>
        <p class="card-text ing">${ingredients}</p>
        <p class="card-text pro">${procedure}</p>
        <button class="btn btn-primay delete-btn">Delete</button>
      </div>
    </div>
  </li>`
  return displayRecepie;
  console.log(displayRecepie);
}
class RecepieManager{
    constructor(recepieId = 0){
        this.recepieId=recepieId; 
        this.recepieList = [];
   }
   addRecepie(recepieName,ingredients,procedure){
     alert("add recepie was called");
    this.recepieId++;
    const sampleRecepie = {
        ID: this.recepieId,
        Name: recepieName,
        Ingredients: ingredients,
        Procedure: procedure
    }
    // console.log(sampleRecepie);
    this.recepieList.push(sampleRecepie);
   }
   render(){
      //alert("render was called");
       let recepieArray = [];
       for(let i=0; i< this.recepieList.length; i++){
        //  alert(this.recepieList.length);
           let currentRecepie = this.recepieList[i];
           recepieArray.push(createRecepie(currentRecepie.ID,currentRecepie.Name,currentRecepie.Ingredients,currentRecepie.Procedure));
       }
       let finalRecepie = recepieArray.join("\n");
       let displayRecipe = document.querySelector('.sampleRecepie');
        displayRecipe.innerHTML = finalRecepie;
   }
     //creating the getRecepiebyID method
     getRecepieById(currentId){
      //  alert("getRecepie was called");
      let foundRecepie = {};
      for(let i=0; i< this.recepieList.length; i++){
        if(this.recepieList[i].Id === currentId){
          foundRecepie = this.recepieList[i];
          return foundRecepie;
        }
      }
    }
    //Save method for local storage
    save(){
      let currentId = String(this.recepieId);
      let recepieJson = JSON.stringify(this.recepieList);
      localStorage.setItem("Recepie",recepieJson);
      localStorage.setItem("currentId",currentId);

    }
    // Load method for local storage
    load(){
      // alert("load was called");
     if(localStorage.getItem("Recepie")){
       let recepieJson = localStorage.getItem("Recepie");
       this.recepieList = JSON.parse(recepieJson);
     }
     if(localStorage.getItem("currentId")){
      let currentId = localStorage.getItem("currentId");
      this.recepieId = Number(currentId);
     }
    }
    //Deleting a task
    deleteRecepie(recepieId){
      let newRecepie = [];
      for(let i=0;i<this.recepieList.length;i++){
          let recepie = this.recepieList[i];
          if(recepie.ID !== recepieId){
            newRecepie.push(recepie);
          }
      }
      this.recepieList = newRecepie;
    }
}