import { api } from "@/shared/api/instance"
import type {
	Agent,
	Good,
	Organization,
	Price,
	ResponseResult,
	Transaction,
	Warehouse,
} from "../types"

export class FormInfo {
	private token
	constructor(token: string) {
		this.token = token
	}
	getAgents = async () => {
		try {
			const response = await api.get<ResponseResult<Agent>>(
				`/contragents?token=${this.token}`
			)

			return response
		} catch (error: unknown) {
			return `${error}`
		}
	}
	getPayBoxesList = async () => {
		try {
			const response = await api.get<ResponseResult<Transaction>>(
				`/payboxes?token=${this.token}`
			)
			return response
		} catch (error) {
			return `${error}`
		}
	}
	getWarehouses = async () => {
		try {
			const response = await api.get<ResponseResult<Warehouse>>(
				`/warehouses?token=${this.token}`
			)
			return response
		} catch (error) {
			return `${error}`
		}
	}
	getOrganizations = async () => {
		try {
			const response = await api.get<ResponseResult<Organization>>(
				`/organizations?token=${this.token}`
			)
			return response
		} catch (error) {
			return `${error}`
		}
	}
	getPriceTypes = async () => {
		try {
			const response = await api.get<ResponseResult<Price>>(
				`/price_types?token=${this.token}`
			)
			return response
		} catch (error) {
			return `${error}`
		}
	}
	getGoods = async () => {
		try {
			const response = await api.get<ResponseResult<Good>>(`/nomenclature?token=${this.token}`)
			return response
		} catch (error) {
			return `${error}`
		}
	}
}
