const status = [
  { id: 1, label_trad: "fridge.status.inProduction", inProduction: true },
  { id: 2, label_trad: "fridge.status.horsService", horsService: true },
  { id: 3, label_trad: "fridge.status.livraisonEnCours", livraison: true },
];

export default (el) => {
  return status.find((s) => s.id == el.id);
};
