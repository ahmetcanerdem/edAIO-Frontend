import { useLocation } from 'react-router-dom';


export const userService = {
    login,
    logout
};

async function login(googleData) {
    const response = await fetch("/api/google-login", {
        method: "POST",
        body: JSON.stringify({
            token: googleData.tokenId,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await HandleResponse(response);
    localStorage.setItem("loginData", JSON.stringify(data));   
}

function logout() {
    localStorage.removeItem('user');
}

function HandleResponse(response) {
  const data = response.json();
  const location = useLocation();
  if (!!data) {
    logout();
    location.reload(true);

    const error = "Basarisiz!..";
    return Promise.reject(error);
  }
  return data;
}