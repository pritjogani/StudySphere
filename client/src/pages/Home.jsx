export const Home = () => {
  return (
    <>
      <main>
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              <p>we are the world best it company</p>
              <h1>welcome to prit jogani</h1>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas
                maiores, deleniti consectetur maxime quasi rerum sit temporibus
                qui aut quam. Beatae quod doloribus placeat reiciendis non
                architecto enim facere est.
              </p>
              
              <div className="btn btn-group">
                <a href="/contact">
                  <button className="btn">connect now</button>
                </a>

                <a href="/services">
                  <button className="btn secondary-btn">learn more</button>
                </a>
               </div>
               </div>
              <div className="hero-img">
                <img  src="./images/readingg.png" alt="writing img herre" />
              </div>
            </div>
        
        </section>
      </main>
    </>
  );
};
