import { Button } from "@/components/ui/Button"
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemTitle,
} from "@/components/ui/Item"
import type { Good } from "../types"
import { memo } from "react"

const GoodItem = memo(
	({
		good,
		handleAddGood,
	}: {
		good: Good
		handleAddGood: (val: Good) => void
	}) => {
		return (
			<Item key={good.id} variant='muted'>
				<ItemContent>
					<ItemTitle>{good.name}</ItemTitle>
					<ItemDescription>
						{good.description_short
							? good.description_short
							: good.description_long
							? good.description_long
							: "Нет описания"}
					</ItemDescription>
				</ItemContent>
				<ItemActions>
					<Button onClick={() => handleAddGood(good)}>Добавить</Button>
				</ItemActions>
			</Item>
		)
	}
)

GoodItem.displayName = "GoodItem"

export default GoodItem
