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
						<>
							{agent.name.length > 0 && (
								<SelectItem key={agent.id} value={`${agent.name}_${agent.id}`}>
									{agent.name}
								</SelectItem>
							)}
						</>
					))}
			</>
		)
	}
)

Agents.displayName = "Agents"

export default Agents
