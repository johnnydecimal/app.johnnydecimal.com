/**
 * # User
 *
 * A Userbase user object.
 */
export interface User {
	username: string;
	userId: string;
	authToken: string;
	creationDate: string;
	paymentsMode: string;
	email?: string;
	profile?: object;
	protectedProfile?: object;
	subscriptionStatus?: string;
	trialExpirationDate?: string;
	cancelSubscriptionAt?: string;
}
