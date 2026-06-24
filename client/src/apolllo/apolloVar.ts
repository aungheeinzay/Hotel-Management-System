import {makeVar} from "@apollo/client";
import type {User} from "@/lib/type.ts";

export const isAuthenticatedVar = makeVar(false)
export const userInfoVar = makeVar<Partial<User> | null>(null)
export const loadingVar = makeVar(true)

