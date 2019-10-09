let message = document.querySelector('#message');


// Userinput variable gets the users input
  var userInput;
  // listname gets the name of the input -- used when deleting
  var listname;
  // the lists element
  lists = document.getElementById('lists');
  
  // gets the saved array (which is a string) from local storage and parses it
  let savedListArray = JSON.parse(window.localStorage.getItem('listsArray'));
  
  // if there is a saved array in localstorage, evaluate listarray to the saved, else empty
  var listArray = savedListArray ? savedListArray : [];
  
  // This function takes the lists from an array and adds it to the targetted HTML list element
  function listsFromArray(array, target) {
    array.forEach((list, index) =>
    target.innerHTML += `<li id='list_${index}'>
    <span class='list'>${list}</span>
    <button onClick=deleteList(list_${index}) title='Delete list'>&times;</button>
    </li>`
    )
    window.localStorage.setItem('listsArray', JSON.stringify(array));
}

//initialize the lists in listarray on the screen
listsFromArray(listArray, lists);

// This function adds lists using the listsfromArray function
function addList() {
    userInput = document.getElementById('userInput').value;
    if(userInput === '') {
        message.innerHTML = 'Please insert a list before adding &#128683';
        message.style.backgroundColor = 'coral';

        message.style.transform = 'translateY(0)';
        setTimeout ( () => {
        message.style.transform = 'translateY(-40px)';
        }, 2000 );
    } else {
        message.innerHTML = 'List successfully added &#128527';
        message.style.backgroundColor = '#35CE30';

        message.style.transform = 'translateY(0)';
        setTimeout ( () => {
        message.style.transform = 'translateY(-40px)';
        }, 2000 );

        listArray.push(userInput);
        document.getElementById('lists').innerHTML = '';
        listsFromArray(listArray, lists);
        document.getElementById('userInput').value = '';
    }
    
}

// This function deletes lists by getting the name from the given id, removing it from the array and adding back to the page using the listsfromArray function
function deleteList(listID) {
    listname = listID.getElementsByClassName('list')[0].innerHTML;
    document.getElementById('lists').innerHTML = '';
    listArray = listArray.filter(list =>
        list !== listname
    );

    message.innerHTML = 'List successfully deleted &#10060;';
    message.style.backgroundColor = '#DA3024';

    message.style.transform = 'translateY(0)';
    setTimeout ( () => {
    message.style.transform = 'translateY(-40px)';
    }, 2000 );

    listsFromArray(listArray, lists);
}

userInput = document.getElementById('userInput');
userInput.addEventListener('keyup', (e) => {
    if(e.keyCode == 13) {
        addList();
    }
});


// Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
   navigator.serviceWorker.register('sw.js').then( () => {
    console.log('Service Worker Registered')
   }).catch(error => {
    console.log(error);
   })
 })
}



// if(dataInDb === false) {
//          request.open('POST', 'header1.php');
//          request.onreadystatechange = function() {
//           if(request.readyState == 4 && request.status == 200) {
//             if(request.responseText !== null) {
//               maindiv.innerHTML = request.responseText;
          
//               // Hide the loading icon when header1 form is loaded
//               document.querySelector('#loadingicon').style.display = 'none';
              
//               /**Listener for saving header1******************/
//               var saveheader1 = document.getElementById('header1submit');
//               saveheader1.addEventListener('click',saveHeader1Form,false);
    
              
//             }
//           }
//         }
//       }