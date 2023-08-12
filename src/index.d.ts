// prevent: Module '"*.svg"' has no exported member 'ReactComponent'. Did you mean to use 'import ReactComponent from "*.svg"'
declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}