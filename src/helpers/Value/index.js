// const copyy = (obj) => {
//   return JSON.parse(JSON.stringify(obj));
// };

const copyy = require("deepcopy");

export default function Value(useState, initValue, isMounted) {
  this.initValue = copyy(initValue);
  this.isMounted = isMounted;
  const [value, setValue] = useState(initValue);
  this.value = value;
  this._setValue = setValue;
}

Value.prototype.set = function (newValue, { init } = { init: false }) {
  if (this.isMounted) {
    if (this.isMounted.current) {
      this._setValue(newValue);
    }
  } else {
    this._setValue(newValue);
  }
  if (init) {
    console.log("WWWWSSS");
    this.initValue = copyy(newValue);
  }
};

Value.prototype.reset = function () {
  console.log(this.initValue);
  this.set(this.initValue);
};
