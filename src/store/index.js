
/**
 * Le store sert a renseigner des variable "globale" d'état 
 *  de l'application.
 * On peut alors avoir accès à ces variables dans n'importe quel
 *  composant.
 * Exemple : la variable "user" est accessible et modifiable
 *  partout dans l'application
 * voir https://redux.js.org/ pour plus d'information
 */

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user.reducer"

const store = configureStore({
  reducer: {
      user: userReducer
  },
});

export default store;
