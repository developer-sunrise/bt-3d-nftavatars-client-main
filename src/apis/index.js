//get request
export const getMethod = async (item) => {
  try {
    const response = await fetch(process.env.REACT_APP_BACKEND_URL + item.url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        //   "x-access-token": item.authtoken,
      },
    });
    const json = await response.json();
    if (json.success === false) {
      if (json.message === "Token Expired") {
        localStorage.clear();
        window.location.replace("/");
      }
    }
    return json;
  } catch (error) {
    // console.log("get api error", error);
    return false;
  }
};

//post request
export const postMethod = async (item) => {
  try {
    // console.log("item",item);
    const response = await fetch(process.env.REACT_APP_BACKEND_URL + item.url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        //   "x-access-token": item.authtoken,
      },
      body: JSON.stringify(item.params),
    });
    const json = await response.json();
    if (json.success === false) {
      if (json.message === "Token Expired") {
        localStorage.clear();
        window.location.replace("/");
      }
    }
    return json;
  } catch (error) {
    // console.log("post api error", error);
    return false;
  }
};

//put request
export const putMethod = async (item) => {
  try {
    const response = await fetch(process.env.REACT_APP_BACKEND_URL + item.url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        //   "x-access-token": item.authtoken,
      },
      body: JSON.stringify(item.params),
    });
    const json = await response.json();
    if (json.success === false) {
      if (json.message === "Token Expired") {
        localStorage.clear();
        window.location.replace("/");
      }
    }
    return json;
  } catch (error) {
    // console.log("post api error", error);
    return false;
  }
};
