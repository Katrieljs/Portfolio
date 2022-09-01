import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ArrowRigth from "../../components/Icons/ArrowRigth";
import ArrowLeft from "../../components/Icons/ArrowLeft";
import Spline from "@splinetool/react-spline";
import Button from "../../components/Button";
import Head from "next/head";

export default function AboutPage(props) {
  const { about } = props;

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
        <title>{about.metaTitle}</title>
        <meta
          name="description"
          content="Soy Katriel Martínez, front end developer, tengo 15 años, me encanta el desarrollo de producto, el diseño, modelar en 3D y los panqueques :3.
          Mi Linkedin: Katriel Martínez Jacho
          "
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
            <div className="embla__slide">
              <h1 onClick={scrollNext}>{about.title}</h1>
              <div className="buttons">
                <Button
                  href="/portfolio.pdf"
                  target="_blank"
                  title="Curriculum Katriel Martínez"
                >
                  Cv
                </Button>
                <Button
                  href="https://www.linkedin.com/in/katriel-martínez-web-developer/"
                  target="_blank"
                  padding="10px 28px"
                  title="Linkedin Katriel Martínez"
                >
                  In
                </Button>
                <Button
                  href={`https://wa.me/593967187314?text=${about.messageTelf}`}
                  target="_blank"
                  title={about.telf}
                  padding="10px 22px"
                >
                  Telf
                </Button>
              </div>
              <Spline scene="https://draft.spline.design/0oCsxqh4tWFiOCmT/scene.splinecode" />
            </div>
            <div className="embla__slide">
              <Spline scene="https://draft.spline.design/ZQ8sCIFDtYkZpiBe/scene.splinecode" />
              <h2 onClick={scrollNext}>{about.slide_1}</h2>
              <p>{about.content}</p>
            </div>
          </div>
          <div className="embla__dots">
            <button
              className="btn btn-prev"
              onClick={scrollPrev}
              enabled={prevBtnEnabled}
            >
              <ArrowLeft color="#121316" />
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
              <ArrowRigth color="#121316" />
            </button>
          </div>
        </div>
      </main>

      <style jsx>{`
        main {
          background: #f8f8ff;
          color: #121316;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100vw;
          height: 100vh;
        }
        .embla {
          overflow: hidden;
          width: 100%;
        }
        .embla__container {
          display: flex;
        }
        .embla__slide {
          flex: 0 0 100%;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
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
          background: transparent;
          border: 0;
          user-select: none;
          transform: translateY(4px);
        }
        button {
          background: transparent;
          border: 0;
          width: fit-content;
        }
        h1,
        h2 {
          position: absolute;
          text-align: center;
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          left: 13%;
          font-size: 60px;
          -webkit-text-stroke: 1px #121316;
          color: transparent;
          transition: all 0.3s;
        }
        h1:hover,
        h2:hover {
          color: #121316;
        }
        p {
          position: absolute;
          width: 300px;
          right: 40px;
        }
        .buttons {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
          right: 13%;
        }
        @media only screen and (max-width: 600px) {
          .embla__slide {
            display: flex;
            flex-direction: column;
          }
          h2 {
            position: relative;
            writing-mode: initial;
            transform: rotate(0deg);
            left: initial;
            font-size: 40px;
            color: #121316;
            bottom: 200px;
          }
          p {
            position: relative;
            right: initial;
            bottom: 160px;
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
      about: response.default.about,
    },
  };
}
