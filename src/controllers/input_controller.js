import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ 'table', 'number', 'reading', 'carClass', 'tableRow' ]

  initialize() {
    this.data.set('id', this.createID());
  }

  form() {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.tableRow()
      this.nextInput();
    }
  }

  getTargets() {
    const number = this.numberTarget
    const carClass = this.carClassTarget
    const reading = this.readingTarget
    return [number, carClass, reading]
  }

  checkId() {
    const id = this.data.get('id');
    return this.tableRowTargets.findIndex(function(ele) { 
      return ele.dataset.id == id
    });
  }

  removeRowChildren(tr) {
    for (var i = 0; i <= tr.children.length+1; i++) {
      tr.removeChild(tr.children[0]);
    }
    return this.addRowChildren(tr);
  }

  updateRow(idx) {
    const table = this.tableTarget
    const tr = this.tableRowTargets[idx];
    const row = this.removeRowChildren(tr);
    table.appendChild(row);
  }

  addRowChildren(tr) {
    const targets = this.getTargets();
    for (var i = 0; i < targets.length; i++) {
      const td = document.createElement('td');
      td.innerHTML = targets[i].value
      tr.appendChild(td);
    }
    return tr;
  }

  newRow() {
    const table = this.tableTarget
    const tr = document.createElement('tr');
    tr.dataset.target = 'input.tableRow';
    tr.dataset.id = this.data.get('id');
    const row = this.addRowChildren(tr);
    table.appendChild(row);
  }

  tableRow() {
    const idx = this.checkId();
    if ( idx >= 0 ) {
      this.updateRow(idx);
    } else {
      this.newRow();
    }
  }

  clearInputs(targets) {
    for (var i = 0; i < targets.length; i++) {
      targets[i].value = null;
    }
    this.assingNewID();
  }

  createID() {
    return Math.random().toString(36);
  }

  assingNewID() {
    const id = this.createID();
    this.data.set('id', id);
  }

  nextInput() {
    this.log(['Next input']);
    const targets = this.getTargets();
    const idx =targets.findIndex(function(ele) {
      return ele == event.srcElement
    });
    if (targets[idx+1] == undefined) {
      targets[0].focus();
      this.clearInputs(targets);
    } else {
      targets[idx+1].focus();
    }
  }

  log(arr) {
    for (var i = 0; i < arr.length; i++) {
      console.log(arr[i]);
    }
  }
}
