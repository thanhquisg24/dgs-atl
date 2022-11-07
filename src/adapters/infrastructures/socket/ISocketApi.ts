export interface ISocketApi {
  connect(): Promise<ISocketApi>;
  disconnect(): void;
  emit(message: string, channel: string): void;
  onMessage(channel: string, callback: any): void;
}
