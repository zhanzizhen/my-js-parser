// acorn.d.ts
import { Options } from "acorn";
import * as ESTree from "estree";

declare module "acorn" {
  type ExtendNode<T> = {
    [K in keyof T]: T[K] extends object ? ExtendNode<T[K]> : T[K];
  } & (T extends ESTree.Node
    ? {
        start: number;
        end: number;
      }
    : unknown);

  type Node2 = ExtendNode<ESTree.Node>;

  export function parse(s: string, o: Options): ExtendNode<ESTree.Program>;
}
