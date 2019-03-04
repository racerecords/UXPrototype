;(function() {
  var form = document.querySelector('[data-js~="todoForm"]'),
      input,
      noItemsMsg,
      table,
      localData = [],
      item = {},
      arr;
  // add event listener to the submit action of the form
  form.addEventListener('keypress', getInput, false);

  // TODO add ability to check track checked off items in local storage
  // check for localStorage if content is truthy then load else nothing.
  if (localStorage.content) {
    // log storage found
    console.log("localStorage found: " + localStorage.content)
    // parse the content array
    localData = JSON.parse(localStorage.content);
    console.log(content.uuid)
    // loop through the array to add each item to the list
    localData.forEach(function (item, idx, arr) {
      addItem(item.content, item.id);
    });
  } else {
    // no storage
    console.log("no localStorage")
  }

function getInputs() {
  return document.getElementsByTagName('input');
}
function clearInputs() {
  var inputs = getInputs();
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = null;
  }
}

function setID() {
  var id = Math.random().toString(36).substr(2);
  $('input').each(function (idx, ele){
    console.log('setting id')
  });
}

function saveData(event) {
  if (localStorage.localdata) {
    localData = JSON.parse(localStorage.content);
  }
  var data = $('form').serializeArray();
  localData.push(item)
  localStorage.content = JSON.stringify(localData);
//  addItem(data, item.id);
}
// add an item to the list
function getInput(event) {
  // event.which, event.charCode, and event.keyCode all worked here
  if (event.keyCode === 13) {
    event.preventDefault();
    if (event.target.name == 'readingsInput') {
      console.log('end of row');
      // TODO save to local storage, clear inputs, then attempt to sync with server
      var next = event.target.parentElement.parentElement.firstElementChild.lastElementChild
      clearInputs();
      next.focus();
      saveData(event);
    } else {
      // continue to next input
      // TODO if number has already been entered pre-populate the class and skip to reading
      console.log('not end of row');
      var next = event.target.parentElement.nextElementSibling.lastElementChild;
      next.focus();
      saveData(event);
    }
  }
}

function addItem(content, id) {
  console.log("addItem " + content);
  // if input is blank alert user else use input to add item to the list
  if (input === "") {
    alert("No input.")
    }
  else {
    // get the li of the no items message and set it's display to none
    noItemsMsg = document.querySelector('[data-js~="noItemsMsg"]')
    noItemsMsg.style.display = "none";
    // get the ul of the items list
    table = document.querySelector('[data-js~="todoItems"]');
    // make all the elements need for the list item by calling it's function
    makeElements(content, id)
    // reset the form so that it will be blank without user action
    form.reset()
    // make a list of buttons and give each an event listener by calling it's function
    buttoner()
  }
}

// make an array of buttons and loop through that array calling the listen function for each button
function buttoner(){
  var buttons    = document.querySelectorAll('button');
  var buttonList  = Array.prototype.slice.call(buttons);
  buttonList.forEach(listen);
}

// add an event listener to each item for the click event
function listen(item, indx, arr) {
  item.addEventListener('click', deleteItem, false);
}

// delete item on event
function deleteItem(event, id) {
  console.log("Removing " + this.previousSibling.innerHTML + " from the list.")

  if (localStorage.content) {
    var self = this
    content = JSON.parse(localStorage.content);
    content.forEach (function (item, idx, arr) {
        if (item.id  === self.id) {
          content.splice(idx, 1);
        }else {
          console.log("keeping id: " + item.id);
        }
    });
    localStorage.content = JSON.stringify(content);
  }
  // get a list of todo items
  table = document.getElementsByClassName("todo__item")
  // removes the li the clicked button is in
  this.parentNode.remove();
  // if the item list is empty display the no items message
  if (table.length === 0) {
    noItemsMsg.style.display = "inherit";
  }
}

// create all the elements needed for an item
function makeElements(item, id) {

  var row = buildRow(item, id);

  // create the button.  Set it's class, innerHTML (x), and name
  var button        = document.createElement("button")
  button.className  = "todo__itemRemove"
  button.id         = id
  button.innerHTML  = "&#x2717;"
  button.name       = item

  // create the input. Set it's type and name
  var itemBox  = document.createElement("input")
  itemBox.type = "checkbox"
  itemBox.name = item

  // create the content.  Set it's innerHTML
  var content       = document.createElement("td")
  content.className = "todo__content"
  content.innerHTML = item

  console.log('appending');
  tr.appendChild(td).appendChild(itemBox)
  tr.appendChild(content)
  tr.appendChild(td).appendChild(button)
  table.appendChild(tr)
}

function buildRow(item, id) {
  var tr        = document.createElement("tr")
  var td        = document.createElement("td")
  return tr;
}
})();
