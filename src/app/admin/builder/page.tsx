"use client";

import { useState } from "react";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InPlacePageRenderer, Node as PageNode } from "@/components/InPlacePageRenderer";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import EditableText from "@/components/ui/EditableText";
import { convert } from "./convert-jsx-to-json";
import { Node as RendererNode } from "@/components/InPlacePageRenderer";

// Dummy implementations for missing utility functions
function getComponentIcon(type: string): string {
  switch (type) {
    case "CTAWithImage":
      return "icon-cta-image";
    case "CTADefault":
      return "icon-cta-default";
    case "ContactForm":
      return "icon-contact-form";
    case "Feature":
      return "icon-feature";
    case "InfiniteMovingCardsDemo":
      return "icon-moving-cards";
    case "faq":
      return "icon-faq";
    case "Hero":
      return "icon-hero";
    case "HeroDefault":
      return "icon-hero-default";
    case "Title":
      return "icon-title";
    case "TitleWithDoubleBorder":
      return "icon-title-double-border";
    case "TitleWithBottomBorder":
      return "icon-title-bottom-border";
    case "p":
      return "icon-paragraph";
    case "h3":
      return "icon-heading-3";
    case "h4":
      return "icon-heading-4";
    case "span":
      return "icon-span";
    case "CardWithImage":
      return "icon-card-with-image";
    case "HoverCard":
      return "icon-hover-card";
    case "ServicesCard":
      return "icon-services-card";
    case "OfficeCard":
      return "icon-office-card";
    default:
      return "icon-default";
  }
}

function getComponentDescription(type: string): string {
  switch (type) {
    case "CTAWithImage":
      return "Call to action with image component.";
    case "CTADefault":
      return "Default call to action component.";
    case "ContactForm":
      return "Contact form component.";
    case "Feature":
      return "Feature component.";
    case "InfiniteMovingCardsDemo":
      return "Infinite moving cards demo component.";
    case "faq":
      return "Frequently asked questions component.";
    case "Hero":
      return "Hero component.";
    case "HeroDefault":
      return "Default hero component.";
    case "Title":
      return "Title component.";
    case "TitleWithDoubleBorder":
      return "Title component with double border.";
    case "TitleWithBottomBorder":
      return "Title component with bottom border.";
    case "p":
      return "Paragraph component.";
    case "h3":
      return "Heading 3 component.";
    case "h4":
      return "Heading 4 component.";
    case "span":
      return "Span component.";
    case "CardWithImage":
      return "Card with image component.";
    case "HoverCard":
      return "Hover card component.";
    case "ServicesCard":
      return "Services card component.";
    case "OfficeCard":
      return "Office card component.";
    default:
      return "Component description.";
  }
}

// Type definitions for our builder nodes
interface TextNode {
  type: "text";
  props: {
    text?: string;
    [key: string]: any;
  };
  children: string[];
}

interface ComponentNode {
  type: string;
  props: {
    [key: string]: any;
  };
  children: (ComponentNode | TextNode)[];
}

type BuilderNode = ComponentNode | TextNode;

// Type guards
function isComponentNode(node: BuilderNode | null | undefined): node is ComponentNode {
  return node !== null && node !== undefined && "type" in node && node.type !== "text";
}

function isTextNode(node: BuilderNode | null | undefined): node is TextNode {
  return node !== null && node !== undefined && "type" in node && node.type === "text";
}

// Convert BuilderNode to RendererNode
function builderToRendererNode(node: BuilderNode): RendererNode {
  return {
    type: node.type,
    props: node.props || {},
    children: node.children.map(child =>
      typeof child === "string"
        ? { type: "text", props: { text: child }, children: [] }
        : builderToRendererNode(child)
    ),
  };
}

// Convert RendererNode to BuilderNode
function rendererToBuilderNode(node: RendererNode): BuilderNode {
  if (node.type === "text") {
    return {
      type: "text",
      props: node.props || {},
      children:
        node.children?.map(child =>
          typeof child === "string" ? child : child.props.text || ""
        ) || [],
    } as TextNode;
  }
  
  // Special handling for Title components – never allow children
  if (node.type === "Title") {
    return {
      type: node.type,
      props: node.props || {},
      children: [],
    } as ComponentNode;
  }
  
  return {
    type: node.type,
    props: node.props || {},
    children: (node.children || []).map(child => rendererToBuilderNode(child)),
  } as ComponentNode;
}

// Standalone components that can be rendered without a parent
const standaloneComponents = [
  { type: "CTAWithImage", label: "CTA with Image", category: "Standalone" },
  { type: "CTADefault", label: "CTA Default", category: "Standalone" },
  { type: "ContactForm", label: "Contact Form", category: "Standalone" },
  { type: "Feature", label: "Feature", category: "Standalone" },
  { type: "InfiniteMovingCardsDemo", label: "Moving Cards", category: "Standalone" },
  { type: "faq", label: "FAQ", category: "Standalone" },
  { type: "Hero", label: "Hero", category: "Hero" },
  { type: "HeroDefault", label: "Hero Default", category: "Hero" },
];

// Components that need a parent container
const nestedComponents = [
  // Content Components
  { type: "Title", label: "Title", category: "Content" },
  { type: "TitleWithDoubleBorder", label: "Title Double Border", category: "Content" },
  { type: "TitleWithBottomBorder", label: "Title Bottom Border", category: "Content" },
  { type: "p", label: "Paragraph", category: "Content" },
  { type: "h3", label: "Heading 3", category: "Content" },
  { type: "h4", label: "Heading 4", category: "Content" },
  { type: "span", label: "Span", category: "Content" },
  // Card Components
  { type: "CardWithImage", label: "Card with Image", category: "Cards" },
  { type: "HoverCard", label: "Hover Card", category: "Cards" },
  { type: "ServicesCard", label: "Services Card", category: "Cards" },
  { type: "OfficeCard", label: "Office Card", category: "Cards" },
];

const defaultNewPage: BuilderNode[] = [];

// Update the selectedColumn type
interface SelectedColumn {
  containerIndex: number;
  rowIndex: number;
  columnIndex: number;
  insertIndex?: number;
}

export default function PageBuilder() {
  const [pageNodes, setPageNodes] = useState<BuilderNode[]>(defaultNewPage);
  const [selectedColumn, setSelectedColumn] = useState<SelectedColumn | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<{
    node: BuilderNode;
    path: { containerIndex: number; rowIndex: number; columnIndex: number; componentIndex: number };
  } | null>(null);

  // Function to save the current page structure as JSON
  const handleSave = () => {
    const jsonString = JSON.stringify(pageNodes);
    console.log("Saving page structure:", jsonString);
  };

  // Function to move a component up or down in its column
  const moveComponent = (direction: "up" | "down") => {
    if (!selectedComponent) return;

    const { containerIndex, rowIndex, columnIndex, componentIndex } = selectedComponent.path;
    const newPageNodes = [...pageNodes];
    const container = newPageNodes[containerIndex];

    if (!isComponentNode(container)) return;

    const isGlassContainer = container.children[0]?.type === "Glass";
    let targetColumn;

    if (isGlassContainer && isComponentNode(container.children[0])) {
      targetColumn = container.children[0].children[rowIndex]?.children[columnIndex];
    } else {
      targetColumn = container.children[rowIndex]?.children[columnIndex];
    }

    if (!isComponentNode(targetColumn)) return;

    const components = targetColumn.children;
    const newIndex =
      direction === "up" ? Math.max(0, componentIndex - 1) : Math.min(components.length - 1, componentIndex + 1);

    if (newIndex === componentIndex) return;

    // Swap components
    [components[componentIndex], components[newIndex]] = [components[newIndex], components[componentIndex]];

    setPageNodes(newPageNodes);
  };

  // Add a new plain container with an initial row and column
  const addPlainContainer = () => {
    const newContainer: ComponentNode = {
      type: "Container",
      props: {
        rows: 1,
        columnsPerRow: [1],
      },
      children: [
        {
          type: "row",
          props: {},
          children: [
            {
              type: "div",
              props: {
                className: "column relative",
                style: {
                  flex: 1,
                  padding: "1rem",
                  minHeight: "120px",
                  border: "1px dashed rgba(255, 255, 255, 0.2)",
                  margin: "0.5rem",
                  borderRadius: "0.5rem",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                },
              },
              children: [],
            },
          ],
        },
      ],
    };

    setPageNodes([...pageNodes, newContainer]);
  };

  // Add a new container with glass effect
  const addContainerWithGlass = () => {
    const newContainer: ComponentNode = {
      type: "Container",
      props: {
        rows: 1,
        columnsPerRow: [1],
      },
      children: [
        {
          type: "Glass",
          props: {},
          children: [
            {
              type: "row",
              props: {},
              children: [
                {
                  type: "div",
                  props: {
                    className: "column relative",
                    style: {
                      flex: 1,
                      padding: "1rem",
                      minHeight: "120px",
                      border: "1px dashed rgba(255, 255, 255, 0.2)",
                      margin: "0.5rem",
                      borderRadius: "0.5rem",
                      backdropFilter: "blur(8px)",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  },
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    };

    setPageNodes([...pageNodes, newContainer]);
  };

  const addComponentToColumn = (
    containerIndex: number,
    rowIndex: number,
    columnIndex: number,
    componentType: string,
    insertIndex?: number
  ) => {
    let jsxString = "";
  
    // Build JSX string based on the component type.
    switch (componentType) {
      case "Title":
        jsxString = `
          <Title
            title="Enter title"
            subtitle="Enter subtitle"
            description="Enter description"
            className="w-full"
          />
        `;
        break;
      case "TitleWithDoubleBorder":
      case "TitleWithBottomBorder":
        jsxString = `
          <${componentType}
            text="Enter title with border"
            style={{ color: "#000000" }}
          >
            Enter title with border
          </${componentType}>
        `;
        break;
      case "h3":
        jsxString = `
          <h3 className="text-xl font-semibold" style={{ color: "#000000" }}>
            Enter heading
          </h3>
        `;
        break;
      case "h4":
        jsxString = `
          <h4 className="text-lg font-semibold" style={{ color: "#000000" }}>
            Enter subheading
          </h4>
        `;
        break;
      case "p":
        jsxString = `
          <p className="text-base" style={{ color: "#000000" }}>Enter paragraph text</p>`;
        break;
      case "span":
        jsxString = `
          <span style={{ color: "#000000" }}>
            Enter text
          </span>
        `;
        break;
      default:
        jsxString = `<${componentType} />`;
    }
  
    // Convert the JSX string to a JSON node, then to a BuilderNode.
    const jsonNode = convert(jsxString);
    if (!jsonNode) return;
    const builderNode = rendererToBuilderNode(jsonNode);
  
    // Copy the current pageNodes and get the target container.
    const updatedNodes = [...pageNodes];
    const container = updatedNodes[containerIndex] as ComponentNode;
  
    // Determine whether this container uses a Glass wrapper.
    const isGlassContainer = container.children[0]?.type === "Glass";
    let targetColumn;
  
    // For a Glass container, the row is nested under container.children[0].children;
    // For a plain container, the row is directly at container.children.
    if (isGlassContainer && isComponentNode(container.children[0])) {
      targetColumn = container.children[0].children[rowIndex].children[columnIndex];
    } else {
      targetColumn = container.children[rowIndex].children[columnIndex];
    }
  
    // Ensure the target column is a component node before adding the new component.
    if (!isComponentNode(targetColumn)) return;
  
    // Insert at the specified index or append to the end.
    if (typeof insertIndex === "number") {
      targetColumn.children.splice(insertIndex, 0, builderNode);
    } else {
      targetColumn.children.push(builderNode);
    }
  
    setPageNodes(updatedNodes);
    setSelectedColumn(null);
  };

  function componentToJSX(type: string, props: Record<string, any> = {}, children: any[] = []): string {
    const propsString = Object.entries(props)
      .map(([key, value]) => {
        if (key === "style" && typeof value === "object") {
          const styleObj = value as Record<string, string | number>;
          return `style={{${Object.entries(styleObj)
            .map(([k, v]) => `${k}: "${v}"`)
            .join(", ")}}}`;
        }
        if (typeof value === "string") {
          return `${key}="${value}"`;
        }
        if (typeof value == "boolean" && value) {
          return key;
        }
        return `${key}={${JSON.stringify(value)}}`;
      })
      .join(" ");

    const childrenString = children
      .map((child) => {
        if (typeof child === "string") {
          return child;
        }
        if (typeof child === "object") {
          return componentToJSX(child.type, child.props, child.children);
        }
        return "";
      })
      .join("\n");

    return `<${type}${propsString ? " " + propsString : ""}>${
      childrenString ? "\n" + childrenString + "\n" : ""
    }</${type}>`;
  }

  // Update the addStandaloneComponent function
  const addStandaloneComponent = (componentType: string) => {
    let jsxString = "";

    switch (componentType) {
      case "CTAWithImage":
        jsxString = `
          <CTAWithImage
            title="CTA Title"
            description="Call to action description"
            image="/placeholder.jpg"
          >
          </CTAWithImage>
        `;
        break;
      case "CTADefault":
        jsxString = `
          <CTADefault
            title="CTA Title"
            description="Call to action description"
          >
          </CTADefault>
        `;
        break;
      case "Hero":
        jsxString = `
          <Hero
            title="Hero Title"
            description="Hero description"
            backgroundImage="/placeholder.jpg"
          >
          </Hero>
        `;
        break;
      default:
        jsxString = `<${componentType}></${componentType}>`;
    }

    const jsonNode = convert(jsxString);
    if (jsonNode) {
      const cleanComponent: BuilderNode = {
        type: jsonNode.type,
        props: jsonNode.props || {},
        children: [],
      };
      setPageNodes([...pageNodes, cleanComponent]);
    }
  };

  // Update container layout (rows and columns) while preserving content if possible
  const updateContainerLayout = (
    containerIndex: number,
    rows: number,
    columnsPerRow: number[]
  ) => {
    const updatedNodes = [...pageNodes];
    const container = updatedNodes[containerIndex] as ComponentNode;
    const isGlassContainer = container.children?.[0]?.type === "Glass";

    const createColumn = () => ({
      type: "div",
      props: {
        className: "column relative",
        style: {
          flex: 1,
          padding: "1rem",
          minHeight: "120px",
          border: "1px dashed rgba(255, 255, 255, 0.2)",
          margin: "0.5rem",
          ...(isGlassContainer
            ? {
                backdropFilter: "blur(8px)",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }
            : {
                backgroundColor: "rgba(255, 255, 255, 0.05)",
              }),
        },
      },
      children: [],
    });

    const createRow = (columns: number, existingRow: any = null) => {
      if (existingRow) {
        const existingColumns = existingRow.children || [];
        const newColumns = Array(columns).fill(null).map((_, i) => {
          return existingColumns[i] || createColumn();
        });
        return {
          type: "row",
          props: existingRow.props || {},
          children: newColumns,
        };
      }
      return {
        type: "row",
        props: {},
        children: Array(columns).fill(null).map(() => createColumn()),
      };
    };

    const targetNode = isGlassContainer ? container.children[0] : container;
    const existingRows = targetNode.children || [];

    const newRows = Array(rows)
      .fill(null)
      .map((_, i) => createRow(columnsPerRow[i], existingRows[i]));

    targetNode.props.rows = rows;
    targetNode.props.columnsPerRow = columnsPerRow;
    targetNode.children = newRows;

    setPageNodes(updatedNodes);
  };

  // Add a new container component (wrapper for various types)
  const addComponent = (componentType: string) => {
    let newComponent: ComponentNode = {
      type: componentType,
      props: {},
      children: [],
    };

    if (["Container", "section", "Glass"].includes(componentType)) {
      newComponent.props.layout = 1;
      newComponent.children = [
        {
          type: "div",
          props: {
            className: "column relative",
            style: {
              flex: 1,
              padding: "0.5rem",
              minHeight: "100px",
              border: "1px dashed #ccc",
              margin: "0.5rem",
            },
          },
          children: [],
        },
      ];
    }

    setPageNodes([...pageNodes, newComponent]);
  };

  // Function to update component props for a nested component
  const updateComponentProps = (newProps: any) => {
    if (!selectedComponent) return;

    const { containerIndex, rowIndex, columnIndex, componentIndex } = selectedComponent.path;
    const updatedNodes = [...pageNodes];
    const container = updatedNodes[containerIndex];

    if (!isComponentNode(container)) return;
    const isGlassContainer = container.children[0]?.type === "Glass";

    let targetComponent: BuilderNode | undefined;
    if (isGlassContainer && isComponentNode(container.children[0])) {
      const glassContainer = container.children[0];
      if (isComponentNode(glassContainer.children[rowIndex])) {
        const row = glassContainer.children[rowIndex];
        if (isComponentNode(row.children[columnIndex])) {
          const column = row.children[columnIndex];
          targetComponent = column.children[componentIndex];
        }
      }
    } else if (isComponentNode(container.children[rowIndex])) {
      const row = container.children[rowIndex];
      if (isComponentNode(row.children[columnIndex])) {
        const column = row.children[columnIndex];
        targetComponent = column.children[componentIndex];
      }
    }

    if (!targetComponent) return;

    if (isComponentNode(targetComponent) || isTextNode(targetComponent)) {
      targetComponent.props = { ...targetComponent.props, ...newProps };
    }

    setPageNodes(updatedNodes);
  };

  return (
    <div className="page-builder bg-background min-h-screen">
      <div className="flex gap-4 p-4 h-[calc(100vh-2rem)] m-4">
        {/* Left Sidebar - Component Library */}
        <aside className="w-80 bg-card rounded-xl shadow-lg overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border">
            <h2 className="text-lg font-semibold text-primary">Component Library</h2>
          </div>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Containers</h3>
                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={addPlainContainer}
                    className="flex items-center gap-3 w-full px-4 py-3 bg-primary/5 hover:bg-primary/10 text-primary rounded-lg font-medium transition-all hover:translate-x-1"
                  >
                    <Icon icon="lucide:layout-template" className="w-5 h-5" />
                    <span>Basic Container</span>
                  </button>
                  <button
                    onClick={addContainerWithGlass}
                    className="flex items-center gap-3 w-full px-4 py-3 bg-primary/5 hover:bg-primary/10 text-primary rounded-lg font-medium transition-all hover:translate-x-1"
                  >
                    <Icon icon="lucide:panel-top" className="w-5 h-5" />
                    <span>Glass Container</span>
                  </button>
                </div>
              </div>

              {/* Standalone Components */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Standalone Components</h3>
                <div className="grid grid-cols-1 gap-2">
                  {standaloneComponents.map((comp) => (
                    <button
                      key={comp.type}
                      onClick={() => addStandaloneComponent(comp.type)}
                      className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-accent rounded-lg text-left transition-all hover:translate-x-1"
                    >
                      <Icon icon={getComponentIcon(comp.type)} className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{comp.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Nested Components – Only show when a column is selected */}
              {selectedColumn && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Column Components</h3>
                  {Object.entries(
                    nestedComponents.reduce((acc, comp) => {
                      acc[comp.category] = [...(acc[comp.category] || []), comp];
                      return acc;
                    }, {} as Record<string, typeof nestedComponents>)
                  ).map(([category, comps]) => (
                    <div key={category} className="mb-4">
                      <h4 className="text-xs font-medium text-muted-foreground/70 mb-2">{category}</h4>
                      <div className="grid grid-cols-1 gap-1">
                        {comps.map((comp) => (
                          <button
                            key={comp.type}
                            onClick={() => {
                              addComponentToColumn(
                                selectedColumn.containerIndex,
                                selectedColumn.rowIndex,
                                selectedColumn.columnIndex,
                                comp.type,
                                selectedColumn.insertIndex
                              );
                              setSelectedColumn(null);
                            }}
                            className="flex items-center gap-3 w-full px-3 py-2 hover:bg-accent rounded-lg text-left transition-all hover:translate-x-1"
                          >
                            <Icon icon={getComponentIcon(comp.type)} className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{comp.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>
        </aside>

        {/* Main Editor Area */}
        <main className="flex-1 bg-card rounded-xl shadow-lg overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h2 className="text-lg font-semibold text-primary">Page Editor</h2>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-sm bg-primary/10 hover:bg-primary/20 text-primary rounded-md transition-colors">
                Preview
              </button>
              <button
                onClick={handleSave}
                className="px-3 py-1.5 text-sm bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
          <ScrollArea className="flex-1 p-6">
            <div className="max-w-6xl mx-auto space-y-6">
              {pageNodes.map((node, index) => (
                <div key={index} className="relative group">
                  <div className="absolute -inset-px rounded-xl border-2 border-transparent group-hover:border-primary/10 transition-colors" />
                  {renderNode(
                    node,
                    index,
                    setSelectedColumn,
                    pageNodes,
                    setPageNodes,
                    updateContainerLayout,
                    addComponentToColumn
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </main>

        {/* Right Sidebar – Properties */}
        {/* <aside className="w-80 bg-card rounded-xl shadow-lg overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border">
            <h2 className="text-lg font-semibold text-primary">Properties</h2>
          </div>
          <ScrollArea className="flex-1 p-4">
            {selectedComponent ? (
              <div className="space-y-4">
                {renderComponentProperties(
                  selectedComponent,
                  updateComponentProps,
                  pageNodes,
                  setPageNodes
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground py-8">
                <Icon icon="lucide:settings-2" className="w-8 h-8 mb-2 opacity-50" />
                <p className="text-sm">Select a component to edit its properties</p>
              </div>
            )}
          </ScrollArea>
        </aside> */}
      </div>
    </div>
  );
}

// Helper function to render nodes based on type
function renderNode(
  node: BuilderNode,
  containerIndex: number,
  setSelectedColumn: (value: SelectedColumn | null) => void,
  pageNodes: BuilderNode[],
  setPageNodes: (nodes: BuilderNode[]) => void,
  updateContainerLayout: (containerIndex: number, rows: number, columnsPerRow: number[]) => void,
  addComponentToColumn: (
    containerIndex: number,
    rowIndex: number,
    columnIndex: number,
    componentType: string,
    insertIndex?: number
  ) => void
) {
  if (!isComponentNode(node)) return null;

  if (node.type === "Container") {
    const hasGlass = node.children?.[0]?.type === "Glass";
    return hasGlass ? (
      <ContainerWithGlassComponent
        node={node}
        containerIndex={containerIndex}
        setSelectedColumn={setSelectedColumn}
        pageNodes={pageNodes}
        setPageNodes={setPageNodes}
        updateContainerLayout={updateContainerLayout}
        addComponentToColumn={addComponentToColumn}
      />
    ) : (
      <PlainContainerComponent
        node={node}
        containerIndex={containerIndex}
        setSelectedColumn={setSelectedColumn}
        pageNodes={pageNodes}
        setPageNodes={setPageNodes}
        updateContainerLayout={updateContainerLayout}
        addComponentToColumn={addComponentToColumn}
      />
    );
  }

  if (standaloneComponents.some((comp) => comp.type === node.type)) {
    return (
      <InPlacePageRenderer
        nodes={[builderToRendererNode(node)]}
        editable={true}
        onChange={(updatedNode) => {
          const updatedPageNodes = [...pageNodes];
          console.log("updatedNode", updatedNode);
          const updatedComponent = Array.isArray(updatedNode) ? updatedNode[0] : updatedNode;
          const cleanProps = { ...updatedComponent.props };
          delete cleanProps.props;
          const cleanComponent: BuilderNode = {
            type: node.type,
            props: cleanProps,
            children: [],
          };

          updatedPageNodes[containerIndex] = cleanComponent;
          setPageNodes(updatedPageNodes);
        }}
      />
    );
  }
  return null;
}

// Plain container component rendering
function PlainContainerComponent({
  node,
  containerIndex,
  setSelectedColumn,
  pageNodes,
  setPageNodes,
  updateContainerLayout,
  addComponentToColumn,
}: {
  node: ComponentNode;
  containerIndex: number;
  setSelectedColumn: (value: SelectedColumn | null) => void;
  pageNodes: BuilderNode[];
  setPageNodes: (nodes: BuilderNode[]) => void;
  updateContainerLayout: (containerIndex: number, rows: number, columnsPerRow: number[]) => void;
  addComponentToColumn: (
    containerIndex: number,
    rowIndex: number,
    columnIndex: number,
    componentType: string,
    insertIndex?: number
  ) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(0);
  const [selectedColumnIndex, setSelectedColumnIndex] = useState<number>(0);

  const handleAddComponent = (rowIndex: number, columnIndex: number) => {
    setSelectedRowIndex(rowIndex);
    setSelectedColumnIndex(columnIndex);
    setShowDialog(true);
  };

  if (!isComponentNode(node)) return null;

  return (
    <div
      className="container-wrapper relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "absolute -top-3 left-4 flex items-center gap-2 px-2 py-1.5 rounded-md bg-card shadow-sm border border-border",
          "opacity-0 group-hover:opacity-100 transition-opacity",
          "z-10"
        )}
      >
        <Icon icon="lucide:layout-template" className="w-4 h-4 text-muted-foreground" />
        <div className="flex items-center gap-3">
          <select
            value={node.props.rows}
            onChange={(e) => {
              const newRows = parseInt(e.target.value);
              const newColumnsPerRow = Array(newRows).fill(1);
              updateContainerLayout(containerIndex, newRows, newColumnsPerRow);
            }}
            className="px-2 py-1 text-sm bg-transparent border-0 focus:ring-0"
          >
            {[1, 2, 3, 4].map((num) => (
              <option key={num} value={num}>
                {num} Row{num > 1 ? "s" : ""}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              const newNodes = [...pageNodes];
              newNodes.splice(containerIndex, 1);
              setPageNodes(newNodes);
            }}
            className="p-1 hover:bg-destructive/10 hover:text-destructive rounded transition-colors"
          >
            <Icon icon="lucide:trash-2" className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="bg-card/5 backdrop-blur-sm rounded-xl p-6 border-2 border-transparent group-hover:border-primary/10 transition-colors">
        <div className="space-y-6">
          {node.children.map((row, rowIndex) => (
            <div key={rowIndex} className="space-y-4">
              <div
                className={cn(
                  "flex items-center justify-between px-2",
                  "opacity-0 group-hover:opacity-100 transition-opacity"
                )}
              >
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:rows" className="w-4 h-4 text-muted-foreground" />
                  <select
                    value={node.props.columnsPerRow[rowIndex]}
                    onChange={(e) => {
                      const newColumnsPerRow = [...node.props.columnsPerRow];
                      newColumnsPerRow[rowIndex] = parseInt(e.target.value);
                      updateContainerLayout(containerIndex, node.props.rows, newColumnsPerRow);
                    }}
                    className="px-2 py-1 text-sm bg-transparent border-0 focus:ring-0"
                  >
                    {[1, 2, 3, 4].map((num) => (
                      <option key={num} value={num}>
                        {num} Column{num > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => {
                    const newNodes = [...pageNodes];
                    const newChildren = [...node.children];
                    newChildren.splice(rowIndex, 1);
                    newNodes[containerIndex].children = newChildren;
                    setPageNodes(newNodes);
                  }}
                  className="p-1 hover:bg-destructive/10 hover:text-destructive rounded transition-colors"
                >
                  <Icon icon="lucide:trash-2" className="w-4 h-4" />
                </button>
              </div>
              <div
                className="grid gap-4"
                style={{
                  gridTemplateColumns: `repeat(${node.props.columnsPerRow[rowIndex]}, minmax(0, 1fr))`,
                }}
              >
                {isComponentNode(row) &&
                  row.children.map((column, columnIndex) => (
                    <div
                      key={columnIndex}
                      className={cn(
                        "relative group/column rounded-lg",
                        "min-h-[120px] p-4",
                        "bg-white/5 hover:bg-white/10 dark:bg-gray-900/30 dark:hover:bg-gray-900/50",
                        "border border-dashed border-primary/20 hover:border-primary/40",
                        "backdrop-blur-sm",
                        "transition-all duration-200"
                      )}
                    >
                      {column.children.length === 0 ? (
                        <button
                          onClick={() => handleAddComponent(rowIndex, columnIndex)}
                          className="absolute inset-0 flex items-center justify-center group/add"
                        >
                          <div
                            className={cn(
                              "flex items-center gap-2 px-4 py-2 rounded-lg",
                              "bg-primary/5 group-hover/add:bg-primary/10",
                              "text-primary text-sm",
                              "transition-colors"
                            )}
                          >
                            <Icon icon="lucide:plus" className="w-4 h-4" />
                            <span>Add Component</span>
                          </div>
                        </button>
                      ) : (
                        <>
                          {column.children.map((component, componentIndex) => (
                            <React.Fragment key={componentIndex}>
                              <div className="relative group/component">
                                <InPlacePageRenderer
                                  nodes={[builderToRendererNode(component)]}
                                  editable={true}
                                  onChange={(updatedNode) => {
                                    const updatedPageNodes = [...pageNodes];
                                    const updatedComponent = Array.isArray(updatedNode)
                                      ? updatedNode[0]
                                      : updatedNode;
                                    const cleanProps = { ...updatedComponent.props };
                                    delete cleanProps.props;
                                    const cleanComponent: BuilderNode = {
                                      type: component.type,
                                      props: cleanProps,
                                      children: [],
                                    };

                                    if (isComponentNode(updatedPageNodes[containerIndex])) {
                                      const container = updatedPageNodes[containerIndex] as ComponentNode;
                                      if (isComponentNode(container.children[rowIndex])) {
                                        const row = container.children[rowIndex];
                                        if (isComponentNode(row.children[columnIndex])) {
                                          const column = row.children[columnIndex];
                                          column.children[componentIndex] = cleanComponent;
                                        }
                                      }
                                    }
                                    setPageNodes(updatedPageNodes);
                                  }}
                                />
                              </div>
                            </React.Fragment>
                          ))}
                        </>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-3xl max-h-[85vh] p-0 gap-0 overflow-hidden bg-background/80 backdrop-blur-xl border border-border/50 shadow-2xl">
          <DialogHeader className="p-6 border-b border-border/50 bg-background/50">
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Icon icon="lucide:plus-circle" className="w-6 h-6 text-primary" />
              Add Component
            </DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="content" className="flex-1">
            <div className="px-6 border-b border-border/50 bg-background/50">
              <TabsList className="w-full h-12 p-1 bg-muted/30">
                <TabsTrigger value="content" className="flex items-center gap-2 data-[state=active]:bg-background">
                  <Icon icon="lucide:type" className="w-4 h-4" />
                  Content
                </TabsTrigger>
                <TabsTrigger value="cards" className="flex items-center gap-2 data-[state=active]:bg-background">
                  <Icon icon="lucide:layout-grid" className="w-4 h-4" />
                  Cards
                </TabsTrigger>
                <TabsTrigger value="hero" className="flex items-center gap-2 data-[state=active]:bg-background">
                  <Icon icon="lucide:layout" className="w-4 h-4" />
                  Hero
                </TabsTrigger>
                <TabsTrigger value="other" className="flex items-center gap-2 data-[state=active]:bg-background">
                  <Icon icon="lucide:more-horizontal" className="w-4 h-4" />
                  Other
                </TabsTrigger>
              </TabsList>
            </div>
            <ScrollArea className="flex-1 p-6 h-[60vh] bg-background/50">
              {Object.entries(
                nestedComponents.reduce((acc, comp) => {
                  acc[comp.category] = [...(acc[comp.category] || []), comp];
                  return acc;
                }, {} as Record<string, typeof nestedComponents>)
              ).map(([category, components]) => (
                <TabsContent key={category} value={category.toLowerCase()} className="m-0 grid grid-cols-2 gap-4 mt-2">
                  {components.map((comp) => (
                    <button
                      key={comp.type}
                      onClick={() => {
                        if (typeof selectedRowIndex === "number" && typeof selectedColumnIndex === "number") {
                          addComponentToColumn(containerIndex, selectedRowIndex, selectedColumnIndex, comp.type);
                          setShowDialog(false);
                        }
                      }}
                      className="group relative flex flex-col items-center gap-4 p-6 rounded-xl bg-card hover:bg-accent border border-border/50 hover:border-primary/50 transition-all hover:scale-[1.02]"
                    >
                      <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon icon={getComponentIcon(comp.type)} className="w-7 h-7" />
                      </div>
                      <div className="text-center">
                        <h3 className="font-medium mb-2">{comp.label}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {getComponentDescription(comp.type)}
                        </p>
                      </div>
                    </button>
                  ))}
                </TabsContent>
              ))}
            </ScrollArea>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Container with Glass variant rendering
function ContainerWithGlassComponent({
  node,
  containerIndex,
  setSelectedColumn,
  pageNodes,
  setPageNodes,
  updateContainerLayout,
  addComponentToColumn,
}: {
  node: ComponentNode;
  containerIndex: number;
  setSelectedColumn: (value: SelectedColumn | null) => void;
  pageNodes: BuilderNode[];
  setPageNodes: (nodes: BuilderNode[]) => void;
  updateContainerLayout: (containerIndex: number, rows: number, columnsPerRow: number[]) => void;
  addComponentToColumn: (
    containerIndex: number,
    rowIndex: number,
    columnIndex: number,
    componentType: string,
    insertIndex?: number
  ) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(0);
  const [selectedColumnIndex, setSelectedColumnIndex] = useState<number>(0);

  const glassNode = node.children[0];
  if (!isComponentNode(glassNode)) return null;

  const handleAddComponent = (rowIndex: number, columnIndex: number) => {
    setSelectedRowIndex(rowIndex);
    setSelectedColumnIndex(columnIndex);
    setShowDialog(true);
  };

  return (
    <div
      className="container-wrapper relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "absolute -top-3 left-4 flex items-center gap-2 px-2 py-1.5 rounded-md bg-card shadow-sm border border-border",
          "opacity-0 group-hover:opacity-100 transition-opacity",
          "z-10"
        )}
      >
        <Icon icon="lucide:panel-top" className="w-4 h-4 text-muted-foreground" />
        <div className="flex items-center gap-3">
          <select
            value={glassNode.props.rows || 1}
            onChange={(e) => {
              const newRows = parseInt(e.target.value);
              const newColumnsPerRow = Array(newRows).fill(1);
              updateContainerLayout(containerIndex, newRows, newColumnsPerRow);
            }}
            className="px-2 py-1 text-sm bg-transparent border-0 focus:ring-0"
          >
            {[1, 2, 3, 4].map((num) => (
              <option key={num} value={num}>
                {num} Row{num > 1 ? "s" : ""}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              const newNodes = [...pageNodes];
              newNodes.splice(containerIndex, 1);
              setPageNodes(newNodes);
            }}
            className="p-1 hover:bg-destructive/10 hover:text-destructive rounded transition-colors"
          >
            <Icon icon="lucide:trash-2" className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="glass-component bg-white/5 dark:bg-gray-900/20 backdrop-blur-md rounded-xl p-6 border-2 border-transparent group-hover:border-primary/10 transition-colors">
        <div className="space-y-6">
          {glassNode.children.map((row, rowIndex) => {
            if (!isComponentNode(row)) return null;
            return (
              <div key={rowIndex} className="space-y-4">
                <div
                  className={cn(
                    "flex items-center justify-between px-2",
                    "opacity-0 group-hover:opacity-100 transition-opacity"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:rows" className="w-4 h-4 text-muted-foreground" />
                    <select
                      value={glassNode.props.columnsPerRow[rowIndex]}
                      onChange={(e) => {
                        const newColumnsPerRow = [...glassNode.props.columnsPerRow];
                        newColumnsPerRow[rowIndex] = parseInt(e.target.value);
                        updateContainerLayout(containerIndex, glassNode.props.rows, newColumnsPerRow);
                      }}
                      className="px-2 py-1 text-sm bg-transparent border-0 focus:ring-0"
                    >
                      {[1, 2, 3, 4].map((num) => (
                        <option key={num} value={num}>
                          {num} Column{num > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div
                  className="grid gap-4"
                  style={{
                    gridTemplateColumns: `repeat(${glassNode.props.columnsPerRow[rowIndex]}, minmax(0, 1fr))`,
                  }}
                >
                  {row.children.map((column, columnIndex) => {
                    if (!isComponentNode(column)) return null;
                    return (
                      <div
                        key={columnIndex}
                        className={cn(
                          "relative group/column rounded-lg",
                          "min-h-[120px] p-4",
                          "bg-white/5 hover:bg-white/10 dark:bg-gray-900/30 dark:hover:bg-gray-900/50",
                          "border border-dashed border-primary/20 hover:border-primary/40",
                          "backdrop-blur-sm",
                          "transition-all duration-200"
                        )}
                      >
                        {column.children.length === 0 ? (
                          <button
                            onClick={() => handleAddComponent(rowIndex, columnIndex)}
                            className="absolute inset-0 flex items-center justify-center group/add"
                          >
                            <div
                              className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-lg",
                                "bg-primary/5 group-hover/add:bg-primary/10",
                                "text-primary text-sm",
                                "transition-colors"
                              )}
                            >
                              <Icon icon="lucide:plus" className="w-4 h-4" />
                              <span>Add Component</span>
                            </div>
                          </button>
                        ) : (
                          <>
                            {column.children.map((component, componentIndex) => (
                              <React.Fragment key={componentIndex}>
                                <div className="relative group/component">
                                  <InPlacePageRenderer
                                    nodes={[builderToRendererNode(component)]}
                                    editable={true}
                                    onChange={(updatedNode) => {
                                      const updatedPageNodes = [...pageNodes];
                                      const updatedComponent = Array.isArray(updatedNode)
                                        ? updatedNode[0]
                                        : updatedNode;
                                      const cleanProps = { ...updatedComponent.props };
                                      delete cleanProps.props;
                                      const cleanComponent: BuilderNode = {
                                        type: component.type,
                                        props: cleanProps,
                                        children: [],
                                      };

                                      if (isComponentNode(updatedPageNodes[containerIndex])) {
                                        const container = updatedPageNodes[containerIndex] as ComponentNode;
                                        if (isComponentNode(container.children[rowIndex])) {
                                          const row = container.children[rowIndex];
                                          if (isComponentNode(row.children[columnIndex])) {
                                            const column = row.children[columnIndex];
                                            column.children[componentIndex] = cleanComponent;
                                          }
                                        }
                                      }
                                      setPageNodes(updatedPageNodes);
                                    }}
                                  />
                                </div>
                              </React.Fragment>
                            ))}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-3xl max-h-[85vh] p-0 gap-0 overflow-hidden bg-background/80 backdrop-blur-xl border border-border/50 shadow-2xl">
          <DialogHeader className="p-6 border-b border-border/50 bg-background/50">
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Icon icon="lucide:plus-circle" className="w-6 h-6 text-primary" />
              Add Component
            </DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="content" className="flex-1">
            <div className="px-6 border-b border-border/50 bg-background/50">
              <TabsList className="w-full h-12 p-1 bg-muted/30">
                <TabsTrigger value="content" className="flex items-center gap-2 data-[state=active]:bg-background">
                  <Icon icon="lucide:type" className="w-4 h-4" />
                  Content
                </TabsTrigger>
                <TabsTrigger value="cards" className="flex items-center gap-2 data-[state=active]:bg-background">
                  <Icon icon="lucide:layout-grid" className="w-4 h-4" />
                  Cards
                </TabsTrigger>
                <TabsTrigger value="hero" className="flex items-center gap-2 data-[state=active]:bg-background">
                  <Icon icon="lucide:layout" className="w-4 h-4" />
                  Hero
                </TabsTrigger>
                <TabsTrigger value="other" className="flex items-center gap-2 data-[state=active]:bg-background">
                  <Icon icon="lucide:more-horizontal" className="w-4 h-4" />
                  Other
                </TabsTrigger>
              </TabsList>
            </div>
            <ScrollArea className="flex-1 p-6 h-[60vh] bg-background/50">
              {Object.entries(
                nestedComponents.reduce((acc, comp) => {
                  acc[comp.category] = [...(acc[comp.category] || []), comp];
                  return acc;
                }, {} as Record<string, typeof nestedComponents>)
              ).map(([category, components]) => (
                <TabsContent key={category} value={category.toLowerCase()} className="m-0 grid grid-cols-2 gap-4 mt-2">
                  {components.map((comp) => (
                    <button
                      key={comp.type}
                      onClick={() => {
                        if (typeof selectedRowIndex === "number" && typeof selectedColumnIndex === "number") {
                          addComponentToColumn(containerIndex, selectedRowIndex, selectedColumnIndex, comp.type);
                          setShowDialog(false);
                        }
                      }}
                      className="group relative flex flex-col items-center gap-4 p-6 rounded-xl bg-card hover:bg-accent border border-border/50 hover:border-primary/50 transition-all hover:scale-[1.02]"
                    >
                      <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon icon={getComponentIcon(comp.type)} className="w-7 h-7" />
                      </div>
                      <div className="text-center">
                        <h3 className="font-medium mb-2">{comp.label}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {getComponentDescription(comp.type)}
                        </p>
                      </div>
                    </button>
                  ))}
                </TabsContent>
              ))}
            </ScrollArea>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}



