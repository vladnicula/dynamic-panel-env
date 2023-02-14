import * as React from "react";
const { useState } = React;

interface DynamicPanelItemProps {
  children: React.ReactNode;
  pathKey: string;
  control: unknown;
}

export const DynamicPanelItem = (props: DynamicPanelItemProps) => {
  return <div>{props.children}</div>;
};

interface DynamicPanelProps {
  getViewForPath: (path: string[], contorl: unknown) => ReactNode;
}

export const DynamicPanel = (props: DynamicPanelProps) => {
  const [currentPath, changeCurrentPath] = useState([]);

  const rootContent = props.getViewForPath([], null);

  return <div>{rootContent}</div>;
};
