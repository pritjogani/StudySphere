import { useAuth } from "../store/auth";

export const Service = () =>{
    const {service} = useAuth()
    return (
        <section className="section-services">
        <div className="container ">
            <h1 className="main-heading">Services</h1>

        </div>
        <div className="container grid grid-cols-3">
        {
            service.map((curElem,index) => {
const {service,description,price,provider} = curElem;
return(
          
            <div className="card " key={index}>
                <div className="card-img">
                    <img src="/images/study.png" alt="" width="300" />
                </div>
    <div className="card-details">
        <div className="grid grid-cols-2">
        <div>
        <p>{provider}</p>
        <p>{price}</p>
        </div>
        <div>
            <h2>
        {service}
            </h2>
            <p>{description}</p>
        </div>
            

        </div> 

    </div>

            </div>
            )   })}
            
        </div>

        </section>
    )
};

