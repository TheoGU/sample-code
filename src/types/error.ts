export type Error = string | { [key: string]: string } | null

export class ApiError {
	code: string
	message: string
	propertyPath: string
	errors: { [key: string]: string[] }
}
