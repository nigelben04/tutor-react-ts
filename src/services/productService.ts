import { IProduct } from "../interfaces/IProduct";

export const fetchData = (): Promise<IProduct[]> => {
  return fetch("https://api.escuelajs.co/api/v1/products")
    .then((response) => response.json())
    .then((json: IProduct[]) => {
      return json;
    });
};

export const fetchDataPagination = (
  offset: number = 0,
  limit: number = 12
): Promise<IProduct[]> => {
  return fetch(
    `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`
  )
    .then((response) => response.json())
    .then((json: IProduct[]) => {
      return json;
    });
};
