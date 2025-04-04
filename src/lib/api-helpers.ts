export type FetchResult<T> = { status: "success"; data: T } | { status: "error"; message: string };
