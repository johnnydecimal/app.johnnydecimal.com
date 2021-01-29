/**
 * # :JDAPICall
 *
 * Every JD API call (insert, delete, whatever) should return an object which
 * looks like this.
 *
 * - `success` being a Boolean allows for simple checking of (result.success).
 * - `error` being just that, if required.
 */
interface JDAPICall {
	success: Boolean;
	error?: string;
}

export default JDAPICall;
