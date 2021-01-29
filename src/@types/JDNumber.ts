import JDArea from "./JDArea";
import JDCategory from "./JDCategory";
import JDID from "./JDID";

/**
 * JDNumber describes *any* of the valid JD numbers. Be careful.
 */
type JDNumber = JDArea | JDCategory | JDID;

export default JDNumber;
