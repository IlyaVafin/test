import {
	useCallback,
	useMemo,
	useState,
	type ChangeEvent,
	type KeyboardEvent,
} from "react"
import { FormInfo } from "../api/FormInfo"
import type { OrderForm } from "../types"
import { useHandleGoods } from "./useHandleGoods"
// TODO: RENAME useHandleContinue to useOrderForm
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
	const [searchQuery, setSearchQuery] = useState("")
	const formInfo = useMemo(() => new FormInfo(tokenInput.trim()), [tokenInput])
	const { goods, loadGoodsOnFocus } = useHandleGoods(formInfo)
	const filtered = useMemo(() => {
		return orderForm?.agents?.result.filter(agent =>
			agent.phone
				.toLowerCase()
				.trim()
				.includes(searchQuery.trim().toLowerCase())
		)
	}, [searchQuery, orderForm.agents?.result])
	const isHaveFormInfo = useCallback(() => {
		const { agents, organizations, payboxes, typePrice, warehouses } = orderForm
		return !!(agents && organizations && payboxes && typePrice && warehouses)
	}, [orderForm])
	const getFormInfo = useCallback(async () => {
		const agents = await formInfo.getAgents()
		const payboxes = await formInfo.getPayBoxesList()
		const organizations = await formInfo.getOrganizations()
		const warehouses = await formInfo.getWarehouses()
		const typePrice = await formInfo.getPriceTypes()
		return {
			agents,
			payboxes,
			organizations,
			warehouses,
			typePrice,
		}
	}, [])
	const handleContinue = useCallback(async () => {
		try {
			if (tokenInput.length < 1) return
			if (isHaveFormInfo()) return
			const { agents, organizations, payboxes, typePrice, warehouses } =
				await getFormInfo()
			setIsLoading(true)
			if (
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
	}, [tokenInput.length, isHaveFormInfo, getFormInfo])
	const handleTokenField = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => setTokenInput(e.target.value),
		[]
	)

	const onKeyDownSelect = (e: KeyboardEvent<HTMLDivElement>) => {
		if (e.key.length === 1 && /[0-9+()-\s]/.test(e.key)) {
			console.log(e.key)
			const newQuery = searchQuery + e.key
			setSearchQuery(newQuery)
		}
		if (e.key === "Backspace") {
			setSearchQuery(prev => prev.slice(0, -1))
		}
	}
	const changeSearchQuery = (open: boolean) => {
		if (open === false) setSearchQuery("")
	}
	return {
		handleContinue,
		orderForm,
		tokenInput,
		handleTokenField,
		show,
		error,
		isLoading,
		loadGoodsOnFocus,
		goods,
		onKeyDownSelect,
		filtered,
		changeSearchQuery,
		searchQuery,
	}
}
