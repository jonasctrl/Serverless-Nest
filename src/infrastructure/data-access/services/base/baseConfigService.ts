export abstract class BaseConfigService {
  public abstract get(value: string): string | undefined;
}
