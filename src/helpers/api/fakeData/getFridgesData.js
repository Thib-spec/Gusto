const status = [
  {id:1, message:"En production", inProduction:true},
  {id:2, message:"Hors service", horsService:true},
  {id:3, message:"Livraison en cours", livraison:true},
]

const res = {
  status: 200,
  ok:true,
  json: () => [
    { id: 0, name: "fridge1", status:status[2] },
    { id: 1, name: "fridge2", status:status[1] },
    { id: 2, name: "fridge3", status:status[0] },
  ]
};
export default res;
