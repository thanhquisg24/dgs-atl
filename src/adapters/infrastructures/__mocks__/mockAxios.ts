import { AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";
import mockUser from "./user/index";

export default function mockAxios(axios: AxiosInstance): MockAdapter {
  const mock = new MockAdapter(axios);
  mockUser(mock);
  return mock;
}
