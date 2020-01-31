// CheckBoxStore is an object that stores checkbox dom elements,
// tracks how many have been checked, and limits how many can be checked.
// It serves as a map for the dom elements and a validator.
const CheckBoxStore = (limit=10) => {
  return {
    limit,
    checkedCount: 0,
    ids: {},
    limitReached() {
      return this.limit === this.checkedCount;
    },
    insert(id, ele) {
      this.ids[id] = ele;
    },
    get(id) {
      return this.ids[id];
    },
    validateClick(id) {
      if(this.ids.hasOwnProperty(id)) {
        const ele = this.get(id);
        if (ele.checked) { 
          if (this.limitReached()) {
            ele.checked = false;
            alert('You cannot check more than ' + this.limit + ' checkboxes!');
          } else {
            this.checkedCount += 1;
          }
        } else {
          this.checkedCount -= 1;
        }
      }
    }
  }
}

// WrapDomCheckboxes takes a classname and a CheckBoxStore.
// It gets the set of checkboxes of a given classname, adds an id attribute,
// adds the checkbox dom element to the CheckBoxStore, and adds the CheckBoxStore
// click validation to the event listener.
const wrapDomCheckboxes = (className, cbStore) => {
  let classes = document.getElementsByClassName(className);
  for (let i = 0; i < classes.length; ++i) {
    const ele = classes[i];
    const id = `checkbox-${i}`;
    ele.id = id;
    cbStore.insert(id, ele);
    ele.addEventListener('change', () => {
      cbStore.validateClick(id);
    });
  }
}

// Our main function/IFFE creates a CheckBoxStore
// and wraps our dom elements.
(() => {
  const cbs = CheckBoxStore(2);
  wrapDomCheckboxes('cbox', cbs);
})();
