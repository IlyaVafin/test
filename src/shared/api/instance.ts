class Api {
	private BASE_URL
	constructor() {
		this.BASE_URL = "https://app.tablecrm.com/api/v1"
	}
	async get<T>(url: string): Promise<T | string> {
		try {
			const response = await fetch(`${this.BASE_URL}${url}`)
			if (!response.ok) throw new Error()
			return await response.json()
		} catch (error: unknown) {
			if (error instanceof Error) {
				return error.message
			}
			return "Unknown error :("
		}
	}
	async post() {}
}

export const api = new Api()
