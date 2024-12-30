export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'assistant';
  time?: string;
  assistantName?: string;
}