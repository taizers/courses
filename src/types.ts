import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export interface useGetQueryResponse<T> {
    data: T;
    error?: FetchBaseQueryError | SerializedError;
    isLoading: boolean;
}

export interface IResponsePaginatedData<T> {
    totalElements: number;
    totalPages: number;
    content: T[];
}