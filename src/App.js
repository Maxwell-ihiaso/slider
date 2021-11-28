import React, { useState, useEffect } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { FaQuoteRight } from "react-icons/fa";
import data from "./data";
function App() {
  const [index, setIndex] = useState(0);
  const [people, _] = useState(data);

  // Dynamically watch the value of index state and adjust the value
  // based on the upper and lower limit of the people Array. This will
  // pervent getting an indices outside the available ones
  useEffect(() => {
    const lastPersonIndex = data.length - 1;
    if (index < 0) {
      setIndex(lastPersonIndex);
    }
    if (index > lastPersonIndex) {
      setIndex(0);
    }
  }, [index, people]);

  // setup an setInterval that changes the index and automatically
  // set the activeSlide
  useEffect(() => {
    let autoSlide = setInterval(() => setIndex(index + 1), 3000);
    return () => clearInterval(autoSlide); // clear side effect to avoid setting multiple intervals in click re-renderin
  }, [index]);

  return (
    <main>
      <section className="section">
        <header className="title">
          <h2>
            <span>/</span>reviews
          </h2>
        </header>
        <div className="section-center">
          {people.map((person, personIndex) => {
            const { image, name, title, quote, id } = person;

            // all person get the lastSlide to position them to the right and enable a slide in from the right
            let position = "nextSlide";
            // set up active slide by changing the value of the index number
            if (personIndex === index) {
              position = "activeSlide";
            }

            // move the active slide to the left by setting the lastSlide class
            // also, move the last person to the left when index is zero for a smooth
            // leftward slide
            if (
              personIndex === index - 1 ||
              (index === 0 && personIndex === data.length - 1)
            ) {
              position = "lastSlide";
            }

            return (
              <article key={id} className={position}>
                <img src={image} alt={name} className="person-img" />
                <h4>{name}</h4>
                <p className="title">{title}</p>
                <p className="text">{quote}</p>
                <div className="icon">
                  <FaQuoteRight />
                </div>
              </article>
            );
          })}

          <button className="prev" onClick={() => setIndex(index - 1)}>
            <FiChevronLeft />
          </button>
          <button className="next" onClick={() => setIndex(index + 1)}>
            <FiChevronRight />
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;
