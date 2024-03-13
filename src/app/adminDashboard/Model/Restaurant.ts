import { MenuItem } from "../../managerDashboard/Model/MenuItem";

export interface Restaurant{
    imageUrl: string;
    restaurantId:number ;
    name:string;
    location:string;
    contactNumber:string;
    rating:number;
    menuItemSet: MenuItem[];
    
}