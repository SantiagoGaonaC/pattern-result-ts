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
export declare class Result<T> {
    readonly value: T;
    readonly isSuccess: boolean;
    readonly error: string;
    readonly statusCode: number;
    /**
     * Private constructor for the Result class.
     */
    private constructor();
    /**
     * Creates a success Result.
     * By default, the statusCode is 200 unless otherwise specified.
     * @param value The value of the Result.
     * @param statusCode The status code of the Result. Defaults to 200.
     * @returns A Result object indicating success.
     */
    static success<T>(value: T, statusCode?: number): Result<T>;
    /**
     * Creates a failure Result.
     * By default, the statusCode is 400 unless otherwise specified.
     * @param error The error message.
     * @param statusCode The status code of the Result. Defaults to 400.
     * @returns A Result object indicating failure.
     */
    static failure<T>(error: string, statusCode?: number): Result<T>;
    /**
     * Converts the Result to an object.
     * This is primarily used for server actions NEXTJS that need to return an object with the status,
     * not just the status itself.
     * @returns An object representation of the Result.
     */
    toObject(): ResultObject<T>;
    /**
     * Creates a Result from an object.
     * @param obj The object to convert to a Result.
     * @returns A Result object.
     */
    static fromObject<T>(obj: ResultObject<T>): Result<T>;
}
