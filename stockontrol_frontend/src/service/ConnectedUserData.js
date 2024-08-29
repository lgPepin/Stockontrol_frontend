// src/services/ConnectedUserData.js
import Axios from "axios";

export const fetchUserRole = async () => {
  try {
    const response = await Axios.get(
      "http://localhost:8080/api/v1/users/login"
    );
    if (response.data.loggedIn && response.data.user.rows.length > 0) {
      return response.data.user.rows[0].role;
    } else {
      console.warn("Ningun usuario encontrado");
      return null;
    }
  } catch (error) {
    console.error("Error al recuperar la información del usuario:", error);
    throw error;
  }
};
