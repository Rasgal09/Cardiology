import AsyncStorage from '@react-native-async-storage/async-storage';

// Función para obtener el token de autenticación
export const getToken = async() => {
  try {
    const token = await AsyncStorage.getItem("@auth_token");
    return token
  } catch (error) {
    console.error("Error al obtener el token: ", error);
    return null;
  }
};

export const loginWeb = async(formData: FormData) => {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_URL_BACK}/auth/cookie/login`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    if (!response.ok) {
      const errorData = await response.json(); 
      console.error(errorData);
      return errorData;
    }

    const userData = await fetch(`${process.env.EXPO_PUBLIC_URL_BACK}/auth/users/me`, {
      method: "GET",
      credentials: "include",
    });

    if (!userData.ok) {
      const errorData = await userData.json();
      console.error(errorData);
      return errorData;
    }

    const user = await userData.json();
    return user;
  }catch (error) {
    console.error("Error al iniciar sesión en web: ", error);
    return false;
  }
};

export const loginMobile = async(formData: FormData) => {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_URL_BACK}/auth/bearer/login`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(errorData);
      return false;
    }

    const data = await response.json();
    await AsyncStorage.setItem("@auth_token", data.access_token);

    const userData = await fetch(`${process.env.EXPO_PUBLIC_URL_BACK}/auth/users/me`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${data.access_token}`,
      },
    });

    if (!userData.ok) {
      const errorData = await userData.json();
      console.error(errorData);
      return false;
    }

    const user = await userData.json();

    console.log("Datos del usuario móvil obtenidos:", user);

    return user;
  } catch (error) {
    console.error("Error al iniciar sesión en móvil: ", error);
    return false;
  }
};

// Creo que se puede optimizar esta función para que sirva tanto en web como en móvil, pero por ahora la dejo así.
export const getUserMobileData = async(token: string | null) => {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_URL_BACK}/auth/users/me`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(errorData);
      return null;
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Error al obtener los datos del usuario: ", error);
    return null;
  }
};

export const getUserWebData = async() => {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_URL_BACK}/auth/users/me`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(errorData);
      return null;
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Error al obtener los datos del usuario: ", error);
    return null;
  }
};

// Creo que se puede optimizar esta función para que sirva tanto en web como en móvil, pero por ahora la dejo así.
export const logoutWeb = async() => {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_URL_BACK}/auth/cookie/logout`, {
      method: "POST",
      credentials: "include",
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error(errorData);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error al cerrar sesión en web: ", error);
    return false;
  }
};

export const logoutMobile = async() => {
  try {
    await AsyncStorage.removeItem("@auth_token");
    return true;
  } catch (error) {
    console.error("Error al cerrar sesión en móvil: ", error);
    return false;
  }
};