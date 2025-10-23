export interface OrderItem {
    id: number;
    order_id: number;
    item_id: number;
    customizations: string | null;
    created_at: string;
    name: string;
    description: string;
  }
  
  export interface Order {
    id: number;
    kiosk_id: number;
    status: "pending" | "completed" | "canceled";
    user_profile: any | null;
    created_at: string;
    completed_at: string | null;
    survey_response: any | null;
    kiosk_type: string;
    items: OrderItem[];
  }
  
  export interface OrdersResponse {
    orders: Order[];
  }
  
  export interface Item {
    id: number;
    slug: string;
    kiosk_type: string;
    item_type: string;
    name: string;
    description: string;
    available: boolean;
    created_at: string;
  }
  
  export interface ItemsResponse {
    items: Item[];
  }
  
  export type OrderCardProps = {
    order: Order;
    containerHeight: number;
    scrollTop: number;
    getItemScale: (index: number) => string;
    refetchOrders: () => void;
    isFetchingOrders: boolean;
    index: number;
  };

  export type RightSectionProps = {
    screenStatus: boolean;
    setScreenStatus: (status: boolean) => void;
  };