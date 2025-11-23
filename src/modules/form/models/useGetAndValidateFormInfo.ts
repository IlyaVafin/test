import { useCallback, useMemo } from "react"
import { FormInfo } from "../api/FormInfo"
import type { OrderForm } from "../types"

export const useGetAndValidateFormInfo = (
  tokenInput: string,
	orderForm: OrderForm
) => {
	const formInfo = useMemo(() => new FormInfo(tokenInput.trim()), [tokenInput])
	const isHaveFormInfo = useCallback(() => {
		const {organizations, payboxes, typePrice, warehouses } = orderForm
		return !!(organizations && payboxes && typePrice && warehouses)
	}, [orderForm])
	const getFormInfo = useCallback(async () => {
		const payboxes = await formInfo.getPayBoxesList()
		const organizations = await formInfo.getOrganizations()
		const warehouses = await formInfo.getWarehouses()
		const typePrice = await formInfo.getPriceTypes()
		return {
			payboxes,
			organizations,
			warehouses,
			typePrice,
		}
	}, [formInfo])
	return {
		isHaveFormInfo,
		getFormInfo,
    formInfo
	}
}
