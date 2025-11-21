import { SelectItem } from "@/components/ui/select"
import type { Agent, InputField, ResponseResult } from "../types"
import { memo } from "react"

const Agents = memo(
	({
		field,
		agents,
	}: {
		field: InputField
		agents: ResponseResult<Agent> | undefined
	}) => {
		return (
			<>
				{field.name === "agent" &&
					agents !== undefined &&
					agents.result.map(agent => (
						<SelectItem key={agent.id} value={`${agent.id}`}>
							{agent.name}
						</SelectItem>
					))}
			</>
		)
	}
)

Agents.displayName = "Agents"

export default Agents
