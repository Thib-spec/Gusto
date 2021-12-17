import Value from "helpers/Value/ValueMenu.js";

const copyy = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

function Element(el, ArrayController) {
  this._value = el;
  this.value = ArrayController.findElById(el.id);
  this.isInArray = this.value ? true : false;
  this.ArrayController = ArrayController;
}

Element.prototype.update = function (body) {
  this.ArrayController.addOrUpdateMany([{ ...this.value, ...body }]);
  return this;
};

Element.prototype.set = function (body) {
  this.value = body;
};

Element.prototype.remove = function () {
  this.ArrayController.removeMany([this.value]);
};

export default function ArrayController(valueUseState, initValueUseState) {
  this._value = new Value(valueUseState);
  this.initValue = new Value(initValueUseState);
  this.value = this._value.value;
}

ArrayController.prototype.set = function (JSONArray, options) {
  // const JSONArrayCopy = copyy(JSONArray);
  if (options && options.init === true) this.initValue.set(copyy(JSONArray));
  this._value.set(copyy(JSONArray));
};

ArrayController.prototype.get = function (el) {
  return new Element(el, this);
};

ArrayController.prototype.clear = function () {
  this.set([]);
};

ArrayController.prototype.reset = function () {
  this.set(copyy(this.initValue.value));
};

ArrayController.prototype.findIndexById = function (id) {
  return this.value.findIndex((JSONelement) => id == JSONelement.id);
};

ArrayController.prototype.findElById = function (id) {
  return this.value.find((JSONelement) => id == JSONelement.id);
};

ArrayController.prototype.hasElById = function (id) {
  return this.value.findIndex((JSONelement) => id == JSONelement.id) > -1;
};

ArrayController.prototype.addOrUpdateMany = function (JSONArray, options) {
  let copy = copyy(this.value);
  JSONArray.forEach((el) => {
    const index = copy.findIndex((JSONelement) => el.id == JSONelement.id);
    if (index > -1) copy[index] = el;
    else copy = [...copy, el];
  });
  this.set(copy, options);
};

ArrayController.prototype.removeMany = function (JSONArray, options) {
  let copy = copyy(this.value);
  JSONArray.forEach((el) => {
    const index = copy.findIndex((JSONelement) => el.id == JSONelement.id);
    if (index > -1) copy.splice(index, 1);
  });
  this.set(copy, options);
};

ArrayController.prototype.json = function () {
  return this.value;
};
