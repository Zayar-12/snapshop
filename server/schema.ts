import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/postgres-js"; // သို့မဟုတ် မင်းသုံးနေတဲ့ driver
import type { AdapterAccount } from "next-auth/adapters";
import { createId } from "@paralleldrive/cuid2";

export const RoleEnum=pgEnum("roles",['user','admin'])
// ၁။ Users Table (လူတစ်ယောက်ချင်းစီရဲ့ အချက်အလက်)
export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),//today notion
  name: text("name"),
  email: text("email").unique(),
  password:text("password"),//today notion
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  isTwoFactorEnabled:boolean('isTwoFactorEnabled').default(false),
  role:RoleEnum("roles").default("user")
});

// ၂။ Accounts Table (Google သို့မဟုတ် GitHub နဲ့ ချိတ်ဆက်တဲ့ အချက်အလက်)
export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);



export const emailVerificationToken = pgTable(
  "email_verification_token",
  {
    id: text("id")
      .notNull()
      .$defaultFn(() => createId()), //today notion
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
    email: text("email").notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.id, vt.token] }), // today notion( store 2 rows per time, cons=>more space,pros=>fast retrieving time ), the primary key is id+token
  })
);