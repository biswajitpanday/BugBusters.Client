export type PagedResponse<T> = {
    items?: T;
    totalPages: number;
    itemCount: number;
}