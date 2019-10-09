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
        alert('Please insert a list before adding');
    } else {
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