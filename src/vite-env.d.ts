/// <reference types="vite/client" />
declare const VITE_FIREBASE_API_KEY: string;
declare const VITE_FIREBASE_AUTH_DOMAIN: string;
declare const VITE_FIREBASE_PROJECT_ID: string;
declare const VITE_FIREBASE_STORAGE_BUCKET: string;
declare const VITE_FIREBASE_MESSAGE_SENDER_ID: string;
declare const VITE_FIREBASE_APP_ID: string;

interface ImportMetaEnv {
    readonly VITE_FIREBASE_API_KEY: string;
    readonly VITE_FIREBASE_AUTH_DOMAIN: string;
    readonly VITE_FIREBASE_PROJECT_ID: string;
    readonly VITE_FIREBASE_STORAGE_BUCKET: string;
    readonly VITE_FIREBASE_MESSAGE_SENDER_ID: string;
    readonly VITE_FIREBASE_APP_ID: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
