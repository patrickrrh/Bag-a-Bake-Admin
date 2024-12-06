export type BakeryType = {
    bakeryId: number;
    userId: number;
    bakeryName: string;
    bakeryImage: string;
    bakeryDescription: string;
    bakeryPhoneNumber: string;
    openingTime: string;
    closingTime: string;
    bakeryAddress: string;
    bakeryLatitude: number;
    bakeryLongitude: number;
    isActive: number;
    user: UserType;
    payment: PaymentType[];
}

export type UserType = {
    email: string;
    password: string;
    regionId: number;
    signUpDate: string;
    userId: number;
    userImage: string | null;
    userName: string;
    userPhoneNumber: string;
    bakery: BakeryType;
    address: string;
    latitude: number;
    longitude: number;
    isCancelled: number;
}

export type PaymentType = {
    paymentId: number;
    bakeryId: number;
    paymentMethod: string;
    paymentService: string;
    paymentDetail: string;
}