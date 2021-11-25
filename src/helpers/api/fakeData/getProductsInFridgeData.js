const res = {
  status: 200,
  ok:true,
  json: () => {
    return [
      { id: 0, name: "Banane", quantity: 2, min: 10, max: 10 },
      { id: 1, name: "Kiwi", quantity: 2, min: 10, max: 10 },
      { id: 2, name: "Ananas", quantity: 2, min: 10, max: 10 },
    ];
  },
};
export default res;