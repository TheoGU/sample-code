export const isLoadingToGetLoggedInUser = ({ user }): boolean =>
	!!user.requestingFetchMyUser
