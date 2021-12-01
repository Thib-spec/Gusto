import pommeImage from 'Images/pomme.jpg'

const res = {
  status: 200,
  ok:true,
  json: () => {
    return [
      { id: 0, name: "Midi Lunch", image:pommeImage },
      { id: 1, name: "Soir Lunch", image:pommeImage },
      { id: 2, name: "Matin Lunch", image:pommeImage },
    ];
  },
};
export default res;