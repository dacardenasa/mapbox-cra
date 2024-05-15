import axios from "axios";

export const mapBoxApi = axios.create({
  baseURL: "https://api.mapbox.com",
  params: {
    language: "en",
    access_token:
      "pk.eyJ1IjoiZGFjYXJkZW5hc2EiLCJhIjoiY2x3NmpzeDE3MXZhODJscXV1cXp5aXVvNSJ9.J82yi5k3bOU4WVQpai_QfQ"
  }
});
