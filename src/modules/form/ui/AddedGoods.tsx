import { Button } from "@/components/ui/Button"
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemTitle,
} from "@/components/ui/Item"
import type { Good } from "../types"

const AddedGoods = ({
	addedGoods,
  decrementCounterGood,
  incrementCounterGood
}: {
	addedGoods: (Good & { counter?: number })[],
  decrementCounterGood: (val: number) => void 
    incrementCounterGood: (val: number) => void
}) => {
	return (
		<>
			{addedGoods.map(good => (
				<Item>
					<ItemContent>
						<ItemTitle>{good.name}</ItemTitle>
						<ItemDescription>
							{" "}
							{good.description_short
								? good.description_short
								: good.description_long
								? good.description_long
								: "Нет описания"}
						</ItemDescription>
					</ItemContent>
					<ItemActions>
						<Button
							onClick={() => {
								if (good.counter === 1) return
								decrementCounterGood(good.id)
							}}
							variant={"outline"}
						>
							-
						</Button>
						<span>{good.counter}</span>
						<Button onClick={() => incrementCounterGood(good.id)}>+</Button>
					</ItemActions>
				</Item>
			))}
		</>
	)
}

export default AddedGoods
