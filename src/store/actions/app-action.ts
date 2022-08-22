import { createAction } from "@reduxjs/toolkit";

export const appInitAction = createAction<undefined>("app/INIT");
export type CombineAppActionTypes = ReturnType<typeof appInitAction>;
