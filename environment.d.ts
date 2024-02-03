export {}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            RPC_URL: string
            CHANNEL_ID_MIN: number
            CHANNEL_ID_MAX: number
        }
    }
}
