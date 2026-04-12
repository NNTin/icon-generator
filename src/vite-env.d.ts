/// <reference types="vite/client" />

declare module 'to-ico' {
  function toIco(
    input: ArrayBuffer[] | Buffer[],
    options?: { resize?: boolean; sizes?: number[] }
  ): Promise<Buffer>;
  export default toIco;
}
