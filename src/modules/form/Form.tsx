import { Button } from "@/components/ui/Button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { useCallback, useId, useState } from "react"
import { inputsFields } from "./const/inputsFields"
import { useOrderForm } from "./models/useOrderForm"
import type { Good, InputField } from "./types"
import AddedGoods from "./ui/AddedGoods"
import Agents from "./ui/Agents"
import GoodItem from "./ui/GoodItem"
import Organizations from "./ui/Organizations"
import Payboxes from "./ui/Payboxes"
import PriceType from "./ui/PriceType"
import SearchGoodsField from "./ui/SearchGoodsField"
import TokenField from "./ui/TokenField"
import Warehouses from "./ui/Warehouses"

const Form = () => {
	const {
		handleContinue,
		handleTokenField,
		error,
		show,
		isLoading,
		tokenInput,
		loadGoodsOnSearch,
		goods,
		isLoadingGoods,
		orderForm,
		searchQuery,
		changeSearchQuery,
		agents,
		isLoadingAgents,
		onKeyDownSelect,
		isOpen,
	} = useOrderForm()
	const { organizations, payboxes, typePrice, warehouses } = orderForm
	const id = useId()
	const [addedGoods, setAddedGoods] = useState<(Good & { counter?: number })[]>(
		[]
	)
	const [selectedAgent, setSelectedAgent] = useState("")

	const incrementCounterGood = (id: number) => {
		setAddedGoods(prev =>
			prev.map(good =>
				good.id === id ? { ...good, counter: (good.counter ?? 0) + 1 } : good
			)
		)
	}
	const decrementCounterGood = (id: number) => {
		setAddedGoods(prev =>
			prev.map(good =>
				good.id === id ? { ...good, counter: (good.counter ?? 1) - 1 } : good
			)
		)
	}
	const handleAddGood = useCallback(
		(good: Good & { counter?: number }) => {
			const isExist = addedGoods.find(g => g.id === good.id)
			const newGood: Good & { counter?: number } = {
				...good,
				counter: (good.counter ?? 0) + 1,
			}
			if (isExist) {
				incrementCounterGood(good.id)
			}
			if (!isExist) {
				setAddedGoods(prev => [...prev, newGood])
			}
		},
		[addedGoods]
	)
	const getDisplayValue = (field: InputField) => {
		if (!selectedAgent) {
			return searchQuery && field.name === "agent" ? searchQuery : field.label
		}
		if (selectedAgent && field.name === "agent") {
			return selectedAgent.split("_")[0]
		}
		if (field.name !== "agent") {
			return field.label
		}
	}

	return (
		<div className='flex items-center justify-center mt-10'>
			<form
				onSubmit={e => {
					e.preventDefault()
					handleContinue()
				}}
				className='w-105 border border-input p-10 rounded-2xl flex flex-col gap-4'
			>
				<TokenField
					tokenInput={tokenInput}
					handleTokenField={handleTokenField}
					isLoading={isLoading}
				/>
				{!!error && <p className='text-destructive'>{error}</p>}
				{show && (
					<>
						{inputsFields.map(field => (
							<div key={field.id} className='flex flex-col gap-4 relative'>
								<label htmlFor={`${field.label}_${id}`}>{field.label}</label>
								{field.name === "agent" && (
									<span className='absolute bottom-2 left-3 text-[14px]'>
										{searchQuery && !isOpen
											? searchQuery
											: selectedAgent.split("_")[0]}
									</span>
								)}
								{field.type === "select" && (
									<Select
									
										onOpenChange={open => changeSearchQuery(open)}
										name={`${field.label}_${id}`}
										onValueChange={val => {
											if (field.name === "agent") setSelectedAgent(val)
											else return
										}}
									>
										<SelectTrigger
											id={`${field.label}_${id}`}
											className='max-w-84.5 w-full'
										>
											<SelectValue placeholder={getDisplayValue(field)} />
										</SelectTrigger>
										<SelectContent
											className='max-w-[338px] min-h-8'
											onKeyDown={e => onKeyDownSelect(e)}
										>
											<SelectGroup>
												<Agents
													isLoadingAgents={isLoadingAgents}
													field={field}
													agents={agents}
												/>
												<Payboxes field={field} payboxes={payboxes} />
												<Warehouses field={field} warehouses={warehouses} />
												<Organizations
													field={field}
													organizations={organizations}
												/>
												<PriceType field={field} typePrice={typePrice} />
											</SelectGroup>
										</SelectContent>
									</Select>
								)}
								{(field.type === "text" || field.type === "search") && (
									<SearchGoodsField
										id={id}
										field={field}
										loadGoodsOnSearch={loadGoodsOnSearch}
									/>
								)}
							</div>
						))}
						{(goods.length > 0 || isLoadingGoods) && (
							<ScrollArea>
								<div className='max-h-[300px] flex flex-col  gap-4 relative'>
									{isLoadingGoods && (
										<div className='absolute left-3/6 top-4'>
											<Spinner />
										</div>
									)}
									{typeof goods !== "string" &&
										goods.map(good => (
											<GoodItem
												key={good.id}
												good={good}
												handleAddGood={handleAddGood}
											/>
										))}
								</div>
							</ScrollArea>
						)}
						<div className='h-px w-full border border-input'></div>
						<AddedGoods
							addedGoods={addedGoods}
							decrementCounterGood={decrementCounterGood}
							incrementCounterGood={incrementCounterGood}
						/>
						<div>
							<div className='flex justify-between '>
								<p>Итого товаров</p>
								<span>0</span>
							</div>
							<div className='flex justify-between mt-2'>
								<p>Сумма:</p>
								<span>0 ₽</span>
							</div>
						</div>
						<Button>Создать продажу</Button>
						<Button variant='secondary'>Создать и провести</Button>
					</>
				)}
			</form>
		</div>
	)
}

export default Form
