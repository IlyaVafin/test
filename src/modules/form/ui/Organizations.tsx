import { SelectItem } from "@/components/ui/select"
import type { InputField, Organization, ResponseResult } from "../types"

const Organizations = ({
	field,
	organizations,
}: {
	field: InputField
	organizations: ResponseResult<Organization> | undefined
}) => {
	return (
		<>
			{field.name === "organization" &&
				organizations !== undefined &&
				organizations.result.map(organization => (
					<SelectItem key={organization.id} value={`${organization.full_name}_${organization.id}`}>
						{organization.full_name ??
							organization.work_name ??
							organization.short_name}
					</SelectItem>
				))}
		</>
	)
}

export default Organizations
