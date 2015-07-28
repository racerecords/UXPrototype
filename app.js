var form = document.querySelector('[data-js~="todoForm"]'),
    input,
    list;

;(function() {

  form.addEventListener('submit', addItem, false);
})()

function addItem(event) {
  event.preventDefault()
  input = document.querySelector('[data-js~="todoInput"]').value;
  if (input === "") {
    alert("Input is blank. Vader will force choke you for this!")
    }
    else {
    noItemsMsg = document.querySelector('[data-js~="noItemsMsg"]')
    noItemsMsg.style.display = "none";
    list = document.querySelector('[data-js~="todoItems"]');
    makeElements()
  form.reset()
  buttoner()
  }
}

function buttoner(){
  this.buttons  = document.querySelectorAll('button');
  buttonList    = [].slice.call(this.buttons);
  buttonList.forEach(listen);
}

function listen(item, indx, arr) {
  item.addEventListener('click', deleteItem, false);
}

function deleteItem(event) {
  this.parentNode.remove();
  item = document.getElementsByClassName("todo__item")
  if (item.length === 0) {
    noItemsMsg.style.display = "inherit";
  }
}

function makeElements() {
    var li        = document.createElement("li")
    li.className  = "todo__item"

    var button        = document.createElement("button")
    button.className  = "todo__itemRemove"
    button.innerHTML  = "&#x2717;"
    button.value      = input

    var inputBox  = document.createElement("input")
    inputBox.type = "checkbox"
    inputBox.id   = input

    var label       = document.createElement("label")
    label.for       = input
    label.innerHTML = input

    var content = document.createTextNode(input)

    li.appendChild(inputBox)
    li.appendChild(label)
    li.appendChild(button)
    list.appendChild(li)
}