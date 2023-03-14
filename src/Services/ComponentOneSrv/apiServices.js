import axios from 'axios';
import { configUrl } from '../configuration';

import {getRequest} from '../baseService/Services'


// get all lots service 
export const someService = async () => {
    const response = await getRequest(configUrl.someURL);
    if (response) {
      // console.log("getAllOriginsResponse----------------------", response);
      return response;
    } else {
      console.log("get srv errorr");
    }
  };