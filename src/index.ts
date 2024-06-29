/**
 * Interface for the object representation of a Result.
 */
export interface ResultObject<T> {
	isSuccess: boolean;
	value: T;
	error: string;
	statusCode: number;
}

/**
 * The Result class is a utility for handling success and failure scenarios.
 * It uses generics to allow for flexibility in the type of value it can hold.
 * This class is primarily used for server actions that need to return an object with the status,
 * not just the status itself.
 */
export class Result<T> {
	public readonly value: T;

	public readonly isSuccess: boolean;

	public readonly error: string;

	public readonly statusCode: number;

	/**
	 * Private constructor for the Result class.
	 */
	private constructor(value: T, isSuccess: boolean, error: string, statusCode: number) {
		this.value = value;
		this.isSuccess = isSuccess;
		this.error = error;
		this.statusCode = statusCode;
	}

	/**
	 * Creates a success Result.
	 * By default, the statusCode is 200 unless otherwise specified.
	 * @param value The value of the Result.
	 * @param statusCode The status code of the Result. Defaults to 200.
	 * @returns A Result object indicating success.
	 */
	public static success<T>(value: T, statusCode: number = 200): Result<T> {
		return new Result<T>(value, true, "", statusCode);
	}

	/**
	 * Creates a failure Result.
	 * By default, the statusCode is 400 unless otherwise specified.
	 * @param error The error message.
	 * @param statusCode The status code of the Result. Defaults to 400.
	 * @returns A Result object indicating failure.
	 */
	public static failure<T>(error: string, statusCode: number = 400): Result<T> {
		return new Result<T>(undefined as unknown as T, false, error, statusCode);
	}

	/**
	 * Converts the Result to an object.
	 * This is primarily used for server actions NEXTJS that need to return an object with the status,
	 * not just the status itself.
	 * @returns An object representation of the Result.
	 */
	public toObject(): ResultObject<T> {
		return {
			isSuccess: this.isSuccess,
			value: this.value,
			error: this.error,
			statusCode: this.statusCode,
		};
	}

	/**
	 * Creates a Result from an object.
	 * @param obj The object to convert to a Result.
	 * @returns A Result object.
	 */
	public static fromObject<T>(obj: ResultObject<T>): Result<T> {
		return new Result<T>(obj.value, obj.isSuccess, obj.error, obj.statusCode);
	}
}