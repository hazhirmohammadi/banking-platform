import React from "react";
import HeaderBox from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import RightSidebar from "@/components/RightSidebar";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const Home =async () => {

 const loggedIn =await getLoggedInUser();

 return (
  <section className="home">
   <div className="home-content">
    <header className="home-header">
     <HeaderBox
      type="greeting"
      title="Welcome"
      user={loggedIn?.name || "Guest"}
      subtext="Access and manage your account and transaction efficiently."
     />

     <TotalBalanceBox
      accounts={[]}
      totalBanks={1}
      totalCurrentBalance={1250.35}
     />
    </header>
    RECENT TRANSACTIONS
   </div>

   <RightSidebar
    // @ts-ignore
    user={loggedIn}
    transactions={[]}
    // @ts-ignore
    banks={[{currentBalance:123.60},{currentBalance:500.92}]}
   />

  </section>
 );
};

export default Home;
