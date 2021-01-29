// === Types    ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import { UserbaseData, UserbaseItem } from "./Userbase";

/**
 * JDProject is the type for any JD Project.
 *
 * In the current implementation, any one project may be in memory at one time.
 * This object is the thing we use internally to render our views.
 *
 * It may be a valid project, in which case `status === valid`. It may be an
 * invalid project, in which case `status === error` and the error is indicated
 * in the object on the `error` property and the `errorLine`.
 *
 * TODO: Is this concept of the errorLine going to disappear? It assumed we
 *       were processing a string of data, but we're switching that model now.
 *       Leave it for now but assume it will change. If the machine bombs at an
 *       error it's going to be pretty obvious where that error occurred.
 *
 * For a valid project, the property `jdProjectData` contains an array which,
 * when rendered in order, represents the entire JD Project. This can include
 * dividers and blank lines as required.
 */
interface JDProject {
	status: "tbc" | "valid" | "error"; // "tbc" when we initiate the machine.
	data: UserbaseData; // Required, but can of course be empty.
	error?: string;
	errorLine?: Number;
	errorItem?: UserbaseItem;
}

export default JDProject;
