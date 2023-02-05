import type { User } from "@/types/user"
// import type { UserDTO } from "@/modules/user/domain/user.dto"
// import type { UserRO } from "@/modules/user/domain/user.ro"

export interface UserOutput {
	fetchMyUser(): Promise<User>
}
