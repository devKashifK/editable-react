"use client";

import React from "react";
import Hero from "@/components/ui/hero";
import Footer from "@/components/ui/footer";
import Title from "@/components/ui/Title";
import EditableTitle from "@/components/ui/EditableTitle";
import OurService from "@/components/ui/hom-service";
import EditableOurService from "@/components/ui/EditableOurService";
import { CTADefault, CTAWithImage } from "@/components/ui/cta";
import EditableCTAWithImage from "@/components/ui/EditableCTAWithImage";
import EditableCTADefault from "@/components/ui/EditableCTADefault";
import { CardWithImage } from "@/components/ui/card-with-image";
import EditableCardWithImage from "@/components/ui/EditableCardWithImage";
import { InfiniteMovingCardsDemo } from "@/components/ui/testimonial";
import Container from "@/components/ui/container";
import EditableText from "./ui/EditableText";
import { Icon } from "@iconify/react";
import { List, UL } from "@/components/ui/list";
import EditableHoverCard from "@/components/ui/EditableHoverCard";
import { cn } from "@/lib/utils";
import Glass from "@/lib/helpers";
import HoverCard from "./ui/hover-card";
import TitleWithDoubleBorder from "./ui/title-with-double-border";
import TitleWithBottomBorder from "./ui/title-with-bottom-border";
import EditableTitleWithDoubleBorder from "./ui/EditableTitleWithDoubleBorder";
import EditableTitleWithBottomBorder from "./ui/EditableTitleWithBottomBorder";
import EditableOfficeCard from "@/components/ui/EditableOfficeCard";
import EditableContactForm from "@/components/ui/EditableContactForm";
import EditableHero from "./ui/EditableHero";
import { FaqCard } from "@/components/ui/faq-card";
import { EditableFaqCard } from "./ui/EditableFaqCard";
import TreeViewList from "./ui/tree-view-list";
import TreeView from "./ui/tree-view";
import EditableTreeView from "./ui/editable-tree-view";
import { FAQ } from "./ui/faq";
import { EditableFAQ } from "./ui/editable-faq";
import HeroDefault from "./ui/hero-all";
import { EditableHeroDefault } from "./ui/editable-hero";
import Link from "next/link";
import { ServicesCard } from "./ui/services-card";
import { Feature } from "./ui/cards-set";
import { FeatureEditor } from "./ui/feature-editor";
import { EditableServicesCard } from "./ui/editable-services-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table (2)";
import NewsShowcase from "@/app/(page)/news.tsx/news-showcase";
import { ContactForm, OfficeCard } from "@/app/(pages)/lien-he/contact";
// Add these interfaces at the top of the file
interface HeroProps {
  backgroundImage: string;
  features: any[];
  buttons: any[];
  title: string;
  description: string;
}

interface EditableCTAWithImageProps {
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  description: string | React.ReactNode;
  image: string;
  flip?: boolean;
  link?: string;
  desClassName?: string;
  ctaAction?: string | React.ReactNode;
}

interface EditableCTADefaultProps {
  title?: string;
  subtitle?: string | React.ReactNode;
  image?: string;
  description?: string | React.ReactNode;
  descriptionClassName?: string;
}

interface EditableTitleProps {
  title: string;
  subtitle?: string;
  description?: React.ReactNode;
  className?: string;
  onChange: (props: Partial<EditableTitleProps>) => void;
}

// First, update the interfaces to be more specific
interface EditableCardWithImageProps {
  title: string;
  description: React.ReactNode;
  image: string;
  href?: string;
  onChange: (props: Partial<EditableCardWithImageProps>) => void;
}

interface EditableHoverCardProps {
  title: string;
  description: string;
  cta: string;
  onChange: (props: Partial<EditableHoverCardProps>) => void;
}

interface EditableOfficeCardProps {
  country: string;
  imageUrl: string;
  address: string;
  phone: string;
  email: string;
  onChange: (props: Partial<EditableOfficeCardProps>) => void;
}

interface EditableContactFormProps {
  title: string;
  onChange: (props: Partial<EditableContactFormProps>) => void;
}

/**
 * applyTemplate - for "map" nodes. Replaces placeholders like "{{item}}" or "item.image" with actual data fields.
 */
function applyTemplate(templateNode: any, item: any) {
  if (!templateNode) return null;

  // Handle string values
  if (typeof templateNode === "string") {
    if (templateNode === "item") {
      return typeof item === "object" ? JSON.stringify(item) : item;
    }
    // Replace occurrences of "item.field" with the string version of that value
    return templateNode.replace(/item\.([a-zA-Z0-9_]+)/g, (_, field) => {
      const value = item[field];
      return value != null ? String(value) : "";
    });
  }

  // Handle arrays
  if (Array.isArray(templateNode)) {
    return templateNode.map((child) => applyTemplate(child, item));
  }

  // Handle objects
  if (typeof templateNode === "object") {
    const newNode = { ...templateNode };

    // If it's a text node, update its text property
    if (newNode.type === "text" && newNode.props?.text) {
      return {
        ...newNode,
        props: {
          ...newNode.props,
          text: typeof item === "object" ? JSON.stringify(item) : String(item),
        },
      };
    }

    // Recursively apply the template to props
    if (newNode.props) {
      newNode.props = Object.entries(newNode.props).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: applyTemplate(value, item),
        }),
        {}
      );
    }

    // Recursively apply the template to children
    if (Array.isArray(newNode.children)) {
      newNode.children = newNode.children.map((child) =>
        applyTemplate(child, item)
      );
    }

    return newNode;
  }

  return templateNode;
}

/** Types for Node and NodeProps (optional). */
export interface NodeProps {
  className?: string;
  title?: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  description?: string | React.ReactNode;
  image?: string;
  flip?: string | boolean;
  ctaAction?: string | React.ReactNode;
  link?: string;
  effect?: string;
  cta?: string;
  to?: string;
  content?: string[] | string;
  children?: (Node | string)[];
  style?: React.CSSProperties;
  backgroundImage?: string;
  features?: any[];
  buttons?: any[];
  [key: string]: any;
}

export interface Node {
  type: string;
  props: NodeProps;
  children?: Node[];
  source?: string; // for map nodes
  template?: Node; // for map nodes
}

interface InPlacePageRendererProps {
  nodes: Node[] | Node; // Can be array or single object
  editable?: boolean;
  onChange?: (updatedNodes: Node[] | Node) => void;
  dataSources?: Record<string, any[]>; // e.g. { patnersConfig: [...], provinceConfig: [...] }
}

/**
 * InPlacePageRenderer - Recursively renders JSON-based page layout,
 * supports path-based editing, handles "map" nodes,
 * and can deal with single node or array.
 */
export function InPlacePageRenderer({
  nodes,
  editable = false,
  onChange,
  dataSources = {},
}: InPlacePageRendererProps) {
  // Debug logging

  /**
   * Called when an editable component updates its props.
   * We do a path-based update, merging newProps into the node at that path.
   */
  const handleNodeChange = (
    path: number[],
    newProps: Partial<NodeProps> & { children?: any[] }
  ) => {
    if (!onChange) return;


    const cloned = Array.isArray(nodes)
      ? structuredClone(nodes)
      : structuredClone([nodes]);

    const updateAtPath = (nodeArray: Node[], path: number[]): boolean => {
      if (path.length === 0) return false;
      const [index, ...rest] = path;
      if (index < 0 || index >= nodeArray.length) return false;

      if (rest.length === 0) {
        // Separate children from other props
        const { children: newChildren, ...restProps } = newProps;
        nodeArray[index] = {
          ...nodeArray[index],
          // Update props normally
          props: {
            ...nodeArray[index].props,
            ...restProps,
          },
          // If children was provided, update the top-level children property
          children:
            newChildren !== undefined ? newChildren : nodeArray[index].children,
        };
        return true;
      }
      const childNode = nodeArray[index];
      if (!childNode.children) return false;
      return updateAtPath(childNode.children, rest);
    };

    updateAtPath(cloned, path);


    if (Array.isArray(nodes)) {
      onChange(cloned);
    } else {
      onChange(cloned[0]);
    }
  };

  /**
   * Recursively renders a single node, given a path array (e.g. [0,1,2]).
   */
  const renderNode = (node: Node, path: number[]): React.ReactNode => {
   

    if (!node) return null;
    if (typeof node === "string") return node;

    // Helper function to safely render children
    const renderChildren = (
      children: (Node | string)[] | undefined,
      path: number[]
    ) => {
      if (!children) return null;
      return children.map((child, i) => {
        if (typeof child === "string") return child;
        if (child && typeof child === "object" && "type" in child) {
          return renderNode(child, [...path, i]);
        }
        return renderTextContent(child);
      });
    };

    // If "map" node, iterate dataSources[node.source]
    if (node.type === "map" && node.source && node.template) {
      const data = dataSources[node.source] || [];

      return (
        <div
          key={path.join("-")}
          className="flex flex-wrap gap-4 justify-center"
        >
          {data.map((item, idx) => {
            const childNode = applyTemplate(node.template, item);
            if (editable && childNode.type === "text") {
              return (
                <EditableText
                  key={`${path.join("-")}-${idx}`}
                  text={typeof item === "string" ? item : JSON.stringify(item)}
                  onChange={(newValue) => {
                    const newData = [...data];
                    newData[idx] = newValue;
                    const newDataSources = {
                      ...dataSources,
                      [node.source]: newData,
                    };
                    onChange?.(nodes); // Just update the nodes
                  }}
                  className={childNode.props?.className}
                />
              );
            }
            return renderNode(childNode, [...path, idx]);
          })}
        </div>
      );
    }

    // Decide read-only vs. editable
    switch (node.type) {
      case "Hero":
        if (editable) {
          return (
            <EditableHero
              key={path.join("-")}
              {...(node.props as HeroProps)}
              onChange={(newProps) => handleNodeChange(path, newProps)}
              editable={true}
            />
          );
        }
        return <Hero key={path.join("-")} {...(node.props as HeroProps)} />;

      case "Footer":
        return <Footer key={path.join("-")} {...node.props} />;

      case "NewsShowcase":
        return <NewsShowcase key={path.join("-")} {...(node.props as any)} />;

      case "InfiniteMovingCardsDemo":
        return (
          <InfiniteMovingCardsDemo
            key={path.join("-")}
            {...(node.props as any)}
          />
        );

      case "OurService":
        if (editable) {
          return (
            <EditableOurService
              key={path.join("-")}
              {...node.props}
              onChange={(newProps) => handleNodeChange(path, newProps)}
            />
          );
        }
        return <OurService key={path.join("-")} {...node.props} />;

      case "Title":
        if (editable) {
          return (
            <EditableTitle
              key={path.join("-")}
              title={renderTextContent(node.props.title) || ""}
              subtitle={renderTextContent(node.props.subtitle)}
              description={node.props.description}
              className={node.props.className}
              onChange={(newProps) => handleNodeChange(path, newProps)}
            />
          );
        }
        return (
          <Title
            key={path.join("-")}
            title={renderTextContent(node.props.title) || ""}
            subtitle={renderTextContent(node.props.subtitle)}
            description={node.props.description}
            titleClassName={node.props.titleClassName}
            subtitleClassName={node.props.subtitleClassName}
            descriptionClassName={node.props.descriptionClassName}
            className={node.props.className}
          />
        );

      case "CTAWithImage":
        if (editable) {
          return (
            <EditableCTAWithImage
              key={path.join("-")}
              title={renderTextContent(node.props.title) || ""}
              subtitle={renderTextContent(node.props.subtitle)}
              description={renderTextContent(node.props.description) || ""}
              image={node.props.image || ""}
              flip={node.props.flip === "true"}
              link={node.props.link}
              desClassName={node.props.desClassName}
              ctaAction={renderTextContent(node.props.ctaAction)}
              onChange={(newProps) => handleNodeChange(path, newProps)}
              {...node.props}
            />
          );
        }
        return (
          <CTAWithImage
            key={path.join("-")}
            title={renderTextContent(node.props.title) || ""}
            subtitle={renderTextContent(node.props.subtitle)}
            description={renderTextContent(node.props.description) || ""}
            image={node.props.image || ""}
            flip={node.props.flip === "true"}
            link={node.props.link}
            desClassName={node.props.desClassName}
            ctaAction={renderTextContent(node.props.ctaAction)}
            {...node.props}
          />
        );

      case "img":
        return (
          <img
            src={node.props.src}
            alt={node.props.alt}
            className={node.props.className}
          />
        );

      case "CTADefault":
        if (editable) {
          return (
            <EditableCTADefault
              key={path.join("-")}
              {...(node.props as EditableCTADefaultProps)}
              onChange={(newProps) => handleNodeChange(path, newProps)}
            />
          );
        }
        return (
          <CTADefault
            key={path.join("-")}
            {...(node.props as EditableCTADefaultProps)}
          />
        );

      case "CardWithImage":
        if (editable) {
          return (
            <EditableCardWithImage
              key={path.join("-")}
              title={renderTextContent(node.props.title) || ""}
              description={node.props.description || ""}
              image={node.props.image || ""}
              href={node.props.href}
              onChange={(newProps) => handleNodeChange(path, newProps)}
              {...node.props}
            />
          );
        }
        return (
          <CardWithImage
            key={path.join("-")}
            title={renderTextContent(node.props.title) || ""}
            description={node.props.description || ""}
            image={node.props.image || ""}
            href={node.props.href}
            {...node.props}
          />
        );

      case "Container":
        return (
          <Container
            key={path.join("-")}
            className={node.props?.className}
            style={node.props?.style}
          >
            {renderChildren(node.children, path)}
          </Container>
        );

      case "Glass":
        return (
          <Glass
            key={path.join("-")}
            className={node.props?.className}
            style={node.props?.style}
          >
            {renderChildren(node.children, path)}
          </Glass>
        );

      case "HoverCard":
        if (editable) {
          return (
            <EditableHoverCard
              key={path.join("-")}
              title={renderTextContent(node.props.title) || ""}
              description={renderTextContent(node.props.description) || ""}
              cta={renderTextContent(node.props.cta) || ""}
              icon={renderTextContent(node.props.icon) || ""}
              onChange={(newProps) => handleNodeChange(path, newProps)}
              {...node.props}
            />
          );
        }
        return (
          <HoverCard
            key={path.join("-")}
            title={renderTextContent(node.props.title) || ""}
            description={renderTextContent(node.props.description) || ""}
            cta={renderTextContent(node.props.cta) || ""}
            icon={renderTextContent(node.props.icon) || ""}
            color={renderTextContent(node.props.color) || ""}
            {...node.props}
          />
        );

      case "OfficeCard":
        if (editable) {
          return (
            <EditableOfficeCard
              key={path.join("-")}
              country={renderTextContent(node.props.country) || ""}
              imageUrl={node.props.imageUrl || ""}
              address={renderTextContent(node.props.address) || ""}
              phone={renderTextContent(node.props.phone) || ""}
              email={renderTextContent(node.props.email) || ""}
              onChange={(newProps) => handleNodeChange(path, newProps)}
            />
          );
        }
        return (
          <OfficeCard
            key={path.join("-")}
            country={renderTextContent(node.props.country) || ""}
            imageUrl={node.props.imageUrl || ""}
            address={renderTextContent(node.props.address) || ""}
            phone={renderTextContent(node.props.phone) || ""}
            email={renderTextContent(node.props.email) || ""}
          />
        );

      case "ContactForm":
        if (editable) {
          return (
            <EditableContactForm
              key={path.join("-")}
              {...node.props}
              onChange={(newProps) => handleNodeChange(path, newProps)}
            />
          );
        }
        return <ContactForm key={path.join("-")} {...node.props} />;

      // ADD THIS SECTION CASE:
      case "section":
        if (editable) {
          return (
            <section
              key={path.join("-")}
              className={node.props?.className}
              style={node.props?.style}
            >
              {typeof node.children?.[0] === "string" ? (
                <div
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                  className="outline-none min-h-[1em]"
                  onBlur={(e) =>
                    handleNodeChange(path, {
                      children: [e.currentTarget.textContent || ""],
                    })
                  }
                >
                  {node.children[0]}
                </div>
              ) : (
                node.children?.map((child, i) =>
                  renderNode(child, [...path, i])
                )
              )}
            </section>
          );
        }
        // Non-editable:
        return (
          <section
            key={path.join("-")}
            className={node.props?.className}
            style={node.props?.style}
          >
            {node.children?.map((child, i) => renderNode(child, [...path, i]))}
          </section>
        );

      case "div":
        if (editable) {
          return (
            <div
              key={path.join("-")}
              className={node.props?.className}
              style={node.props?.style}
            >
              {typeof node.children?.[0] === "string" ? (
                <div
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                  className="outline-none min-h-[1em]"
                  onBlur={(e) =>
                    handleNodeChange(path, {
                      children: [e.currentTarget.textContent || ""],
                    })
                  }
                >
                  {node.children[0]}
                </div>
              ) : (
                renderChildren(node.children, path)
              )}
            </div>
          );
        }
        return (
          <div
            key={path.join("-")}
            className={node.props?.className}
            style={node.props?.style}
          >
            {renderChildren(node.children, path)}
          </div>
        );

      case "TitleWithDoubleBorder":
        if (editable) {
          return (
            <EditableTitleWithDoubleBorder
              key={path.join("-")}
              {...node.props}
              onChange={(newText) =>
                handleNodeChange(path, { children: [newText] })
              }
            >
              {node.children?.[0] || ""}
            </EditableTitleWithDoubleBorder>
          );
        }
        return (
          <TitleWithDoubleBorder key={path.join("-")} {...node.props}>
            {node.children?.[0] || ""}
          </TitleWithDoubleBorder>
        );

      case "TitleWithBottomBorder":
        if (editable) {
          return (
            <EditableTitleWithBottomBorder
              key={path.join("-")}
              {...node.props}
              onChange={(newText) =>
                handleNodeChange(path, { children: [newText] })
              }
            >
              {node.children?.[0] || ""}
            </EditableTitleWithBottomBorder>
          );
        }
        return (
          <TitleWithBottomBorder key={path.join("-")} {...node.props}>
            {node.children?.[0] || ""}
          </TitleWithBottomBorder>
        );

      case "Icon":
        return (
          <Icon
            key={path.join("-")}
            icon={node.props.icon}
            className={node.props.className}
            style={node.props.style}
          />
        );

      case "p":
        if (editable) {
          const content = node.children?.[0];
          const textContent =
            typeof content === "string"
              ? content
              : typeof content === "object" && content?.props?.text
              ? content.props.text
              : "";

          return (
            <div
              key={path.join("-")}
              className={cn("text-base outline-none", node.props?.className)}
              contentEditable={true}
              suppressContentEditableWarning={true}
              onBlur={(e) =>
                handleNodeChange(path, {
                  children: [e.currentTarget.textContent || ""],
                })
              }
            >
              {textContent}
            </div>
          );
        }
        return (
          <p
            key={path.join("-")}
            className={node.props?.className}
            style={node.props?.style}
          >
            {renderChildren(node.children, path)}
          </p>
        );

      case "ul":
        if (editable) {
          return (
            <ul
              key={path.join("-")}
              className={cn(
                "list-disc list-inside space-y-2",
                node.props?.className
              )}
            >
              {renderChildren(node.children, path)}
            </ul>
          );
        }
        return (
          <ul
            key={path.join("-")}
            className={node.props?.className}
            style={node.props?.style}
          >
            {renderChildren(node.children, path)}
          </ul>
        );

      case "li":
        if (editable) {
          return (
            <li
              key={path.join("-")}
              className={cn("my-1 outline-none", node.props?.className)}
            >
              {renderChildren(node.children, path)}
            </li>
          );
        }
        return (
          <li
            key={path.join("-")}
            className={node.props?.className}
            style={node.props?.style}
          >
            {renderChildren(node.children, path)}
          </li>
        );

      case "text":
        return node.props?.text || "";

      case "UL":
        return (
          <UL key={path.join("-")} {...node.props}>
            {node.children?.map((child, i) => renderNode(child, [...path, i]))}
          </UL>
        );

      case "HeroDefault":
        if (editable) {
          return (
            <EditableHeroDefault
              key={path.join("-")}
              {...node.props}
              onChange={(newProps) => handleNodeChange(path, newProps)}
              editable={true}
            />
          );
        }
        return <HeroDefault key={path.join("-")} {...node.props} />;

      case "List":
        return (
          <List key={path.join("-")} {...node.props}>
            {node.children?.map((child, i) => renderNode(child, [...path, i]))}
          </List>
        );

      case "Link":
        if (editable) {
          return (
            <div key={path.join("-")} className={node.props?.className}>
              {/* Input field for editing the link URL */}
              <input
                type="text"
                value={node.props.link || ""}
                onChange={(e) =>
                  handleNodeChange(path, { link: e.target.value })
                }
                placeholder="Edit link URL"
                className="mb-2 p-1 border rounded"
              />
              {/* Editable content for the link text */}
              <div
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => {
                  // Save the updated content as children
                  const newText = e.currentTarget.innerText;
                  handleNodeChange(path, { children: [newText] });
                }}
                onClick={(e) => e.stopPropagation()}
                style={{ cursor: "text" }}
              >
                {renderChildren(node.children, path)}
              </div>
            </div>
          );
        }
        return (
          <Link key={path.join("-")} {...node.props}>
            {renderChildren(node.children, path)}
          </Link>
        );

      case "iframe":
        return <iframe key={path.join("-")} {...node.props} />;

      case "faq":
        if (editable) {
          return (
            <EditableFAQ
              key={path.join("-")}
              items={node.props.faq}
              onChange={(newProps) => handleNodeChange(path, newProps)}
            />
          );
        }
        return <FAQ key={path.join("-")} items={node.props.faq} />;

      case "span":
        if (editable) {
          const content = node.children?.[0];
          const textContent =
            typeof content === "string"
              ? content
              : typeof content === "object" && content?.props?.text
              ? content.props.text
              : "";

          return (
            <span
              key={path.join("-")}
              className={cn("outline-none", node.props?.className)}
              contentEditable={true}
              suppressContentEditableWarning={true}
              onBlur={(e) =>
                handleNodeChange(path, {
                  children: [e.currentTarget.textContent || ""],
                })
              }
              style={node.props?.style}
            >
              {textContent}
            </span>
          );
        }
        return (
          <span key={path.join("-")} {...node.props}>
            {renderChildren(node.children, path)}
          </span>
        );

      case "h3":
        if (editable) {
          const content = node.children?.[0];
          const textContent =
            typeof content === "string"
              ? content
              : typeof content === "object" && content?.props?.text
              ? content.props.text
              : "";

          return (
            <h3
              key={path.join("-")}
              className={cn("outline-none", node.props?.className)}
              contentEditable={true}
              suppressContentEditableWarning={true}
              onBlur={(e) =>
                handleNodeChange(path, {
                  children: [e.currentTarget.textContent || ""],
                })
              }
              style={node.props?.style}
            >
              {textContent}
            </h3>
          );
        }
        return (
          <h3 key={path.join("-")} {...node.props}>
            {renderChildren(node.children, path)}
          </h3>
        );

      case "TreeList":
        if (editable) {
          return (
            <div key={path.join("-")} className="space-y-4 px-12">
              {(node.props.list || []).map((item: any, index: number) => (
                <EditableTreeView
                  key={index}
                  title={item.title}
                  description={item.description}
                  isLast={index === (node.props.list || []).length - 1}
                  onChange={(newProps) => {
                    const newList = [...(node.props.list || [])];
                    newList[index] = { ...newList[index], ...newProps };
                    handleNodeChange(path, { list: newList });
                  }}
                />
              ))}
            </div>
          );
        }
        return (
          <div key={path.join("-")} className="space-y-4 px-12">
            <TreeViewList list={node.props.list} />
          </div>
        );

      case "h4":
        if (editable) {
          const content = node.children?.[0];
          const textContent =
            typeof content === "string"
              ? content
              : typeof content === "object" && content?.props?.text
              ? content.props.text
              : "";

          return (
            <h4
              key={path.join("-")}
              className={cn("outline-none", node.props?.className)}
              contentEditable={true}
              suppressContentEditableWarning={true}
              onBlur={(e) =>
                handleNodeChange(path, {
                  children: [e.currentTarget.textContent || ""],
                })
              }
              style={node.props?.style}
            >
              {textContent}
            </h4>
          );
        }
        return (
          <h4 key={path.join("-")} {...node.props}>
            {renderChildren(node.children, path)}
          </h4>
        );

      case "ServicesCard":
        if (editable) {
          return (
            <EditableServicesCard
              key={path.join("-")}
              {...node.props}
              onUpdate={(newProps) => handleNodeChange(path, newProps)}
            />
          );
        }
        return <ServicesCard key={path.join("-")} {...node.props} />;

      case "Feature":
        if (editable) {
          return (
            <FeatureEditor
              key={path.join("-")}
              {...node.props}
              onUpdate={(newProps) => handleNodeChange(path, newProps)}
            />
          );
        }
        return <Feature key={path.join("-")} {...node.props} />;

      case "Table":
        return (
          <Table key={path.join("-")} {...node.props}>
            {node.children?.map((child, i) => renderNode(child, [...path, i]))}
          </Table>
        );

      case "TableCell":
        return (
          <TableCell key={path.join("-")} {...node.props}>
            {node.children?.map((child, i) => renderNode(child, [...path, i]))}
          </TableCell>
        );

      case "TableHead":
        return (
          <TableHead key={path.join("-")} {...node.props}>
            {node.children?.map((child, i) => renderNode(child, [...path, i]))}
          </TableHead>
        );

      case "TableHeader":
        return (
          <TableHeader key={path.join("-")} {...node.props}>
            {node.children?.map((child, i) => renderNode(child, [...path, i]))}
          </TableHeader>
        );

      case "TableRow":
        return (
          <TableRow key={path.join("-")} {...node.props}>
            {node.children?.map((child, i) => renderNode(child, [...path, i]))}
          </TableRow>
        );

      case "TableBody":
        return (
          <TableBody key={path.join("-")} {...node.props}>
            {node.children?.map((child, i) => renderNode(child, [...path, i]))}
          </TableBody>
        );

      default:
        console.warn(`Unknown component type: ${node.type}`);
        return null;
    }
  };

  // If "nodes" is an array, map over it. If it's a single node, just render that node.
  if (Array.isArray(nodes)) {
    return <>{nodes.map((node, i) => renderNode(node, [i]))}</>;
  } else {
    return <>{renderNode(nodes, [0])}</>;
  }
}

// Update the renderTextContent function
const renderTextContent = (content: any): string => {
  if (typeof content === "string") return content;
  if (content?.props?.text) return content.props.text;
  if (content?.children?.[0]) return renderTextContent(content.children[0]);
  return "";
};
