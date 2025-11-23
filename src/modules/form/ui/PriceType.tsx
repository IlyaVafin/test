import { SelectItem } from "@/components/ui/select"
import type { InputField, Price, ResponseResult } from "../types"
import { memo } from "react"

const PriceType = memo(
	({
		field,
		typePrice,
	}: {
		field: InputField
		typePrice: ResponseResult<Price> | undefined
	}) => {
		return (
			<>
				{field.name === "price_type" &&
					typePrice?.result !== undefined &&
					typePrice.result.map(price => (
						<SelectItem key={price.id} value={`${price.name}_${price.id}`}>
							{price.name}
						</SelectItem>
					))}
			</>
		)
	}
)
PriceType.displayName = "PriceType"
export default PriceType
