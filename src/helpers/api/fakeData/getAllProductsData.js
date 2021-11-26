import pommeImage from 'Images/pomme.jpg'

const res = {
  status: 200,
  ok:true,
  json: () => {
    return [
      { id: 3, name: "Raisin", price: "2 eu", ubd: "10/12/2021", description:"description", image:pommeImage },
      { id: 4, name: "Pomme", price: "2 eu", ubd: "10/12/2021", description:"description", image:pommeImage },
      { id: 5, name: "Litchi", price: "2 eu", ubd: "10/12/2021", description:"description", image:pommeImage },
      { id: 6, name: "Fraise", price: "2 eu", ubd: "10/12/2021", description:"description", image:pommeImage },
    ];
  },
};
export default res;