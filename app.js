var form = document.querySelector('[data-js~="todoForm"]'),
    input,
    noItemsMsg,
    list;

;(function() {
  // add event listener to the submit action of the form
  form.addEventListener('keypress', addItem, false);
})()

// add an item to the list
function addItem(event) {
  // event.which, event.charCode, and event.keyCode all worked here
  if (event.keyCode === 13) {
      event.preventDefault();
    // get the value from the input
    input = document.querySelector('[data-js~="todoInput"]').value;
    // if input is blank alert user else use input to add item to the list
    if (input === "") {
      alert("Input is blank. Vader will force choke you for this!")
      }
      else {
      // get the li of the no items message and set it's display to none
      noItemsMsg = document.querySelector('[data-js~="noItemsMsg"]')
      noItemsMsg.style.display = "none";
      // get the ul of the items list
      list = document.querySelector('[data-js~="todoItems"]');
      // make all the elements need for the list item by calling it's function
      makeElements(input)
      // reset the form so that it will be blank without user action
      form.reset()
      // make a list of buttons and give each an event listener by calling it's function
      buttoner()
    }
  }
}

// make an array of buttons and loop through that array calling the listen function for each button
function buttoner(){
  this.buttons    = document.querySelectorAll('button');
  var buttonList  = [].slice.call(this.buttons);
  buttonList.forEach(listen);
}

// add an event listener to each item for the click event
function listen(item, indx, arr) {
  item.addEventListener('click', deleteItem, false);
}

// delete item on event
function deleteItem(event) {
  // removes the li the clicked button is in
  this.parentNode.remove();
  // get a list of todo items
  item = document.getElementsByClassName("todo__item")
  // if the item list is empty display the no items message
  if (item.length === 0) {
    noItemsMsg.style.display = "inherit";
  }
}

// create all the elements needed for an item
function makeElements(item) {

  // create the li and set it's class
  var li        = document.createElement("li")
  li.className  = "todo__item"

  // create the button.  Set it's class, innerHTML (x), and name
  var button        = document.createElement("button")
  button.className  = "todo__itemRemove"
  button.innerHTML  = "&#x2717;"
  button.name       = item

  // create the input. Set it's type and name
  var itemBox  = document.createElement("input")
  itemBox.type = "checkbox"
  itemBox.name = item

  // create the label.  Set it's innerHTML
  var label       = document.createElement("label")
  label.innerHTML = item

  li.appendChild(itemBox)
  li.appendChild(label)
  li.appendChild(button)
  list.appendChild(li)
}