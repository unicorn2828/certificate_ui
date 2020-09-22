import {Tag} from './tag.model';

export interface Certificate {
  id: number;
  certificateName: string;
  description: string;
  price: number;
  creationDate?: any;
  modificationDate?: any;
  duration: number;
  tags: Tag[];
}

export interface Certificates {
  certificates: [];
}
