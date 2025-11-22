export interface Repeat {
  repeat_parent_id: number;
  repeat_period: "yearly";
  repeat_weekday: string;
  repeat_day: number;
  repeat_month: number;
  repeat_first: number;
  repeat_last: number;
  repeat_seconds: number;
  repeat_number: number;
}

export interface Transaction {
  id: number;
  contragent: number;
  type: string;
  name: string;
  external_id: string;
  tags: string;
  amount_without_tax: number;
  article: string;
  article_id: number;
  project_id: number;
  amount: number;
  description: string;
  paybox: number;
  paybox_to: number;
  source_account_name: string;
  source_account_id: number;
  date: number;
  repeat_freq: number;
  repeat: Repeat;
  status: boolean;
  stopped: boolean;
  tax: number;
  tax_type: string;
  deb_cred: boolean;
  raspilen: boolean;
  parent_id: number;
  contragent_name: string;
  cheque: number;
  docs_sales_id: number;
  docs_purchases_id: number;
  created_at: number;
  updated_at: number;
  can_be_deleted_or_edited: boolean;
}




export interface Agent {
	id: number
	name: string
	external_id: string
	phone: string
	phone_code: string
	inn: string
	description: string | null
	contragent_type: string | null
	type: string | null
	birth_date: string | null
	data: string | null
	additional_phones: string | null
	gender: string | null
	cashbox: number
	is_deleted: boolean
	is_phone_formatted: boolean
	created_at: number
	updated_at: number
	email: string
}



export interface Warehouse {
  name: string 
  type: null | string 
  description: null | string
  address: null | string
  phone: null | string
  parent: number 
  is_public: boolean
  status: boolean
  id: number 
  updated_at: number 
  created_at: number 
  longitude: null | string
  latitude: null | string
}

export interface Organization {
  type: string
  short_name: string 
  full_name: string 
  work_name: string | null
  prefix: string 
  inn: number 
  kpp: number 
  okved: number 
  okved2: number
  okpo: number 
  ogrn: number 
  org_type: string
  tax_type: string 
  tax_percent: number 
  registration_date: number 
  id: number 
  updated_at: number 
  created_at: number  
}

export interface Price {
  name: string 
  id: number 
  updated_at: number 
  created_at: number 
}

export interface ResponseResult<T> {
  result: T[]
  count: number
}

export interface OrderForm {
  agents: ResponseResult<Agent> | undefined
  payboxes: ResponseResult<Transaction> | undefined
  warehouses: ResponseResult<Warehouse> | undefined
  organizations: ResponseResult<Organization> | undefined
  typePrice: ResponseResult<Price> | undefined
}


export interface InputField {
	label: string
	id: string
	type: "select" | "text" | "search"
	name?: "agent" | "check" | "organization" | "price_type" | "warehouse"
}

export interface Good {
  name: string | null;
  type: string | null;
  description_short: string | null;
  description_long: string | null;
  code: string | null;
  unit: string | null;
  category: number;
  manufacturer: string | null;
  chatting_percent: number | null;
  cashback_type: string;
  cashback_value: number;
  external_id: string | null;
  tags: string[];
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string[];
  id: number;
  unit_name: string | null;
  barcodes: string[];
  prices: string[] | null;
  balances: string[] | null;
  attributes: string[] | null;
  photos: string[] | null;
  group_id: string | null;
  group_name: string | null;
  is_main: boolean | null;
  updated_at: number;
  created_at: number;
}