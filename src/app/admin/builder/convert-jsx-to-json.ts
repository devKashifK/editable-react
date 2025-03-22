// convertJsxToJson.js
import { Node } from "@/components/InPlacePageRenderer";

const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;

interface JSXNode {
  type: string;
  openingElement?: {
    name: {
      type: string;
      name?: string;
      property?: { name: string };
      object?: any;
    };
    attributes: Array<{
      type: string;
      name?: { name: string };
      value?: any;
      argument?: any;
    }>;
  };
  children?: any[];
  value?: string;
  expression?: any;
}

function jsxToJson(node: JSXNode): Node | null {
  if (!node) return null;
  switch (node.type) {
    case "JSXElement": {
      let elementType = null;
      if (node.openingElement?.name.type === "JSXIdentifier") {
        elementType = node.openingElement.name.name || 'div';
      } else if (node.openingElement?.name.type === "JSXMemberExpression") {
        const parts: string[] = [];
        let curr = node.openingElement.name;
        while (curr) {
          if (curr.property) parts.unshift(curr.property.name);
          if (curr.object && curr.object.type === "JSXIdentifier") {
            parts.unshift(curr.object.name);
            break;
          } else if (curr.object && curr.object.type === "JSXMemberExpression") {
            curr = curr.object;
          } else {
            break;
          }
        }
        elementType = parts.join(".") || 'div';
      }

      const props: Record<string, any> = {};
      node.openingElement?.attributes.forEach((attr) => {
        if (attr.type === "JSXAttribute" && attr.name) {
          const propName = attr.name.name;
          let value: any = null;
          if (attr.value === null) {
            value = true;
          } else if (attr.value.type === "StringLiteral") {
            value = attr.value.value;
          } else if (attr.value.type === "JSXExpressionContainer") {
            const code = generate(attr.value.expression).code;
            if (
              attr.value.expression.type === "ArrowFunctionExpression" ||
              attr.value.expression.type === "FunctionExpression"
            ) {
              value = `FUNCTION:${propName}`;
            } else {
              value = code;
            }
          }
          props[propName] = value;
        } else if (attr.type === "JSXSpreadAttribute") {
          const spreadCode = generate(attr.argument).code;
          props["__spread__"] = spreadCode;
        }
      });

      const children: Node[] = [];
      node.children?.forEach((child) => {
        const jsonChild = jsxToJson(child);
        if (jsonChild !== null) {
          children.push(jsonChild);
        }
      });

      return { type: elementType || 'div', props, children };
    }
    case "JSXFragment": {
      const children: Node[] = [];
      node.children?.forEach((child) => {
        const jsonChild = jsxToJson(child);
        if (jsonChild !== null) {
          children.push(jsonChild);
        }
      });
      return { type: 'div', props: {}, children };
    }
    case "JSXText": {
      // Preserve the raw text (do not remove all whitespace)
      const text = node.value || "";
      // If the trimmed text looks like a comment, skip it.
      if (/^\/\*.*\*\/$/.test(text.trim())) {
        return null;
      }
      // Always return a text node with the raw text trimmed (or you could remove trim() if whitespace matters)
      return { type: 'text', props: { text: text.trim() }, children: [] };
    }
    case "JSXExpressionContainer": {
      if (node.expression.type === "JSXEmptyExpression") return null;
      if (
        node.expression.type === "CallExpression" &&
        node.expression.callee &&
        node.expression.callee.property &&
        node.expression.callee.property.name === "map"
      ) {
        const source = generate(node.expression.callee.object).code;
        const mapFunc = node.expression.arguments[0];
        let template: Node | null = null;
        if (mapFunc.type === "ArrowFunctionExpression") {
          if (mapFunc.body.type === "JSXElement") {
            template = jsxToJson(mapFunc.body);
          } else if (mapFunc.body.type === "BlockStatement") {
            mapFunc.body.body.forEach((statement) => {
              if (statement.type === "ReturnStatement" && statement.argument) {
                const result = jsxToJson(statement.argument);
                if (result) template = result;
              }
            });
          }
        }
        return { type: "map", props: { source }, children: template ? [template] : [] };
      }
      const code = generate(node.expression).code;
      return { type: 'text', props: { text: code }, children: [] };
    }
    default:
      return null;
  }
}

function convert(code: string): Node | null {
  const ast = parser.parse(code, {
    sourceType: "module",
    plugins: ["jsx"],
  });

  let outputJson: Node | null = null;
  traverse(ast, {
    JSXElement(path) {
      if (!outputJson) {
        outputJson = jsxToJson(path.node);
      }
    },
    JSXFragment(path) {
      if (!outputJson) {
        outputJson = jsxToJson(path.node);
      }
    },
  });
  return outputJson;
}

export { convert };
