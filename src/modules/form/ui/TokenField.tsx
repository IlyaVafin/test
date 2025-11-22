import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { memo, type ChangeEvent } from "react"

const TokenField = memo(
	({
		tokenInput,
		handleTokenField,
		isLoading,
	}: {
		tokenInput: string
		handleTokenField: (e: ChangeEvent<HTMLInputElement>) => void
		isLoading: boolean
	}) => {
		return (
			<div className='max-w-[420px] w-full flex flex-col gap-4'>
				<label htmlFor='token_input'>Токен</label>
				<Input value={tokenInput} id="token_input" onChange={handleTokenField} />
				<Button
					disabled={isLoading}
					type='submit'
					className='w-full'
				>
					Продолжить
				</Button>
			</div>
		)
	}
)

export default TokenField
