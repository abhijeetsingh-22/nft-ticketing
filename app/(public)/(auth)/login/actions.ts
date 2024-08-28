"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import { ResultCode } from "@/lib/utils";
import { DEFAULT_LOGIN_REDIRECT, Routes } from "@/routes";

interface Result {
  type: string;
  resultCode: ResultCode;
}

export async function authenticate(
  email: string,
  password: string
): Promise<Result | undefined> {
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirectTo: Routes.ONBOARDING,
    });

    console.log("result in action", result);

    return {
      type: "success",
      resultCode: ResultCode.UserLoggedIn,
    };
  }
  catch (error) {
    throw error;
  }
}
