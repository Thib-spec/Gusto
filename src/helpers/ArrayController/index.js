export default function ArrayController([value, setValue],[initValue, setInitValue]) {
  this.value = value;
  this.setValue = setValue;
  this.initValue = initValue;
  this.setInitValue = setInitValue;
}

ArrayController.prototype.init = function (JSONArray) {
  this.setInitValue([...JSONArray])
  this.setValue([...JSONArray]);
};

ArrayController.prototype.reset = function () {
  this.setValue([...this.initValue]);
};

ArrayController.prototype.clear = function () {
  this.setValue([]);
};

ArrayController.prototype.findIndexById = function (id) {
  return this.value.findIndex((JSONelement) => id == JSONelement.id);
};

ArrayController.prototype.hasElById = function (id) {
  return this.value.findIndex((JSONelement) => id == JSONelement.id)>-1;
};

ArrayController.prototype.addOrUpdateMany = function (JSONArray) {
  let copy = [...this.value];
  [...JSONArray].forEach((el) => {
    const index = this.findIndexById(el.id);
    if (index > -1) copy[index] = el;
    else copy = [...copy, el];
  });
  this.setValue([...copy]);
};

ArrayController.prototype.removeMany = function (JSONArray) {
  let copy = [...this.value];
  [...JSONArray].forEach((el) => {
    const index = this.findIndexById(el.id);
    if (index > -1) copy.splice(index, 1);
  });
  this.setValue([...copy]);
};

ArrayController.prototype.json = function () {
  return this.value;
};
