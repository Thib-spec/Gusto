// const res = {
//   status: 200,
//   ok:true,
//   json: () => {
//     return [
//       { id: 0, name: "Banane", quantity: 2, min: 10, max: 10 },
//       { id: 1, name: "Kiwi", quantity: 2, min: 10, max: 10 },
//       { id: 2, name: "Ananas", quantity: 2, min: 10, max: 10 },
//     ];
//   },
// };

const res = new Promise((res, rej) => {
  res({
    status: 200,
    ok: true,
    json: () =>
      new Promise((res, rej) => {
        res([
          { id: 0, name: "Midi Lunch" },
          { id: 2, name: "Matin Lunch" },
        ]);
      }),
  });
});

export default res;
