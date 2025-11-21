import { useCallback, useMemo, useState, type ChangeEvent } from "react"
import { FormInfo } from "../api/FormInfo"
import type { OrderForm } from "../types"

export const useHandleContinue = () => {
	const [tokenInput, setTokenInput] = useState("")
	const [show, setShow] = useState(false)
	const [error, setError] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const [orderForm, setOrderForm] = useState<OrderForm>({
		agents: undefined,
		organizations: undefined,
		payboxes: undefined,
		warehouses: undefined,
		typePrice: undefined,
	})
	const formInfo = useMemo(() => new FormInfo(tokenInput.trim()), [tokenInput])
	const handleContinue = useCallback(async () => {
		try {
			setIsLoading(true)
			const agents = await formInfo.getAgents()
			const payboxes = await formInfo.getPayBoxesList()
			const organizations = await formInfo.getOrganizations()
			const warehouses = await formInfo.getWarehouses()
			const typePrice = await formInfo.getPriceTypes()
			if (
				!agents ||
				typeof agents === "string" ||
				typeof payboxes === "string" ||
				typeof organizations === "string" ||
				typeof warehouses === "string" ||
				typeof typePrice === "string"
			)
				throw new Error("Invalid token")
			setOrderForm({
				agents,
				payboxes,
				organizations,
				warehouses,
				typePrice,
			})
			setShow(true)
			setError("")
		} catch (error: unknown) {
			if (error instanceof Error) {
				setError(error.message)
				setShow(false)
			} else {
				setError("Unknown error")
			}
		} finally {
			setIsLoading(false)
		}
	}, [formInfo])
	const handleTokenField = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => setTokenInput(e.target.value),
		[]
	)
	return {
		handleContinue,
		orderForm,
		tokenInput,
		handleTokenField,
		show,
		error,
		isLoading,
	}
}
