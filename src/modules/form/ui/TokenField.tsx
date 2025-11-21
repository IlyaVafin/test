import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { memo, type ChangeEvent } from "react"

const TokenField = memo(
	({
		tokenInput,
		handleContinue,
		handleTokenField,
		isLoading,
	}: {
		tokenInput: string
		handleTokenField: (e: ChangeEvent<HTMLInputElement>) => void
		handleContinue: () => Promise<void>
		isLoading: boolean
	}) => {
		return (
			<div className='max-w-[420px] w-full flex flex-col gap-4'>
				<label htmlFor=''>Токен</label>
				<Input value={tokenInput} onChange={handleTokenField} />
				<Button
					disabled={isLoading}
					type='button'
					onClick={handleContinue}
					className='w-full'
				>
					Продолжить
				</Button>
			</div>
		)
	}
)

export default TokenField
