import { SelectItem } from "@/components/ui/select"
import type { InputField, Price, ResponseResult } from "../types"

const PriceType = ({
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
					<SelectItem key={price.id} value={`${price.id}`}>
						{price.name}
					</SelectItem>
				))}
		</>
	)
}

export default PriceType
