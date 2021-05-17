import { Category } from './Category';

export type Product = {
  active: boolean;
  assets: [];
  categories: Category[];
  checkout_url: {
    checkout: string;
    display: string;
  };
  collects: {
    fullname: boolean;
    shipping_address: boolean;
    billing_address: boolean;
    extra_fields: boolean;
  };
  conditionals: {
    collects_billing_address: boolean;
    collects_extra_fields: boolean;
    collects_fullname: boolean;
    collects_shipping_address: boolean;
    has_digital_delivery: boolean;
    has_images: boolean;
    has_physical_delivery: boolean;
    has_rich_embed: boolean;
    has_video: boolean;
    is_active: boolean;
    is_free: boolean;
    is_inventory_managed: boolean;
    is_pay_what_you_want: boolean;
    is_sold_out: boolean;
    is_tax_exempt: boolean;
  };
  created: number;
  description: string;
  extra_fields: [];
  has: {
    digital_delivery: boolean;
    physical_delivery: boolean;
    images: boolean;
    video: boolean;
    rich_embed: boolean;
  };
  id: string;
  inventory: { managed: boolean; available: number };
  is: {
    active: boolean;
    free: boolean;
    inventory_managed: boolean;
    pay_what_you_want: boolean;
    sold_out: boolean;
    tax_exempt: boolean;
  };
  media: { type: string; source: string };
  meta: null;
  name: string;
  permalink: string;
  price: {
    raw: number;
    formatted: string;
    formatted_with_symbol: string;
    formatted_with_code: string;
  };
  related_products: [];
  seo?: { title?: string; description?: string };
  sku: string;
  sort_order: number;
  thank_you_url?: string;
  updated: number;
  variant_groups: [];
};
