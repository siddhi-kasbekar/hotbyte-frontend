export interface CustomerProfile {
    custId: number;
    custName: string;
    gender: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    address: {
        houseNo: string;
        area: string;
        landmark: string;
        city: string;
        pincode: number;
    };
}