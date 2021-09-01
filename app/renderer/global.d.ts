declare module '*.less' {
  const less: { [key: string]: string };
  export default less;
}

declare module '*.jpg' {
  const jpg: string;
  export default jpg;
}