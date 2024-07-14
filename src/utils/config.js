const getTokenFromLocalStorage = localStorage.getItem('customer') ? JSON.parse(localStorage.getItem("customer")).token: null;
const config={
    headers: {
        Authorization: getTokenFromLocalStorage !== null ? `Bearer ${getTokenFromLocalStorage}` : "",
        Accept:"application/json"
      }
}

export default config;