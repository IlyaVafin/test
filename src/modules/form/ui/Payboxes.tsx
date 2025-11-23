import { SelectItem } from "./../../../components/ui/select"
import type { InputField, ResponseResult, Transaction } from "../types"

const Payboxes = ({
	field,
	payboxes,
}: {
	field: InputField
	payboxes: ResponseResult<Transaction> | undefined
}) => {
	return (
		<>
			{field.name === "check" &&
				payboxes !== undefined &&
				payboxes.result.map(paybox => (
					<SelectItem key={paybox.id} value={`${paybox.name}_${paybox.id}`}>
						{paybox.name}
					</SelectItem>
				))}
		</>
	)
}

export default Payboxes
