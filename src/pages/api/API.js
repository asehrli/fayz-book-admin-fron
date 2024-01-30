import axios from "axios";
import {auth, BASE_URL} from "../config/Auth";

export const GET = async (path) => {
    return await axios
        .get(BASE_URL.concat(path), auth())
        .then(response => response.data)
}

export const POST = async (path, data) => {
    return await axios
        .post(BASE_URL.concat(path), data, auth())
        .then(response => response.data)
}
export const PUT = async (path, data) => {
    return await axios
        .put(BASE_URL.concat(path), data, auth())
        .then(response => response.data)
}

export const PATCH = async (path, data) => {
    return await axios
        .patch(BASE_URL.concat(path), data, auth())
        .then(response => response.data)
}


export const DELETE = async (path) => {
    return await axios
        .delete(BASE_URL.concat(path), auth())
        .then(response => response.data)
}