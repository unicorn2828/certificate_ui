export interface Certificate {
  id: number;
  certificateName: string;
  description: string;
  price: number;
  creationDate?: any;
  modificationDate?: any;
  duration: number;
}

export interface Certificates {
  certificates: [];
}

export interface UpdatedCertificate {
  certificateName: string;
  description: string;
  price: number;
  creationDate: string;
  duration: number;
  tags: [];
}
