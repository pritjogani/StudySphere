import { useAuth } from "../store/auth";

export const About = () => {
  const {user} = useAuth();
    return <>
       
    <main>
      <section className="section-hero">
        <div className="container grid grid-two-cols">
          <div className="hero-content">
            <p>welcome {user ?`${user.username} to our website` : `to our website`}</p>
            <h1>why choose us?</h1>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, doloribus possimus temporibus suscipit recusandae delectus sit architecto quisquam cum eveniet non. Numquam facilis voluptas perferendis qui est ea corporis soluta.

              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis laborum recusandae ea cum similique voluptas fuga facere sed illo maxime! Esse quaerat at quisquam, exercitationem error modi? A, dignissimos officia?
            </p>
          </div>
        </div>
      </section>
    </main>
  

    </>
};
// export default About;