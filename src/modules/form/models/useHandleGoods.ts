import { useState } from "react"
import type { Good } from "../types"
import type { FormInfo } from "../api/FormInfo"

export const useHandleGoods = (formInfo: FormInfo) => {
	const [goods, setGoods] = useState<Good[] | string>([])
	const [isLoadingGoods, setIsLoadingGoods] = useState(false)
	const loadGoodsOnSearch = async (name: string) => {
		try {
			if (name.trim().length === 0) {
				setGoods([])
				return
			}
			setIsLoadingGoods(true)
			const item = await formInfo.getGood(name)
			if (typeof item !== "string") {
				setGoods(item.result)
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				setGoods(error.message)
			}
		} finally {
			setIsLoadingGoods(false)
		}
	}
	return {
		loadGoodsOnSearch,
		goods,
		isLoadingGoods,
	}
}
