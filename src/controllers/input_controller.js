import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ 'table', 'tableRow', 'input', 'number' ]

  form() {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.data.set('id', this.numberTarget.value);
      this.tableRow()
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
    for (var i = 0; i < tr.children.length; i++) {
        inputs.forEach(function (input){
          if ( tr.children[i].dataset.name == input.name && input.value != '') {
            tr.children[i].innerText = input.value
          }
        });
    };
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

  clearInputs(inputs) {
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].value = null;
    }
    this.assingNewID();
  }

  createID() {
    return Math.random().toString(36);
  }

  assingNewID() {
    var id = this.createID();
    this.data.set('id', id);
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
