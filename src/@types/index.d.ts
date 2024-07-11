export interface backendChat {
  role: "user" | "assistant" | "system",
  content: string
}

export interface frontendChat {
  direction: "incoming" | "outgoing",
  message: string,
  avaterName: string,
  avaterSrc?: string
}

export interface backendResponse {
  content: string
}