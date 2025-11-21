
import { SelectItem } from "@/components/ui/select"
import type { InputField, ResponseResult, Warehouse } from "../types"

const Warehouses = ({
	field,
	warehouses,
}: {
	field: InputField
	warehouses: ResponseResult<Warehouse> | undefined
}) => {
	return (
		<>
			{field.name === "warehouse" &&
				warehouses !== undefined &&
				warehouses.result.map(warehouse => (
					<SelectItem key={warehouse.id} value={`${warehouse.id}`}>
						{warehouse.name}
					</SelectItem>
				))}
		</>
	)
}

export default Warehouses
