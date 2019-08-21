interface BaseResult {
  kind: string;
  etag: string;
}

export interface ListResult<T> extends BaseResult {
  id: string;
  title: string;
  nextPageToken: string;
  items: T[];
}
