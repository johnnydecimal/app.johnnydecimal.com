// === External ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import { Machine, assign } from "xstate";
import userbase, { UserResult } from "userbase-js";
import { navigate } from "@reach/router";

// === Types    ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import { User } from "../../@types/User";

export interface SignInContext {
	error: any | undefined;
	formData: any | undefined;
	user: UserResult | undefined;
}

export interface SignInSchema {
	states: {
		init: {};
		notSignedIn: {};
		tryingSignIn: {};
		tryingSignUp: {};
		signedIn: {};
		updatingEmail: {};
		tryingSignOut: {};
		error: {};
	};
}

// This isn't used in this file but elsewhere where we're testing which state
// the machine is in.
export type TSignInStates =
	| "init"
	| "notSignedIn"
	| "tryingSignIn"
	| "tryingSignUp"
	| "signedIn"
	| "updatingEmail"
	| "tryingSignOut"
	| "error";

// prettier-ignore
export type SignInEvent =
	| { type: "TRY_SIGNIN", formData: any }
	| { type: "TRY_SIGNUP", formData: any }
	| { type: "SIGNED_IN", formData?: any }
	| { type: "NOT_SIGNED_IN", formData?: any }
	| { type: "UPDATE_EMAIL", formData: any }
	| { type: "TRY_SIGNOUT", formData?: any };

// === Main ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
const signInStateMachine = Machine<SignInContext, SignInSchema, SignInEvent>({
	strict: true,
	id: "signInState",
	initial: "init",

	context: {
		error: undefined,
		formData: undefined,
		user: undefined,
	},

	states: {
		init: {
			invoke: {
				id: "userbaseInit",
				src: (_context, _event) =>
					userbase.init({
						appId: "37c7462e-f79c-4ef3-bdb0-55968a34d572",
					}),
				onDone: [
					{
						target: "signedIn",
						cond: (_context, event) => Boolean(event.data.user),
						actions: [
							assign({
								// This needs the `| any` on the end of the Context:user type.
								user: (_context, event) => event.data.user,
							}),
							(_context, event) =>
								console.debug("🌹 invoke: onDone: event:", event),
						],
					},
					{
						target: "notSignedIn",
						actions: assign({
							error: (_context, event) => event.data,
						}),
					},
				],
				onError: {
					target: "error",
					actions: assign({
						error: (_context, event) => event.data,
					}),
				},
			},
		},
		notSignedIn: {
			on: {
				TRY_SIGNIN: "tryingSignIn",
				TRY_SIGNUP: "tryingSignUp",
			},
		},
		tryingSignIn: {
			invoke: {
				id: "userbaseInit",
				src: (_context, event) =>
					userbase.signIn({
						username: event.formData.username,
						password: event.formData.password,
						rememberMe: "local",
					}),
				onDone: [
					{
						target: "signedIn",
						cond: (_context, event) => Boolean(event.data.userId),
						actions: [
							(_context, event) =>
								console.debug("tryingSignIn/onDone/event:", event),
							assign({
								user: (_context, event) => event.data,
								error: (_context, _event) => undefined,
							}),
						],
					},
					{
						/* We should never reach this onDone-but-no-user-in-the-event 
						 condition. If the login fails, the promise rejects and we
						 transition to `onError`. If the login succeeds, the `cond:` will
						 always be met, and we'll always transition as above. *But*, just
						 in case, I'm going to leave this here and send it to `error`.
						 If we've ended up here, something truly weird is happening and it
						 needs your attention.
						
						 TODO: put some error code in this event so you can show the user
						       and do something about it. */
						target: "error",
					},
				],
				onError: {
					/* Whereas this error is the normal .signIn()-promise-rejected error;
						 probably the login just failed. */
					target: "notSignedIn",
					actions: assign({
						error: (_context, event) => event.data,
					}),
				},
			},
		},
		signedIn: {
			on: {
				TRY_SIGNOUT: "tryingSignOut",
				UPDATE_EMAIL: "updatingEmail",
			},
		},
		updatingEmail: {
			invoke: {
				id: "updatingEmail",
				src: (_context, event) =>
					userbase
						.updateUser({
							email: event.formData.email,
						})
						.then(() => event),
				onDone: [
					{
						target: "signedIn",
						// cond: (_context, event) => Boolean(event.data.user),
						actions: [
							(_context, event) =>
								console.debug("📧 updatingEmail, event:", event),
							assign({
								user: (context, event) => {
									if (context.user) {
										return {
											...context.user,
											email: event.data.formData.email,
										};
									}
								},
							}),
						],
					},
					// {
					// 	target: "notSignedIn",
					// 	actions: assign({
					// 		error: (_context, event) => event.data,
					// 	}),
					// },
				],
				onError: {
					target: "error",
					actions: assign({
						error: (_context, event) => event.data,
					}),
				},
			},
		},
		tryingSignUp: {
			invoke: {
				id: "userbaseSignUp",
				src: (_context, event) =>
					userbase.signUp({
						username: event.formData.username,
						password: event.formData.password,
						rememberMe: "local",
					}),
				onDone: {
					target: "signedIn",
					actions: [
						assign({ user: (_context, event) => event.data }),
						// TODO: don't think this clearing-of-error is actually working.
						assign({ error: (_context, _event) => undefined }),
						() => navigate("/"),
					],
				},
				onError: {
					target: "notSignedIn",
					actions: assign({
						error: (_context, event) => event.data,
					}),
				},
			},
		},
		tryingSignOut: {
			invoke: {
				id: "tryingSignOut",
				src: () => userbase.signOut(),
				onDone: {
					target: "notSignedIn",
					actions: [
						assign({
							user: (_context, _event) => undefined,
							error: (_context, _event) => undefined,
						}),
						() => navigate("/"),
					],
				},
				onError: {
					target: "notSignedIn",
					actions: [
						assign({
							user: (_context, _event) => undefined,
							error: (_context, event) => event.data,
						}),
						() => navigate("/"),
					],
				},
			},
		},
		error: {
			type: "final",
		},
	},
});

export default signInStateMachine;
