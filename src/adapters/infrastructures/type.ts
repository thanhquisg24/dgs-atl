/**
 * data types
 */

export type Identifier = string | number;
export interface Record {
  id: Identifier;
  [key: string]: any;
}

export interface RecordMap<RecordType extends Record = Record> {
  // Accept strings and numbers as identifiers
  [id: string]: RecordType;
  [id: number]: RecordType;
}

export interface SortPayload {
  field: string;
  order: string;
}
export interface FilterPayload {
  [k: string]: any;
}
export interface PaginationPayload {
  page: number;
  perPage: number;
}
export type ValidUntil = Date;
/**
 * i18nProvider types
 */

export const I18N_TRANSLATE = "I18N_TRANSLATE";
export const I18N_CHANGE_LOCALE = "I18N_CHANGE_LOCALE";

export type Translate = (key: string, options?: any) => string;

export type I18nProvider = {
  translate: Translate;
  changeLocale: (locale: string, options?: any) => Promise<void>;
  getLocale: () => string;
  [key: string]: any;
};

export interface UserIdentity {
  id: Identifier;
  fullName?: string;
  avatar?: string;
  [key: string]: any;
}

/**
 * authProvider types
 */
export type AuthProvider = {
  login: (params: any) => Promise<any>;
  logout: (params: any) => Promise<void | false | string>;
  checkAuth: (params: any) => Promise<void>;
  checkError: (error: any) => Promise<void>;
  getPermissions: (params: any) => Promise<any>;
  getIdentity?: () => Promise<UserIdentity>;
  [key: string]: any;
};

/**
 * dataProvider types
 */

export type DataProvider = {
  getList: <RecordType extends Record = Record>(
    resource: string,
    params: GetListParams,
  ) => Promise<GetListResult<RecordType>>;

  getOne: <RecordType extends Record = Record>(
    resource: string,
    params: GetOneParams,
  ) => Promise<GetOneResult<RecordType>>;

  getMany: <RecordType extends Record = Record>(
    resource: string,
    params: GetManyParams,
  ) => Promise<GetManyResult<RecordType>>;

  getManyReference: <RecordType extends Record = Record>(
    resource: string,
    params: GetManyReferenceParams,
  ) => Promise<GetManyReferenceResult<RecordType>>;

  update: <RecordType extends Record = Record>(
    resource: string,
    params: UpdateParams,
  ) => Promise<UpdateResult<RecordType>>;

  updateMany: (resource: string, params: UpdateManyParams) => Promise<UpdateManyResult>;

  create: <RecordType extends Record = Record>(
    resource: string,
    params: CreateParams,
  ) => Promise<CreateResult<RecordType>>;

  delete: <RecordType extends Record = Record>(
    resource: string,
    params: DeleteParams,
  ) => Promise<DeleteResult<RecordType>>;

  deleteMany: (resource: string, params: DeleteManyParams) => Promise<DeleteManyResult>;

  [key: string]: any;
};

export interface GetListParams {
  pagination: PaginationPayload;
  sort: SortPayload;
  filter: any;
}
export interface GetListResult<RecordType extends Record = Record> {
  data: RecordType[];
  total: number;
  validUntil?: ValidUntil;
}

export interface GetOneParams {
  id: Identifier;
}
export interface GetOneResult<RecordType extends Record = Record> {
  dgsIdSport(arg0: string, dgsIdSport: any): unknown;
  dgsIdLeague(arg0: string, dgsIdLeague: any): unknown;
  data: RecordType;
  validUntil?: ValidUntil;
}

export interface GetManyParams {
  ids: Identifier[];
}
export interface GetManyResult<RecordType extends Record = Record> {
  data: RecordType[];
  validUntil?: ValidUntil;
}

export interface GetManyReferenceParams {
  target: string;
  id: Identifier;
  pagination: PaginationPayload;
  sort: SortPayload;
  filter: any;
}
export interface GetManyReferenceResult<RecordType extends Record = Record> {
  data: RecordType[];
  total: number;
  validUntil?: ValidUntil;
}

export interface UpdateParams<T = any> {
  id: Identifier;
  data: T;
  previousData: Record;
}
export interface UpdateResult<RecordType extends Record = Record> {
  data: RecordType;
  validUntil?: ValidUntil;
}

export interface UpdateManyParams<T = any> {
  ids: Identifier[];
  data: T;
}
export interface UpdateManyResult {
  data?: Identifier[];
  validUntil?: ValidUntil;
}

export interface CreateParams<T = any> {
  data: T;
}
export interface CreateResult<RecordType extends Record = Record> {
  data: RecordType;
  validUntil?: ValidUntil;
}

export interface DeleteParams {
  id: Identifier;
  previousData?: Record;
}
export interface DeleteResult<RecordType extends Record = Record> {
  data: RecordType;
}

export interface DeleteManyParams {
  ids: Identifier[];
}
export interface DeleteManyResult {
  data?: Identifier[];
}

export type DataProviderResult<RecordType extends Record = Record> =
  | CreateResult<RecordType>
  | DeleteResult<RecordType>
  | DeleteManyResult
  | GetListResult<RecordType>
  | GetManyResult<RecordType>
  | GetManyReferenceResult<RecordType>
  | GetOneResult<RecordType>
  | UpdateResult<RecordType>
  | UpdateManyResult;

// This generic function type extracts the parameters of the function passed as its DataProviderMethod generic parameter.
// It returns another function with the same parameters plus an optional options parameter used by the useDataProvider hook to specify side effects.
// The returned function has the same result type as the original
type DataProviderProxyMethod<TDataProviderMethod> = TDataProviderMethod extends (...a: any[]) => infer Result
  ? (
      // This strange spread usage is required for two reasons
      // 1. It keeps the named parameters of the original function
      // 2. It allows to add an optional options parameter as the LAST parameter
      ...a: [...Args: Parameters<TDataProviderMethod>, options?: UseDataProviderOptions]
    ) => Result
  : never;

export type DataProviderProxy<TDataProvider extends DataProvider = DataProvider> = {
  [MethodKey in keyof TDataProvider]: DataProviderProxyMethod<TDataProvider[MethodKey]>;
} & {
  getList: <RecordType extends Record = Record>(
    resource: string,
    params: GetListParams,
    options?: UseDataProviderOptions,
  ) => Promise<GetListResult<RecordType>>;

  getOne: <RecordType extends Record = Record>(
    resource: string,
    params: GetOneParams,
    options?: UseDataProviderOptions,
  ) => Promise<GetOneResult<RecordType>>;

  getMany: <RecordType extends Record = Record>(
    resource: string,
    params: GetManyParams,
    options?: UseDataProviderOptions,
  ) => Promise<GetManyResult<RecordType>>;

  getManyReference: <RecordType extends Record = Record>(
    resource: string,
    params: GetManyReferenceParams,
    options?: UseDataProviderOptions,
  ) => Promise<GetManyReferenceResult<RecordType>>;

  update: <RecordType extends Record = Record>(
    resource: string,
    params: UpdateParams,
    options?: UseDataProviderOptions,
  ) => Promise<UpdateResult<RecordType>>;

  create: <RecordType extends Record = Record>(
    resource: string,
    params: CreateParams,
  ) => Promise<CreateResult<RecordType>>;

  delete: <RecordType extends Record = Record>(
    resource: string,
    params: DeleteParams,
  ) => Promise<DeleteResult<RecordType>>;
};

export type MutationMode = "pessimistic" | "optimistic" | "undoable";
export type OnSuccess = (response?: any) => void;
export type OnFailure = (error?: any) => void;

export interface UseDataProviderOptions {
  action?: string;
  fetch?: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  meta?: object;
  // @deprecated use mode: 'undoable' instead
  undoable?: boolean;
  mutationMode?: MutationMode;
  onSuccess?: OnSuccess;
  onFailure?: OnFailure;
  enabled?: boolean;
}

export type LegacyDataProvider = (type: string, resource: string, params: any) => Promise<any>;

export interface ResourceDefinition {
  readonly name: string;
  readonly options?: any;
  readonly hasList?: boolean;
  readonly hasEdit?: boolean;
  readonly hasShow?: boolean;
  readonly hasCreate?: boolean;
  readonly icon?: any;
}

/**
 * Redux state type
 */
export interface ReduxState {
  admin: {
    ui: {
      automaticRefreshEnabled: boolean;
      optimistic: boolean;
      sidebarOpen: boolean;
      viewVersion: number;
    };
    resources: {
      [name: string]: {
        props: ResourceDefinition;
        data: RecordMap;
        list: {
          cachedRequests?: {
            ids: Identifier[];
            total: number;
            validity: Date;
          };
          expanded: Identifier[];
          ids: Identifier[];
          loadedOnce: boolean;
          params: any;
          selectedIds: Identifier[];
          total: number;
        };
        validity: {
          [key: string]: Date;
          [key: number]: Date;
        };
      };
    };
    references: {
      oneToMany: {
        [relatedTo: string]: { ids: Identifier[]; total: number };
      };
    };
    loading: number;
    customQueries: {
      [key: string]: any;
    };
  };
  router: {
    location: Location;
  };

  // leave space for custom reducers
  [key: string]: any;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type InitialState = object | (() => object);

/**
 * Misc types
 */

export type Dispatch<T> = T extends (...args: infer A) => any ? (...args: A) => void : never;

export interface ResourceComponentInjectedProps {
  basePath?: string;
  permissions?: any;
  resource?: string;
  options?: any;
  hasList?: boolean;
  hasEdit?: boolean;
  hasShow?: boolean;
  hasCreate?: boolean;
}
