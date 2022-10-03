/* eslint-disable function-paren-newline */
import { AxiosInstance } from "axios";
import { get, isEmpty, omit, pick } from "lodash";
import { stringify } from "querystring";
import customAxios from "../axios/customeAxios";
import { DataProvider } from "../type";

const myDataProvider = (
  apiUrl: string,
  httpClient: AxiosInstance = customAxios,
  countHeader = "Content-Range",
): DataProvider => ({
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort || {};
    const originfillter = omit(params.filter, ["$merge"]);
    const mergefillter = pick(params.filter, ["$merge"]);
    if (isEmpty(mergefillter) === false) {
      Object.keys(mergefillter?.$merge).forEach((k) => {
        originfillter[k] = { ...originfillter[k], ...mergefillter.$merge[k] };
      });
    }
    const query = {
      sort: "",
      // sort: JSON.stringify([field, order]),
      // range: JSON.stringify([rangeStart, rangeEnd]),
      range: JSON.stringify([page - 1, perPage]),
      filter: JSON.stringify(originfillter),
    };
    if (field) {
      const fieldParts = field.split(",");
      const orderParts = order.split(",");
      const arr = [];
      for (let i = 0; i < fieldParts.length; i++) {
        arr.push(fieldParts[i]);
        arr.push(orderParts[i]);
      }
      query.sort = JSON.stringify(arr);
    }
    const url = `/${resource}?${stringify(query)}`;
    const options = {};

    return httpClient(url, options).then(({ data }) => {
      return {
        data: data.content,
        total: data.totalElements,
        page: data.pageable.pageNumber,
      };
    });
  },

  getOne: (resource, params) => httpClient(`/${resource}/${params.id}`).then(({ data }) => data),

  getMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    const url = `/${resource}?${stringify(query)}`;
    return httpClient(url).then(({ data }) => ({ data: data.content }));
  },

  getManyReference: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;

    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([page - 1, perPage]),
      //   range: JSON.stringify([rangeStart, rangeEnd]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    };
    const url = `/${resource}?${stringify(query)}`;
    const options = {};

    return httpClient(url, options).then(({ headers, data }) => {
      if (!get(headers, "countHeader")) {
        throw new Error(
          `The ${countHeader} header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare ${countHeader} in the Access-Control-Expose-Headers header?`,
        );
      }
      const p = get(headers, "countHeader");
      return {
        data: data.content,
        total: parseInt(p || "0", 10),
      };
    });
  },

  update: (resource, params) => {
    return httpClient(`/${resource}/${params.id}`, {
      method: "PUT",
      data: JSON.stringify(params.data),
    }).then(({ data }) => ({ data }));
  },

  // simple-rest doesn't handle provide an updateMany route, so we fallback to calling update n times instead
  updateMany: (resource, params) =>
    Promise.all(
      params.ids.map((id) =>
        httpClient(`/${resource}/${id}`, {
          method: "PUT",
          data: JSON.stringify(params.data),
        }),
      ),
    ).then((responses) => ({ data: responses.map(({ data }) => data.id) })),

  create: (resource, params) => {
    return httpClient(`/${resource}`, {
      method: "POST",
      data: JSON.stringify(params.data),
    }).then(({ data }) => ({
      data: { ...params.data, id: data.id },
    }));
  },

  delete: (resource, params) =>
    httpClient(`/${resource}/${params.id}`, {
      method: "DELETE",
    }).then(({ data }) => ({ data })),

  // simple-rest doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
  deleteMany: (resource, params) =>
    Promise.all(
      params.ids.map((id) =>
        httpClient(`/${resource}/${id}`, {
          method: "DELETE",
        }),
      ),
    ).then((responses) => ({
      data: responses.map(({ data }) => data),
    })),
});
export default myDataProvider;
