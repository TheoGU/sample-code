import { api } from "@/config/axios-instance"
import type { UserOutput } from "@/modules/user/domain/user.output"
import type { User } from "@/types/user"
// import { UserDTO } from "@/modules/user/domain/user.dto"
// import { UserRO } from "@/modules/user/domain/user.ro"

export class UserApi implements UserOutput {
	fetchMyUser(): Promise<User> {
		return api
			.get("/me")
			.then(({ data }) => {
				return data.data
			})
			.catch((error) => {
				throw error.response.data
			})
	}
}
