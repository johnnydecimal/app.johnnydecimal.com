/**
 * JDLineObject is the type returned by jdLineParser.
 *
 * **DEPRICATED** -- use JDItem
 */
interface JDLineObject {
	jdType:
		| "project"
		| "area"
		| "category"
		| "id"
		| "divider"
		| "comment"
		| "emptyline"
		| "error";
	jdNumber?: string;
	jdTitle?: string;
	comment?: string; // Any inline comments like this one
	error?: "Nothing matched." | "Multi-line input not allowed.";
}

export default JDLineObject;
