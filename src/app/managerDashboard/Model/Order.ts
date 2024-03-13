import { MenuItem } from "./MenuItem";

export interface Order{
    orderId:number;
    orderDate:string;
    status:string;
    totalCost:number;
    customerId:string;
    customerName :string ;
    restaurantId:number;
    restaurantName:string;
    

}