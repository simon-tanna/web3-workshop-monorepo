import {
  prepareEvent,
  prepareContractCall,
  readContract,
  type BaseTransactionOptions,
  type AbiParameterToPrimitiveType,
} from "thirdweb";

/**
 * Contract read functions
 */

/**
 * Represents the parameters for the "nameToFavoriteNumber" function.
 */
export type NameToFavoriteNumberParams = {
  arg_0: AbiParameterToPrimitiveType<{
    internalType: "string";
    name: "";
    type: "string";
  }>;
};

/**
 * Calls the "nameToFavoriteNumber" function on the contract.
 * @param options - The options for the nameToFavoriteNumber function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { nameToFavoriteNumber } from "TODO";
 *
 * const result = await nameToFavoriteNumber({
 *  arg_0: ...,
 * });
 *
 * ```
 */
export async function nameToFavoriteNumber(
  options: BaseTransactionOptions<NameToFavoriteNumberParams>
) {
  return readContract({
    contract: options.contract,
    method: [
      "0x8bab8dd5",
      [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
    ],
    params: [options.arg_0],
  });
}

/**
 * Represents the parameters for the "people" function.
 */
export type PeopleParams = {
  arg_0: AbiParameterToPrimitiveType<{
    internalType: "uint256";
    name: "";
    type: "uint256";
  }>;
};

/**
 * Calls the "people" function on the contract.
 * @param options - The options for the people function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { people } from "TODO";
 *
 * const result = await people({
 *  arg_0: ...,
 * });
 *
 * ```
 */
export async function people(options: BaseTransactionOptions<PeopleParams>) {
  return readContract({
    contract: options.contract,
    method: [
      "0x9e7a13ad",
      [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      [
        {
          internalType: "uint256",
          name: "favoriteNumber",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "name",
          type: "string",
        },
      ],
    ],
    params: [options.arg_0],
  });
}

/**
 * Calls the "retrieve" function on the contract.
 * @param options - The options for the retrieve function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { retrieve } from "TODO";
 *
 * const result = await retrieve();
 *
 * ```
 */
export async function retrieve(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      "0x2e64cec1",
      [],
      [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
    ],
    params: [],
  });
}

/**
 * Represents the parameters for the "retrievePeopleByName" function.
 */
export type RetrievePeopleByNameParams = {
  name: AbiParameterToPrimitiveType<{
    internalType: "string";
    name: "_name";
    type: "string";
  }>;
};

/**
 * Calls the "retrievePeopleByName" function on the contract.
 * @param options - The options for the retrievePeopleByName function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { retrievePeopleByName } from "TODO";
 *
 * const result = await retrievePeopleByName({
 *  name: ...,
 * });
 *
 * ```
 */
export async function retrievePeopleByName(
  options: BaseTransactionOptions<RetrievePeopleByNameParams>
) {
  return readContract({
    contract: options.contract,
    method: [
      "0x354fbf59",
      [
        {
          internalType: "string",
          name: "_name",
          type: "string",
        },
      ],
      [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
    ],
    params: [options.name],
  });
}

/**
 * Contract write functions
 */

/**
 * Represents the parameters for the "addPerson" function.
 */
export type AddPersonParams = {
  name: AbiParameterToPrimitiveType<{
    internalType: "string";
    name: "_name";
    type: "string";
  }>;
  favoriteNumber: AbiParameterToPrimitiveType<{
    internalType: "uint256";
    name: "_favoriteNumber";
    type: "uint256";
  }>;
};

/**
 * Calls the "addPerson" function on the contract.
 * @param options - The options for the "addPerson" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { addPerson } from "TODO";
 *
 * const transaction = addPerson({
 *  name: ...,
 *  favoriteNumber: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function addPerson(options: BaseTransactionOptions<AddPersonParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      "0x6f760f41",
      [
        {
          internalType: "string",
          name: "_name",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "_favoriteNumber",
          type: "uint256",
        },
      ],
      [],
    ],
    params: [options.name, options.favoriteNumber],
  });
}

/**
 * Represents the parameters for the "store" function.
 */
export type StoreParams = {
  favoriteNumber: AbiParameterToPrimitiveType<{
    internalType: "uint256";
    name: "_favoriteNumber";
    type: "uint256";
  }>;
};

/**
 * Calls the "store" function on the contract.
 * @param options - The options for the "store" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { store } from "TODO";
 *
 * const transaction = store({
 *  favoriteNumber: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function store(options: BaseTransactionOptions<StoreParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      "0x6057361d",
      [
        {
          internalType: "uint256",
          name: "_favoriteNumber",
          type: "uint256",
        },
      ],
      [],
    ],
    params: [options.favoriteNumber],
  });
}
