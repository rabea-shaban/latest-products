import { ProductNameType } from "../Types";

export interface IProduct {
  id?: string;
  title: string;
  description: string;
  imageURL: string;
  price: string;
  colors: string[];
  category: {
    name: string;
    imageURL: string;
  };
}

export interface IformInput {
  id: string;
  name: ProductNameType;
  label: string;
  type: string;
}

export interface Icategory {
  id: string;
  name: string;
  imageURL: string;
}
