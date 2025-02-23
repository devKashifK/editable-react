import React from "react";
import TreeView from "./tree-view";

interface TreeViewItem {
  title: string;
  description?: string;
}

interface TreeViewListProps {
  list: TreeViewItem[];
}

export default function TreeViewList({ list }: TreeViewListProps) {
  return (
    <div className="space-y-4 px-12">
      {list.map((item, index) => (
        <TreeView
          key={index}
          title={item.title}
          description={item.description}
          isLast={index === list.length - 1}
        />
      ))}
    </div>
  );
}
