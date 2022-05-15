declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_KEY: string;
    }
  }
}

export {}
