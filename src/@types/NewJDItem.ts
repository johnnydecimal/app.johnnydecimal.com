import JDArea from "./JDArea";
import JDCategory from "./JDCategory";
import JDID from "./JDID";

/**
 * # NewJDItem (type)
 *
 * This is the type definition for a *new* JD item, that is one that we are
 * attempting to add to the database.
 *
 * It differs from `JDItem` in that we don't make the user tell us whether
 * it's an AC.ID: we figure that out from the shape of the input.
 */
interface NewJDItem {
	jdNumber: JDArea | JDCategory | JDID;
	jdTitle: string; // TODO: This is optional on JDItem, why?
	comment?: string; // Any inline comments like this one
	metadata?: string; // TODO: Figure out how this is stored.
	createdTime?: string; // This will be a Date() string.
	lastUpdatedTime?: string; // This will be a Date() string.
}

export default NewJDItem;
