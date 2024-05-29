"use server";

import {
  createAdminClient,
  createSessionClient,
} from "@/lib/appwtire";
import { ID } from "node-appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { parseStringify } from "@/lib/utils";

export const signIn = async () => {
  console.log(11);
  try {

  } catch (error) {
    console.error("Error", error);
  }
};

export const signUp = async ({ ...userData }: SignUpParams) => {
  const { email, password, firstName, lastName } = userData;
  try {
    const { account } = await createAdminClient();

    const newUserAccount = await account.create(ID.unique(),
     email,
     password,
     `${firstName} ${lastName}`,
    );

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
    return await account.get();
  } catch (error) {
    return null;
  }
}
