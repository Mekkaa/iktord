import { ComponentType, ElementType, FC, HTMLElementType } from "react";
import { randomUUID } from "crypto";
import { blockDefinitions } from "../blocks";
import { toPascalCase } from "@/src/utils/toPascalCase";

export type DynamicZoneTestProps<T extends {}> = {
  blocks: (T & Record<string, any>)[];
  elementType?: HTMLElementType;
};

type DynamicZoneTestInternalProps = DynamicZoneTestProps<{}> & {
  blockKeyName?: string;
};

type ComponentData = Record<string, unknown> & {
  __typename: string;
  _key?: string;
};

function extractComponentFromChoice(data: ComponentData): {
  __typename: string;
  props: any;
} | null {
  for (const [key, value] of Object.entries(data)) {
    if (key !== "__typename" && key !== "_key" && value !== null) {
      return { __typename: toPascalCase(key), props: value };
    }
  }
  return null;
}

const DynamicZone: FC<DynamicZoneTestInternalProps> = ({
  blockKeyName = "__typename",

  blocks = [],
  elementType = "section",
}) => {
  const blockMapping = blockDefinitions as Record<string, any>;

  return (
    <>
      {blocks.map((props) => {
        const { __typename, ...blockProps } = props || {};

        const ImportedModule = blockMapping[__typename];

        if (!ImportedModule) {
          console.log(
            `DynamicZoneTest: Block with name "${__typename}" not found.`
          );

          return null;
        }
        console.log("blockProps", blockProps);

        return (
          <ImportedModule
            key={randomUUID()}
            blockName={__typename}
            {...blockProps}
          />
        );
      })}
    </>
  );
};

export default DynamicZone;
