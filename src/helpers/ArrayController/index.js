import Value from "helpers/Value";

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

export default function ArrayController(useState, initValue) {
  this._value = new Value(useState, initValue);
  this._initValue = new Value(useState, initValue);
  this.value = this._value.value;
  this.initValue = this._initValue.value;
}

ArrayController.prototype.set = function (JSONArray, options) {
  // const JSONArrayCopy = copyy(JSONArray);
  if (options && options.init === true) this._initValue.set(copyy(JSONArray));
  this._value.set(copyy(JSONArray));
};

ArrayController.prototype.isElModified = function (el) {
  const foundInValue = this.find(el);
  const foundInInitValue = this.find(el, { inInitValue: true });
  return (
    foundInValue &&
    foundInInitValue &&
    JSON.stringify(foundInValue) != JSON.stringify(foundInInitValue)
  );
};
ArrayController.prototype.isElRemoved = function (el) {
  const foundInValue = this.find(el);
  const foundInInitValue = this.find(el, { inInitValue: true });
  return !foundInValue && foundInInitValue;
};
ArrayController.prototype.isElAdded = function (el) {
  const foundInValue = this.find(el);
  const foundInInitValue = this.find(el, { inInitValue: true });
  return foundInValue && !foundInInitValue;
};

ArrayController.prototype.get = function (el) {
  return new Element(el, this);
};

ArrayController.prototype.clear = function () {
  this.set([]);
};

ArrayController.prototype.reset = function () {
  this.set(copyy(this.initValue));
};

ArrayController.prototype.findIndexById = function (id) {
  return this.value.findIndex((JSONelement) => id == JSONelement.id);
};

ArrayController.prototype.findElById = function (
  id,
  { inInitValue } = { inInitValue: false }
) {
  const array = inInitValue ? this.initValue : this.value;
  return array.find((JSONelement) => id == JSONelement.id);
};

ArrayController.prototype.find = function (
  el,
  { inInitValue } = { inInitValue: false }
) {
  const array = inInitValue ? this.initValue : this.value;
  return array.find((JSONelement) => el.id == JSONelement.id);
};

ArrayController.prototype.hasElById = function (id) {
  return this.value.findIndex((JSONelement) => id == JSONelement.id) > -1;
};

ArrayController.prototype.has = function (el) {
  return this.value.findIndex((JSONelement) => el.id == JSONelement.id) > -1;
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
