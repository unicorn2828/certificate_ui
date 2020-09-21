export interface Token {
  userId: string;
  sub: string;
  exp: string;
  type: string;
  token: string;
  refreshToken: string;
}

export interface JWT {
  sub: string;
  role: [];
  iat: number;
  jti: string;
  exp: number;
}




