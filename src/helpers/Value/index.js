const copyy = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

export default function Value([value, setValue], isMounted) {
  this.value = value;
  this.set = isMounted
    ? (newValue) => {
        if (isMounted.current) setValue(newValue);
      }
    : setValue;
}
