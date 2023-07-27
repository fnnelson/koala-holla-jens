console.log('js');

$(document).ready(function () {
  console.log('JQ');
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();

}); // end doc ready

function setupClickListeners() {
  $('#addButton').on('click', function () {
    console.log('in addButton on click');
    // get user input and put in an object
    let newKoalaName = $('#nameIn').val();
    let newKoalaAge = $('#ageIn').val();
    let newKoalaGender = $('#genderIn').val();
    let newKoalaTransfer = $('#readyForTransferIn').val();
    let newKoalaNotes = $('#notesIn').val();
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: newKoalaName,
      age: newKoalaAge,
      gender: newKoalaGender,
      readyForTransfer: newKoalaTransfer,
      notes: newKoalaNotes,
    };
    // call saveKoala with the new obejct
    saveKoala(koalaToSend);
  });
}

function getKoalas() {
  console.log('in getKoalas');
  // ajax call to server to get koalas

} // end getKoalas

function saveKoala(newKoala) {
  console.log('in saveKoala', newKoala);
  // ajax call to server to get koalas
  $.ajax({
    method: 'POST',
    url: '/koalas',
    data: newKoala
  })
    .then((response) => {
      console.log('Response from server.', response);
      // refreshKoalas();
    })
    .catch((error) => {
      console.log("error caught", error);
    })
}

// refreshBooks();
