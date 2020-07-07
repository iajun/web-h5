// Copyright 2020 9AM Software. All rights reserved.
// Distribution of this file is strictly prohibited.

interface StyleType {
  [key: string]: string;
}

declare module '*.css?modules' {
  const style: StyleType;
  export default style;
}
declare module '*.scss?modules' {
  const style: StyleType;
  export default style;
}
declare module '*.sass?modules' {
  const style: StyleType;
  export default style;
}
declare module '*.less?modules' {
  const style: StyleType;
  export default style;
}

declare module '*.styl?modules' {
  const style: StyleType;
  export default style;
}
declare module '*.stylus?modules' {
  const style: StyleType;
  export default style;
}
