import { Dispatch } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { AllActionType, RootStateType } from "../store/types";

// Use throughout your app instead of plain `useDispatch` and `useSelector`

export const useAppDispatch = (): Dispatch<AllActionType> => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;
