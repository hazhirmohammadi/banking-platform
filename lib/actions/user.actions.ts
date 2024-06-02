"use server";

import {
  createAdminClient,
  createSessionClient,
} from "@/lib/appwtire";
import { ID } from "node-appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { parseStringify } from "@/lib/utils";

export const signIn = async ({ email, password }: signInProps) => {
  try {
    const { account } = await createAdminClient();

    const respponse = await account.createEmailPasswordSession(email, password);
    return parseStringify(respponse);
  } catch (error) {
    console.error("Error", error);
  }
};

export const signUp = async ({ ...userData }: SignUpParams) => {
  const { email, password, firstName, lastName } = userData;
  try {
    const { account } = await createAdminClient();

    const newUserAccount = await account.create(ID.unique(),
     //@ts-ignore
     email,
     password,
     `${firstName} ${lastName}`,
    );
//@ts-ignore
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    redirect("/account");

    return parseStringify(newUserAccount);


  } catch (error) {
    console.error("Error", error);
  }


};

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    return parseStringify(user);
  } catch (error) {
    return null;
  }
}
