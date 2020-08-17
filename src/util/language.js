import {HTTP} from "@/util/http";

const getValidLanguages = () => {
  const url = `/healthbuddy/languageslist`
  let validLanguages = [];

  HTTP
    .get(url)
    .then(response => {
      validLanguages = response.data;
    })
    .catch(error => {
      console.log(error)
    })

  return validLanguages;
}

export const validLanguages = getValidLanguages();
