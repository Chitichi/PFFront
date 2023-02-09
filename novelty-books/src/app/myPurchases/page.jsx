import dynamic from "next/dynamic";

const Purchases = dynamic(()=>import("@/components/Purchases"),{ssr:false})



const myOrders = async () => {
        try {
          const res = await fetch(process.env.RUTA_BACK+"/orders", {
              method: "GET",
              body: JSON.stringify(),
              headers: {
                  "Content-Type": "application/json",
                },
                cache:'no-store',
            });
       
            const data = await res.json();
            
            return data
          } catch (err) { 
            console.log(err)
          }
        }
        async function MyPurchases() {
          const orders = await myOrders()
          
            return(
                  <Purchases orders= {orders}/>
            )
}
    

export default MyPurchases;
