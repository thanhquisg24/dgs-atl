/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { AXIOS_BASE_URL } from "../adapters.infrastructures.config";
import customAxios from "../axios/customeAxios";
// import jsonServerProvider from "ra-data-json-server";
import myDataProvider from "./myProvider";

export const restProvider = myDataProvider(AXIOS_BASE_URL, customAxios, "X-Total-Count");
