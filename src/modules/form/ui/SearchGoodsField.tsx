import { Input } from "@/components/ui/Input"
import { debounce } from "@/shared/utils/debounce."
import React from "react"
import type { InputField } from "../types"

const SearchGoodsField = ({
	loadGoodsOnSearch,
	field,
  id
}: {
	loadGoodsOnSearch: (val: string) => void
	field: InputField,
  id: string 
}) => {
	const debounceGoodsSearch = debounce(
		(value: string) => loadGoodsOnSearch(value),
		500
	)
	return (
		<Input
			onChange={e => debounceGoodsSearch(e.target.value)}
			type={field.type}
			id={`${field.label}_${id}`}
		/>
	)
}

export default SearchGoodsField
