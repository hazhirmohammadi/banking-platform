"use server";

import {
  createAdminClient,
  createSessionClient,
} from "@/lib/appwtire";
import { ID } from "node-appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { parseStringify } from "@/lib/utils";
import {
  CountryCode,
  Products,
} from "plaid";
import { plaidClient } from "@/lib/Plaid";

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

export const logoutAccount = async () => {
  try {
    const { account } = await createSessionClient();
    cookies().delete("appwrite-session");
    await account.deleteSession("current");
  } catch (error) {
    return null;
  }
};

export const createLinkToken = async (user: User) => {
  try {
    const tokenParams = {
      user: {
        client_user_id: user.$id,
      },
      client_name: user.name,
      products: ["auth"] as Products[],
      language: "en",
      country_codes: ["US"] as CountryCode[],
    };

    const response = await plaidClient.linkTokenCreate(tokenParams);

    return parseStringify({ linkToken: response.data.link_token });
  } catch (error) {
    console.log(error);
  }
};

export const exchangePublicToken = async ({ publicToken, user }: exchangePublicTokenProps) => {
  try {
  
  }catch (error) {
    console.log("An error occurred while creating exchanging token:",error);
  }
};