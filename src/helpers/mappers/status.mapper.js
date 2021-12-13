const status = [
  { id: 1, label_trad: "fridge.status.inProduction", inProduction: true },
  { id: 2, label_trad: "fridge.status.horsService", horsService: true },
  { id: 3, label_trad: "fridge.status.livraisonEnCours", livraison: true },
  { id: -1, label_trad: "fridge.status.autre", autre: true },
];

export default (el) => {
  const s = status.find((s) => s.id == el.fk_id_status);
  return s ? s : status.find((s) => s.id == -1);
};
