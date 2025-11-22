import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { useId } from "react"
import { inputsFields } from "./const/inputsFields"
import { useHandleContinue } from "./models/useHandleContinue"
import Agents from "./ui/Agents"
import Organizations from "./ui/Organizations"
import Payboxes from "./ui/Payboxes"
import PriceType from "./ui/PriceType"
import TokenField from "./ui/TokenField"
import Warehouses from "./ui/Warehouses"

const Form = () => {
	const {
		orderForm,
		handleContinue,
		handleTokenField,
		error,
		show,
		isLoading,
		tokenInput,
		loadGoodsOnFocus,
		goods,
		searchQuery,
		changeSearchQuery,
		filtered,
		onKeyDownSelect,
	} = useHandleContinue()
	const { agents, organizations, payboxes, typePrice, warehouses } = orderForm
	const id = useId()

	return (
		<div className='flex items-center justify-center mt-10'>
			<form onSubmit={e => {
				e.preventDefault()
				handleContinue()
			}} className='w-105 border border-input p-10 rounded-2xl flex flex-col gap-4'>
				<TokenField
					tokenInput={tokenInput}
					handleTokenField={handleTokenField}
					isLoading={isLoading}
				/>
				{!!error && <p className='text-destructive'>{error}</p>}
				{show && (
					<>
						{inputsFields.map(field => (
							<div key={field.id} className='flex flex-col gap-4'>
								<label htmlFor={`${field.label}_${id}`}>{field.label}</label>
								{field.type === "select" && (
									<Select
										onOpenChange={open => changeSearchQuery(open)}
										name={`${field.label}_${id}`}
									>
										<SelectTrigger
											id={`${field.label}_${id}`}
											className='max-w-84.5 w-full'
										>
											<SelectValue
												placeholder={
													searchQuery && field.name === "agent"
														? searchQuery
														: field.label
												}
											/>
										</SelectTrigger>
										<SelectContent onKeyDown={e => onKeyDownSelect(e)}>
											<SelectGroup>
												<Agents
													field={field}
													agents={{
														count: agents?.count ?? 0,
														result: filtered ?? [],
													}}
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
									<Input
										onFocus={loadGoodsOnFocus}
										type={field.type}
										id={`${field.label}_${id}`}
									/>
								)}
							</div>
						))}
						<div className='h-px w-full border border-input'></div>
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
