import { JWTPayloadSpec } from "@elysiajs/jwt";

export type jwtType = {
  readonly sign: (morePayload: Record<string, string | number> & JWTPayloadSpec) => Promise<string>;
  readonly verify: (jwt?: string) => Promise<(Record<string, string | number> & JWTPayloadSpec) | false>
}