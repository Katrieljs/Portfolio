import Spline from "@splinetool/react-spline";
import Proyecto from "../../components/proyecto";
import useEmblaCarousel from "embla-carousel-react";
import ArrowRigth from "../../components/Icons/ArrowRigth";
import ArrowLeft from "../../components/Icons/ArrowLeft";
import { useState, useEffect, useCallback } from "react";
import Head from "next/head";

export default function ProyectosPage(props) {
  const { projects } = props;
  const { projectsList } = projects;

  const [viewportRef, embla] = useEmblaCarousel({
    loop: true,
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

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
        <title>{projects.metaTitle}</title>
        <meta
          name="description"
          content="Mis proyectos con Next.js, React, firebase y spline"
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
              <h1 onClick={scrollNext}>{projects.title}</h1>
              <Spline scene="https://prod.spline.design/wrlxvqwEoDpngVK7/scene.splinecode" />
            </div>
            {projectsList.map((project) => (
              <div className="embla__slide" key={project.title}>
                <Proyecto
                  title={project.title}
                  description={project.description}
                  urlView={project.urlWeb}
                  urlRepo={project.urlRepo}
                />
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
          width: 100vw;
          height: 100vh;
          background: #cccffb;
        }
        h1 {
          position: absolute;
          text-align: center;
          writing-mode: vertical-lr;
          transform: rotate(180deg);
          left: 13%;
          font-size: 60px;
          -webkit-text-stroke: 1px #121316;
          color: transparent;
          transition: all 0.3s;
        }
        h1:hover {
          color: #121316;
        }
        .embla {
          height: 100vh;
          width: 100vw;
          overflow: hidden;
        }
        .embla__container {
          display: flex;
        }
        .embla__slide {
          display: grid;
          place-items: center;
          height: 100vh;
          flex: 0 0 100%;
          text-align: center;
        }
        .first__slide {
          grid-template-columns: 1fr;
        }
        .spline__slide {
          width: 100vw;
          height: 100vh;
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
          bottom: 20px;
        }
        .btn {
          mix-blend-mode: difference;
          color: #f8f8ff;
          background: transparent;
          border: 0;
          user-select: none;
          transform: translateY(4px);
        }
      `}</style>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const response = await import(`../../lang/${locale}.json`);

  return {
    props: {
      projects: response.default.projects,
    },
  };
}
