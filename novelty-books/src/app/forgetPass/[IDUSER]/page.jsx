import ForgetPassword from "@/components/ForgetPassword";


const fetchUser = (id) => {
    return fetch(process.env.RUTA_BACK+`/users/${id}`)
      .then(res => res.json())
};

async function ForgetPass({params}) {
    const {IDUSER} = params;

    const userFetch = await fetchUser(IDUSER);
          
    return(

        <ForgetPassword userFetch = {userFetch}/>
           
    );
};
    

export default ForgetPass;