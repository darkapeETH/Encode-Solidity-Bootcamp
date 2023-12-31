/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../common";
import type { TokenSale, TokenSaleInterface } from "../../contracts/TokenSale";

const _abi = [
  {
    inputs: [],
    name: "ratio",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5060b38061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c806371ca337d14602d575b600080fd5b60336047565b604051603e91906064565b60405180910390f35b60005481565b6000819050919050565b605e81604d565b82525050565b6000602082019050607760008301846057565b9291505056fea2646970667358221220daddc5b3a2ee78be027c0db44ad0d20637a5bd7a580bdae79362d8dd2362a86764736f6c63430008130033";

type TokenSaleConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TokenSaleConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TokenSale__factory extends ContractFactory {
  constructor(...args: TokenSaleConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      TokenSale & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): TokenSale__factory {
    return super.connect(runner) as TokenSale__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TokenSaleInterface {
    return new Interface(_abi) as TokenSaleInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): TokenSale {
    return new Contract(address, _abi, runner) as unknown as TokenSale;
  }
}
