import { SelectItem } from "@/components/ui/select"
import { memo } from "react"
import type { Agent, InputField } from "../types"
import { Spinner } from "@/components/ui/spinner"

const Agents = memo(
	({
		field,
		agents,
		isLoadingAgents,
	}: {
		field: InputField
		agents: Agent[] | string
		isLoadingAgents: boolean,
	}) => {
		if (isLoadingAgents)
			return (
				<div className='relative'>
					<Spinner className='absolute left-3/6 z-10' />
				</div>
			)
		if (agents.length === 0)
			return <p className='text-center'>Агент не найден</p>
		return (
			<>
				{field.name === "agent" &&
					typeof agents !== "string" &&
					agents.map(agent => (
						<>
							{agent.name?.length > 0 && (
								<SelectItem
									key={agent.id}
									value={`${agent.name}_${agent.id}`}
								>
									{agent.name} (
									{agent.phone.length > 0 ? agent.phone : "Нет номера"})
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
