export function authHeader() {
  let user = localStorage.getItem("loginData");
  if (!!user) {
    return { 'Authorization': "Bearer" + user.tokenID }; // Bakılacak
  } else {
    return {};
  }
}

export const userServices = {
    login,
    logout,
    // register
}

function login(googleData){
    return fetch("/api/google-login", {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(handleResponse)
    .then(data => {
        localStorage.setItem("loginData", JSON.stringify(data)); 
        return data;
    });
}

function logout(){
    localStorage.removeItem("loginData");
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}