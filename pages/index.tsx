import { ConnectWallet, MediaRenderer, useActiveListings, useContract } from "@thirdweb-dev/react";
import { BigNumber } from "ethers";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const {contract} = useContract('0x9A4b0717233E6528e4bEf7B77921D581b27eF807','marketplace')

  const { data: nfts, isLoading} = useActiveListings(contract);
  return (
 
    <div className={styles.container}>
      <main className={styles.main}>
        <ConnectWallet />
         {!isLoading ? (
           <div>
             { nfts && nfts.map((nft) => {
                 return (
       
                  <div>
                    <MediaRenderer
                     src={nft.asset.image}
                     height="200px"
                     width="200px" />
                   <p>{nft.asset.name}</p>
                   <p>Price :{nft.buyoutCurrencyValuePerToken.displayValue}MATIC</p>
                   <button onClick={async () => {
                     try{
                       await contract?.buyoutListing(BigNumber.from(nft.id), 1);
                     }catch (error){
                      console.error(error);
                      alert(error);

                     }
                   }
                  }>Buy Now</button>
                    </div>
                 );

             })}
           </div>
          ) : (
            <div>Loading...</div>
         )}
      </main>
    </div>
  );
};

export default Home;
