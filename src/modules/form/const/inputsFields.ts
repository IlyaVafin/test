import type { InputField } from "../types";


export const inputsFields: InputField[] = [
	{
		label: "Контрагент (поиск по телефону)",
		id: "contr-agent",
		type: "select",
    name: "agent"
	},
	{
		label: "Счёт поступления",
		id: "check",
		type: "select",
    name: "check"
	},
	{
		label: "Склад отгрузки",
		id: "warehouse",
		type: "select",
    name: "warehouse"
	},
	{
		label: "Организация",
		id: "organization",
		type: "select",
    name: "organization"
	},
	{
		label: "Тип цены",
		id: "price",
		type: "select",
    name: "price_type"
	},
	{
		label: "Поиск товара",
		id: "search-item",
		type: "text",
	},
]
