import JDArea from "./JDArea";
import JDCategory from "./JDCategory";
import JDID from "./JDID";

/**
 * Each distinct JD Item -- a Project, Area, Category, etc. -- follows the same
 * basic structure.
 *
 * - `jdType` describes which of these it is.
 * - `jdNumber` contains its number.
 * - `jdTitle` contains its title.
 * - `comment` contains any inline comments // like this.
 * - `metadata` contains any user-defined metadata, which follows the item
 *   (this has yet to be defined).
 *
 * This is the object that we send to Userbase. It assigns it to the `item`
 * property on each of its objects; this whole thing becomes a `:UserbaseItem`.
 *
 * TODO: `error` might need to be looked at in the contect of the new machine.
 */
interface JDItem {
	jdType: //  "project"
	"area" | "category" | "id";
	// | "divider"
	// | "comment"
	// | "emptyline"
	// | "error"; // TODO: Should this really be a JDItem type?
	jdNumber: JDArea | JDCategory | JDID;
	jdTitle: string;
	comment?: string; // Any inline comments like this one
	metadata?: string; // TODO: Figure out how this is stored.
	createdTime?: string; // This will be a Date() string.
	lastUpdatedTime?: string; // This will be a Date() string.
	error?: "Nothing matched." | "Multi-line input not allowed.";
}

export default JDItem;
