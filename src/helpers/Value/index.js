const copyy = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

export default function Value([value, setValue]) {
  this.value = value;
  this.set = setValue;
}
