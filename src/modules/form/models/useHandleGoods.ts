import { useState } from "react"
import type { Good } from "../types"
import type { FormInfo } from "../api/FormInfo"

export const useHandleGoods = (formInfo: FormInfo) => {
	const [goods, setGoods] = useState<Good[] | string>([])
	const handleGetGoods = async () => {
		const goods = await formInfo.getGoods()
		return goods
	}
	const loadGoodsOnFocus = async () => {
		if (goods.length > 0) return
		const items = await handleGetGoods()
		if (typeof items !== "string") {
			setGoods(items.result)
		} else {
			setGoods(items)
		}
	}
  return {
    loadGoodsOnFocus,
    goods
  }
}
