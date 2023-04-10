// auth

interface ISignIn {
  email: string;
  password: string;
}

interface ISignUp {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
}

interface IAuthContext {
  loggedIn?: boolean;
  setLoggedIn?: React.Dispatch<React.SetStateAction<boolean>>;
  user?: IUser;
  setUser?: React.Dispatch<React.SetStateAction<IUser | undefined>>;
}

interface IUser {
  userName: string;
  role: string;
}

interface IPayload {
  id: string;
  userName: string;
  role: string;
  iat: number;
  exp: number;
}

interface IAuthError {
  error: string;
}

// guest

interface IGuest {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  createdAt: string;
}

// category

interface ICategory {
  _id: string;
  name: string;
  artPieces: number;
}

interface ICategoryDetails {
  name: string;
  description: string;
  image: File | null;
}

interface ICategoryResponse {
  _id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  artPieces: number;
  createdAt: string;
  updatedAt: string;
}

// art piece

interface IArtPiece {
  _id: string;
  title: string;
  category: string;
  dateAdded: string;
}

interface IArtPieceCard {
  _id: string;
  title: string;
  price: number;
  image: string;
}

interface IArtPieceDetails {
  title: string;
  category: string;
  brief: string;
  image: File | null;
  width: number;
  height: number;
  price: number;
  year: number;
  otherSizes?: INewSize[];
}

interface IArtPieceResponse {
  _id: string;
  title: string;
  categoryId: string;
  image: string;
  brief: string;
  width: number;
  height: number;
  price: number;
  year: number;
  otherSizes?: INewSize[];
  createdAt: string;
  updatedAt: string;
}

interface INewSize {
  id: string;
  width: number;
  height: number;
  price: number;
}

// cart

interface ICartItem {
  id: string;
  title: string;
  image: string;
  width: number;
  height: number;
  price: number;
  quantity: number;
  selectedSizeId?: string;
}

interface ICartContext {
  cartItems?: ICartItem[];
  setCartItems?: React.Dispatch<React.SetStateAction<ICartItem[]>>;
}

interface ICheckoutDetails {
  items: { id: string; quantity: number; selectedSize?: string }[];
}

interface IPurchase {
  _id: string;
  purchaseId: string;
  amount: number;
  createdAt: string;
  user: IGuest;
  status: "pending" | "delivered";
  cartItems: { artPiece: IArtPieceDetails; quantity: number }[];
  deliveryDate: string;
}

// dashboard

interface IDashboardData {
  artPieces: number;
  categories: number;
  users: number;
  latestUsers: IGuest[];
  latestPurchases: IPurchase[];
}

// contact

interface IContactMessage {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}
