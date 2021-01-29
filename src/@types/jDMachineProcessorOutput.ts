import JDLineObject from "./JDLineObject";

/**
 * JDMachineProcessorOutput is the type returned by jdMachineProcessor.
 */
interface JDMachineProcessorOutput {
	status: "success" | "error";
	jdArray?: Array<JDLineObject>;
	error?: string;
	errorLine?: Number;
}

export default JDMachineProcessorOutput;
