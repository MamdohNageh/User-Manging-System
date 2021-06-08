import axios from "axios";

const baseURL = "http://localhost:3002/api/users";

export async function getUsers(username = "") {
  let payload = null;
  try {
    let response = await fetch(`${baseURL}?name_like=${username}`);

    payload = await response.json();
  } catch (error) {
    console.log(error);
  }
  return {
    type: "USERS_LIST",
    payload,
  };
}

export function clearData() {
  return {
    type: "CLEAR_DATA",
    payload: null,
  };
}

export async function getUserByID(id = 0) {
  console.log("idddd", id);
  let payload = null;
  try {
    let response = await fetch(`${baseURL}/${id}`);
    payload = await response.json();
  } catch (error) {
    console.log(error);
  }
  return {
    type: "USER_DETAILS",
    payload,
  };
}

export async function register(user) {
  console.log(user);
  await axios.post("http://localhost:3002/api/user/register", user);
  return {
    type: "Register_Status",
    payload: null,
  };
}

export async function deleteById(id) {
  await axios.delete(`${baseURL}/${id}`);
  return {
    type: "Delete_Status",
    payload: null,
  };
}

export async function editUserByID(id, user) {
  await axios.put(`${baseURL}/${id}`, user);
  return {
    type: "Edit_Status",
    payload: null,
  };
}
