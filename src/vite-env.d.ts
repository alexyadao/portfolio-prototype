/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string;
  readonly NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?: string;
    readonly VITE_WEB3FORMS_ACCESS_KEY?: string;
  }
}
