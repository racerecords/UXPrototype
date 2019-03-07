import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ 'table', 'tableRow', 'input', 'number' ]

  form() {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.data.set('id', this.numberTarget.value);
      this.tableRow()
      this.sortRows();
      this.nextInput();
    }
  }

  getTargets() {
    return this.inputTargets;
  }

  checkId(arr) {
    var id = this.data.get('id');
    return arr.findIndex(function(ele) { 
      return ele.dataset.id == id
    });
  }

  updateRow(idx) {
    var table = this.tableTarget
    var tr = this.tableRowTargets[idx];
    tr = this.updateRowChildren(tr);
    table.appendChild(tr);
  }

  updateRowChildren(tr) {
    var inputs = this.getTargets();
    var self = this;
    for (var i = 0; i < tr.children.length; i++) {
        inputs.forEach(function (input){
          if ( tr.children[i].dataset.name == input.name && input.value != '' && input.value != 0) {
            if (input.type == 'number') {
              if (input.value < 0) {
                var val = tr.children[i].innerText;
                tr.children[i].innerText = val.replace(Math.abs(input.value), '');
              } else {
                tr.children[i].innerText += `   ${input.value}`;
              }
              self.clearInput(input);
            } else {
              tr.children[i].innerText = input.value;
            }
          }
        });
      }
    return tr;
  }

  removeRowChildren(tr) {
    for (var i = 0; i <= tr.children.length+1; i++) {
      tr.removeChild(tr.children[0]);
    }
    return tr;
  }

  addRowChildren(tr) {
    var inputs = this.getTargets();
    for (var i = 0; i < inputs.length; i++) {
      var td = document.createElement('td');
      td.innerHTML = inputs[i].value;
      td.dataset.name = inputs[i].name;
      tr.appendChild(td);
    }
    return tr;
  }

  newRow() {
    var table = this.tableTarget
    var tr = document.createElement('tr');
    tr.dataset.target = 'input.tableRow';
    tr.dataset.id = this.data.get('id');
    var row = this.addRowChildren(tr);
    table.appendChild(row);
  }

  tableRow() {
    var idx = this.checkId(this.tableRowTargets);
    if ( idx >= 0 ) {
      this.updateRow(idx);
    } else {
      this.newRow();
    }
  }

  sortRows() {
    var table = this.tableTarget;
    var rows = this.tableRowTargets;
    rows.sort(function(a,b) {
      var order
      order = a.firstChild.innerText - b.firstChild.innerText;
      if (order == 0) {
        order = a.firstChild.innerText.length - b.firstChild.innerText.length;
      }
      return order
    });
    console.log('sorting');
    rows.forEach(function (row) {
      row.parentElement.removeChild(row);
    });
    rows.forEach(function (row) {
      table.appendChild(row);
    });
  }

  clearInputs(inputs) {
    for (var i = 0; i < inputs.length; i++) {
      this.clearInput(inputs[i])
    }
  }

  clearInput(input) {
    input.value = null;
  }

  createID() {
    return Math.random().toString(36);
  }

  nextInput() {
    this.log(['Next input']);
    var inputs = this.getTargets();
    var idx =inputs.findIndex(function(ele) {
      return ele == event.srcElement
    });
    if (inputs[idx+1] == undefined) {
      inputs[0].focus();
      this.clearInputs(inputs);
    } else {
      inputs[idx+1].focus();
    }
  }

  log(arr) {
    for (var i = 0; i < arr.length; i++) {
      console.log(arr[i]);
    }
  }
}
