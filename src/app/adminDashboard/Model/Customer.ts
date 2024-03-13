export interface Customer {
    custId: number;
    custName: string;
    gender: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    addressDTO: {
        houseNo: string;
        area: string;
        landmark: string;
        city: string;
        pincode: number;
    };
}
