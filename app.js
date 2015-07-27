;(function() {
  var input,
      list;

  function stopDef(event) {
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
    }
  }
  form = document.querySelector('[data-js~="todoForm"]');


  form.addEventListener(
      'submit', stopDef, false
  );
})()
function deleteCheck(button, indx, arr) {
      console.log(button)
    }
//<li class="todo__item">
//  <input type="checkbox" id="c1" />
//  <label for="c1">Curse Rebel Scum</label>
//  <button value=""class='todo__value=""itemRemove'>&#x2717;</button>
//</li>
