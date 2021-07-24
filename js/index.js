let recepies = new RecepieManager();
recepies.load();
recepies.render();

//Bootstrap form hiding
var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));

//Clearing the form
const clearform = () => {
  document.querySelector("#recepieName").value = "";
  document.querySelector("#ingredients").value = "";
  document.querySelector("#procedure").value = "";
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
          else{
            let recepieName = document.querySelector("#recepieName").value;
            let ingredients = document.querySelector("#ingredients").value;
            let procedure = document.querySelector("#procedure").value;
            recepies.addRecepie(recepieName,ingredients,procedure);
            recepies.save();
            recepies.load();
            recepies.render();
            // Stops refresh, clears the form, hides the pop up window
            event.preventDefault();
            clearform();
            myModal.hide();
            
          }
          form.classList.add('was-validated')
        }, false)
      })
  })()

//Display after validation
const page = document.querySelector(".page");
//Checking if the delete botton was clicked
page.addEventListener('click', function (event) {
  let deleteCheck = event.target.classList.contains('delete-btn');
  if(deleteCheck){
    const parentRecepie = event.target.parentElement.parentElement;
    let recepieId = Number(parentRecepie.dataset.current);
    recepies.deleteRecepie(recepieId);
    recepies.save();
    recepies.render();
  }
});