import { api } from "./axios-instance"
import { JWT_KEY } from "@/modules/auth/domain/auth.actions"

const i = 0



export const setupAxios = () => {
	api.interceptors.request.use(
		(config) => {
			const authToken: string | null = localStorage.getItem(JWT_KEY)

			if (authToken) {
				config.headers.common.Authorization = `Bearer ${authToken}`
			}

			return config
		},
		(error) => {
			Promise.reject(error)
		}
	)

	api.interceptors.response.use(
		(response) => {
			return response
		},
		async function (err) {
			// const originalConfig = err.config
			// if (
			// 	[401, 403].includes(err.response.status) &&
			// 	!originalConfig?._retry
			// ) {
			// 	originalConfig._retry = true
			// 	try {
			// 		return api(originalConfig)
			// 	} catch (_error) {
			// 		return Promise.reject(_error)
			// 	}
			// }
			return Promise.reject(err)
		}
	)
}
