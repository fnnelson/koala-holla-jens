console.log('js');

$(document).ready(function () {
  console.log('JQ');
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();
  refreshKoalas();

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
      refreshKoalas();
    })
    .catch((error) => {
      console.log("error caught", error);
    })
}

function refreshKoalas() {
  $.ajax({
    type: 'GET',
    url: '/koalas'
  }).then((response) => {
    console.log(response);
    renderKoalskis(response);
  }).catch((error) => {
    console.log(error);
  })
}

function renderKoalskis(koalifiedKoalas) {
  $('#viewKoalas').empty();

  for (let i = 0; i < koalifiedKoalas.length; i += 1) {
    if (koalifiedKoalas[i].readyForTransfer == true) {
      koalifiedKoalas[i].readyForTransfer = 'Y';
    } else if (koalifiedKoalas[i].readyForTransfer == false) {
      koalifiedKoalas[i].readyForTransfer = 'N';
    }
    console.log(koalifiedKoalas[i].readyForTransfer)
    let newKoalas = $(`
    <tr>
      <td>${koalifiedKoalas[i].name}</td>
      <td>${koalifiedKoalas[i].age}</td>
      <td>${koalifiedKoalas[i].gender}</td>
      <td>${koalifiedKoalas[i].readyForTransfer}</td>
      <td>${koalifiedKoalas[i].notes}</td>
      <td><button class="transferBtn">Ready For Transfer</button></td>
      <td><button class="deleteBtn">Delete</button></td>
    </tr>
  `)
    // For each book, append a new row to our table
    newKoalas.data('id', koalifiedKoalas[i].id)
    $('#viewKoalas').append(newKoalas);
  }
}

