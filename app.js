var input,
    form = document.querySelector('[data-js~="todoForm"]'),
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
    list = document.querySelector('[data-js~="todoItems"]');
    if (list === null) {
      list = document.querySelector('[data-js~="newItems"]');
      list.innerHTML +=" <li class='todo__item'><input type='checkbox' id='" + input + "' /> <label for='" + input + "'>" + input + "</label><button value='" + input + "' class='todo__itemRemove'>&#x2717;</button></li>"
    }
    else {
      list.innerHTML ="<li class='todo__item'><input type='checkbox' id='" + input + "' /> <label for='" + input + "'>" + input + "</label><button value='" + input + "' class='todo__itemRemove'>&#x2717;</button></li>"
      list.dataset.js = "newItems"
    }
  form.reset()
  
  this.buttons = document.querySelectorAll('button');

  buttonList = [].slice.call(this.buttons);

  buttonList.forEach(listen);
  }
}

function listen(item, indx, arr) {
  item.addEventListener('click', deleteItem, false);
}

function deleteItem(event) {
  this.parentNode.remove();
} 