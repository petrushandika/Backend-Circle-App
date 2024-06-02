export interface UserJWTPayload {
  id: number;
  fullName: string;
  username: string;
  email: string;
  avatar: string;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
}
