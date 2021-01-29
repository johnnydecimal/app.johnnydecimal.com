import JDItem from "./JDItem";

/**
 * Each `UserbaseItem` is an object with a `JDItem` on the `item` property and
 * a Userbase-generated GUID on the `itemId` property.
 */
interface UserbaseItem {
	item: JDItem;
	itemId: string;
}

/**
 * The `UserbaseData` array is an array of `UserbaseItem`s as returned by
 * `userbase.openDatabase()`.
 *
 * When we sort this data and it becomes a `:JDProject`, we keep this structure
 * for simplicity.
 */
type UserbaseData = UserbaseItem[];

export type { UserbaseItem, UserbaseData };
