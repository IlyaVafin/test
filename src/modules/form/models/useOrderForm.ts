import {
	useCallback,
	useState,
	type ChangeEvent,
	type KeyboardEvent,
} from "react"
import type { Agent, OrderForm } from "../types"
import { useGetAndValidateFormInfo } from "./useGetAndValidateFormInfo"
import { useHandleGoods } from "./useHandleGoods"
import { debounce } from "@/shared/utils/debounce."

export const useOrderForm = () => {
	const [tokenInput, setTokenInput] = useState("")
	const [searchQuery, setSearchQuery] = useState("")
	const [agents, setAgents] = useState<Agent[] | string>([])
	const [isLoadingAgents, setIsLoadingAgents] = useState(false)
	const [show, setShow] = useState(false)
	const [error, setError] = useState("")
	const [isOpen, setIsOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [orderForm, setOrderForm] = useState<OrderForm>({
		organizations: undefined,
		payboxes: undefined,
		warehouses: undefined,
		typePrice: undefined,
	})

	const { getFormInfo, isHaveFormInfo, formInfo } = useGetAndValidateFormInfo(
		tokenInput,
		orderForm
	)
	const { goods, loadGoodsOnSearch, isLoadingGoods } = useHandleGoods(formInfo)
	const loadAgentsOnSearch = async () => {
		try {
			if (searchQuery.trim().length === 0) {
				setAgents([])
				return
			}
			setIsLoadingAgents(true)
			const item = await formInfo.getAgents(searchQuery)
			if (typeof item !== "string") {
				setAgents(item.result)
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				setAgents(error.message)
			}
		} finally {
			setIsLoadingAgents(false)
		}
	}

	const handleContinue = useCallback(async () => {
		try {
			if (tokenInput.length < 1) return
			if (isHaveFormInfo()) return
			const { organizations, payboxes, typePrice, warehouses } =
				await getFormInfo()
			setIsLoading(true)
			if (
				typeof payboxes === "string" ||
				typeof organizations === "string" ||
				typeof warehouses === "string" ||
				typeof typePrice === "string"
			)
				throw new Error("Invalid token")
			setOrderForm({
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
	const debounceSearchAgents = debounce(loadAgentsOnSearch, 500)
	const onKeyDownSelect = async (e: KeyboardEvent<HTMLDivElement>) => {
		if (e.key.length === 1 && /[0-9+()-\s]/.test(e.key)) {
			const newQuery = searchQuery + e.key
			setSearchQuery(newQuery)
			await debounceSearchAgents()
		}
		if (e.key === "Backspace") {
			const newQuery = searchQuery.slice(0, -1)
			setSearchQuery(newQuery)
			await debounceSearchAgents()
		}
	}
	const changeSearchQuery = (open: boolean) => {
		if (open === false) {
			setSearchQuery("")
			setAgents([])
			setIsOpen(false)
		} else {
			setIsOpen(true)
		}
	}
	return {
		handleContinue,
		orderForm,
		tokenInput,
		handleTokenField,
		show,
		error,
		isLoading,
		loadGoodsOnSearch,
		goods,
		onKeyDownSelect,
		agents,
		changeSearchQuery,
		searchQuery,
		isLoadingGoods,
		loadAgentsOnSearch,
		isLoadingAgents,
		isOpen
	}
}
