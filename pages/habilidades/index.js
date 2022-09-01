import Spline from "@splinetool/react-spline";
import ArrowRigth from "../../components/Icons/ArrowRigth";
import ArrowLeft from "../../components/Icons/ArrowLeft";
import useEmblaCarousel from "embla-carousel-react";
import { useState, useEffect, useCallback } from "react";
import Button from "../../components/Button";
import Head from "next/head";

export default function HablidadesPage(props) {
  const [viewportRef, embla] = useEmblaCarousel({
    loop: true,
  });
  const [visible, setVisible] = useState(false);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const { skills } = props;
  const { slides } = skills;

  const handleClick = () => {
    setVisible(!visible);
  };

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
  const scrollTo = useCallback(
    (index) => embla && embla.scrollTo(index),
    [embla]
  );

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    setScrollSnaps(embla.scrollSnapList());
    embla.on("select", onSelect);
  }, [embla, setScrollSnaps, onSelect]);

  return (
    <>
      <Head>
        <title>{skills.metaTitle}</title>
        <meta
          name="description"
          content="Manejo react, next.js, javascript, "
        />
        <meta
          name="keywords"
          content="Front end developer en ecuador, react developer, next.js"
        />
        <meta name="author" content="Katriel Martínez" />
      </Head>
      <main>
        <div className="embla" ref={viewportRef}>
          <div className="embla__container">
            <div className="embla__slide first__slide">
              <h1 onClick={scrollNext}>{skills.title}</h1>
              <Spline scene="https://draft.spline.design/GoSeNf2PT-UU9sH6/scene.splinecode" />
            </div>
            {slides.map((slide) => (
              <div className="embla__slide" key={slide.model}>
                <div className="spline__slide">
                  <Spline scene={slide.model} />
                </div>
                <div className="content">
                  <div className="info">
                    <a
                      href={slide.href}
                      target="_blank"
                      rel="noreferrer"
                      title={`${slide.title} docs`}
                    >
                      <h2>{slide.title}</h2>
                    </a>
                  </div>
                  <div className="buttons">
                    <Button darkMode onClick={handleClick}>
                      {skills.projects}
                    </Button>
                    <Button
                      darkMode
                      href={slide.href}
                      target="_blank"
                      title={`${slide.title} docs`}
                    >
                      Docs
                    </Button>
                  </div>
                  <ul>
                    {visible &&
                      slide.projectsList.map((project) => (
                        <li key={project.title}>
                          <a
                            href={project.href}
                            target="_blank"
                            rel="noreferrer"
                            title={project.title}
                            className="project__a"
                          >
                            {project.title}
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="embla__dots">
          <button
            className="btn btn-prev"
            onClick={scrollPrev}
            enabled={prevBtnEnabled}
          >
            <ArrowLeft />
          </button>
          {scrollSnaps.map((_, index) => (
            <button
              className={`dot ${index === selectedIndex && "selected"}`}
              key={index}
              onClick={() => scrollTo(index)}
            ></button>
          ))}
          <button
            className="btn btn-next"
            onClick={scrollNext}
            enabled={nextBtnEnabled}
          >
            <ArrowRigth />
          </button>
        </div>
      </main>

      <style jsx>{`
        main {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          color: #f8f8ff;
          background: #000;
        }
        h1 {
          position: absolute;
          text-align: center;
          writing-mode: vertical-lr;
          transform: rotate(180deg);
          left: 13%;
          font-size: 60px;
          mix-blend-mode: difference;
          transition: all 0.3s;
        }
        h2 {
          text-align: center;
          font-size: 40px;
          transition: all 0.3s;
        }
        h1:hover,
        h2:hover {
          color: transparent;
          -webkit-text-stroke: 1px #f8f8ff;
        }

        .content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 15px;
        }
        .buttons {
          display: flex;
          gap: 15px;
        }
        .btn {
          mix-blend-mode: difference;
          color: #f8f8ff;
          background: transparent;
          border: 0;
          user-select: none;
          transform: translateY(4px);
        }
        li {
          list-style: none;
          font-size: small;
        }
        .project__a {
          text-decoration: underline;
        }
        .embla {
          height: 100vh;
          width: 100vw;
          overflow: hidden;
        }
        .embla__container {
          display: flex;
          height: 100vh;
        }
        .embla__slide {
          display: grid;
          align-items: center;
          justify-content: center;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr;
          flex: 0 0 100%;
          text-align: center;
        }
        .first__slide {
          grid-template-columns: 1fr;
        }
        .spline__slide {
          width: 100%;
          height: 100%;
        }
        .dot {
          background: #fff;
          border-radius: 50%;
          mix-blend-mode: difference;
          padding: 5px;
          border: 0;
          transition: all 0.5s;
        }
        .dot:hover {
          background: transparent;
          border: 1px solid #f8f8ff;
        }
        .selected {
          background: transparent;
          border: 1px solid #f8f8ff;
        }
        .embla__dots {
          width: 100%;
          display: flex;
          justify-content: space-around;
          align-items: center;
          position: absolute;
          bottom: 30px;
        }
        @media only screen and (max-width: 600px) {
          .embla__slide {
            display: flex;
            flex-direction: column;
          }
          .spline__slide {
            width: 100%;
            height: 50vh;
          }
        }
      `}</style>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const response = await import(`../../lang/${locale}.json`);

  return {
    props: {
      skills: response.default.skills,
    },
  };
}
