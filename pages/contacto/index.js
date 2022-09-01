import { useState, useCallback, useEffect, useRef } from "react";
import Spline from "@splinetool/react-spline";
import useEmblaCarousel from "embla-carousel-react";
import ArrowRigth from "../../components/Icons/ArrowRigth";
import ArrowLeft from "../../components/Icons/ArrowLeft";
import emailjs from "@emailjs/browser";
import Button from "../../components/Button";
import Head from "next/head";

export default function ContactoPage(props) {
  const { contact } = props;

  const form = useRef();
  const [viewportRef, embla] = useEmblaCarousel({
    loop: true,
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [btnMessage, setBtnMessage] = useState(contact.send);
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

  const handleName = (e) => {
    setName(e.target.value);
    e.target.value.length === 0 && setErrorName(contact.errorNameOne);
    e.target.value.length === 1 ||
      (e.target.value.length === 2 && setErrorName(contact.errorNameTwo));
    e.target.value.length >= 25 && setErrorName(contact.errorNameThree);
    e.target.value.length >= 3 &&
      e.target.value.length < 25 &&
      setErrorName("");
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    e.target.value.length === 0
      ? setErrorEmail(contact.errorEmailOne)
      : setErrorEmail("");
    const emailValid = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    emailValid.test(e.target.value) === false
      ? setErrorEmail(contact.errorEmailTwo)
      : setErrorEmail("");
  };

  const handleMessage = (e) => {
    setMessage(e.target.value);
    e.target.value.length === 0
      ? setErrorMessage(contact.errorMessage)
      : setErrorMessage("");
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setBtnMessage(contact.sending);
    emailjs
      .sendForm(
        "service_xx78fes",
        "template_d5edkfp",
        form.current,
        "user_2w8z8DsmFTDBi7QdzHnvE"
      )
      .then(
        (result) => {
          console.log(result.text);
          setName("");
          setEmail("");
          setMessage("");
          setBtnMessage(contact.send);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <>
      <Head>
        <title>{contact.metaTitle}</title>
        <meta
          name="description"
          content="Contactame!, puedes llenar el formulario o mandarme un email a josafatmj11@gmail.com, me puedes encontrar en linkedin como Katriel Martínez Jacho"
        />
        <meta
          name="keywords"
          content="Front end developer en ecuador, React developer, next.js developer"
        />
        <meta name="author" content="Katriel Martínez" />
      </Head>
      <main>
        <div className="embla" ref={viewportRef}>
          <div className="embla__container">
            <div className="embla__slide">
              <section>
                <h1 onClick={scrollNext}>{contact.title}</h1>
                <form ref={form} onSubmit={sendEmail}>
                  <div className="inputs">
                    <label>
                      <input
                        type="text"
                        name="user_name"
                        value={name}
                        onChange={handleName}
                        autoComplete="off"
                        placeholder={contact.name}
                        className={errorName !== "" && "error"}
                      />
                      <span>{errorName}</span>
                    </label>
                    <label>
                      <input
                        type="email"
                        name="user_email"
                        value={email}
                        onChange={handleEmail}
                        autoComplete="off"
                        placeholder={contact.email}
                        className={errorEmail !== "" && "error"}
                      />
                      <span>{errorEmail}</span>
                    </label>
                  </div>
                  <label className="text">
                    <textarea
                      name="message"
                      value={message}
                      onChange={handleMessage}
                      placeholder={contact.message}
                      className={errorMessage !== "" && "error"}
                    />
                    <span>{errorMessage}</span>
                  </label>
                  <Button
                    disabled={
                      errorMessage !== "" ||
                      errorName !== "" ||
                      errorEmail !== "" ||
                      message.length === 0 ||
                      email.length === 0 ||
                      name.length === 0
                        ? true
                        : false
                    }
                  >
                    {btnMessage}
                  </Button>
                </form>
              </section>
            </div>
            <div className="embla__slide slide">
              <Spline scene="https://prod.spline.design/DRVjy9Z4vKoE05lA/scene.splinecode" />
              <h2>
                <a
                  href="https://www.linkedin.com/in/katriel-martínez-web-developer/"
                  target="_blank"
                  rel="noreferrer"
                  title="Linkedin Katriel Martínez"
                >
                  Linkedin
                </a>
              </h2>
            </div>
            <div className="embla__slide slide">
              <Spline scene="https://draft.spline.design/ZOcAacouNGPc6WKx/scene.splinecode" />
              <h2>
                <a
                  href="mailto:josafatmj11@gmail.com"
                  target="_blank"
                  rel="noreferrer"
                  title="josafatmj11@gmail.com"
                >
                  Gmail
                </a>
              </h2>
            </div>
            <div className="embla__slide slide">
              <Spline scene="https://prod.spline.design/jVoIkRtGp8UP1nvG/scene.splinecode" />
              <h2>
                <a
                  href={`https://wa.me/593967187314?text=${contact.messageTelf}`}
                  target="_blank"
                  title={contact.telf}
                  rel="noreferrer"
                >
                  Whatsapp
                </a>
              </h2>
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
          display: grid;
          height: 100vh;
          place-items: center;
          background: #f8f8ff;
          overflow: hidden;
        }
        .embla {
          overflow: hidden;
          width: 100%;
          position: relative;
        }
        .embla__container {
          display: flex;
        }
        .embla__slide {
          flex: 0 0 100%;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        section {
          display: grid;
          align-items: center;
        }
        h1,
        h2 {
          font-size: 60px;
          -webkit-text-stroke: 1px #121316;
          color: transparent;
          padding-bottom: 5px;
          transition: all 0.3s;
          width: fit-content;
          user-select: none;
          position: absolute;
          writing-mode: vertical-lr;
          transform: rotate(180deg);
          left: 13%;
        }
        h1:hover,
        h2:hover {
          color: #121316;
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 15px;
          justify-content: center;
          width: 600px;
        }
        .inputs {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
        }
        label {
          display: flex;
          flex-direction: column;
          width: 49%;
        }
        span {
          height: 15px;
          padding-top: 5px;
          font-size: small;
          color: #ff333d;
        }
        input,
        textarea {
          padding: 10px 5px;
          background: transparent;
          border: 1.2px solid #121316;
          outline: none;
          color: #121316;
        }
        .text {
          width: 100%;
        }
        textarea {
          resize: none;
          width: 100%;
          height: 150px;
        }
        .error {
          border-color: #ff333d;
        }
        button {
          background: transparent;
          border: 0;
          width: fit-content;
        }
        button[disabled] {
          opacity: 0.5;
        }
        button[disabled]:hover {
          color: #121316;
        }
        button[disabled]:hover:after {
          height: 0;
        }
        .send-button {
          z-index: 1;
          padding: 10px 25px;
          width: 45%;
          border: 1px solid #121316;
          background: transparent;
          color: #121316;
          transition: all 0.3s ease;
          position: relative;
          display: inline-block;
        }
        .send-button:after {
          position: absolute;
          content: "";
          width: 100%;
          height: 0;
          bottom: 0;
          left: 0;
          z-index: -1;
          background: #121316;
          transition: all 0.3s ease;
        }
        .send-button:hover {
          color: #f8f8ff;
        }
        .send-button:hover:after {
          top: 0;
          height: 100%;
        }
        .dot {
          background: #fff;
          border: 1px solid #fff;
          border-radius: 50%;
          mix-blend-mode: difference;
          padding: 5px;
          border: 0;
          transition: all 0.5s;
        }
        .dot:hover {
          background: transparent;
          border: 1px solid #fff;
        }
        .selected {
          background: #fff;
          border: 1px solid #fff;
        }
        .embla__dots {
          width: 100%;
          display: flex;
          justify-content: space-around;
          align-items: center;
          position: absolute;
          bottom: 30px;
          height: fit-content;
        }
        @media only screen and (max-width: 600px) {
          .inputs {
            flex-direction: column;
            gap: 15px;
          }
          .inputs label {
            width: 100%;
          }
          section {
            display: flex;
            flex-direction: column;
          }
          h1,
          h2 {
            position: relative;
            writing-mode: initial;
            transform: rotate(0deg);
            left: initial;
            font-size: 40px;
          }
          form {
            width: 100vw;
            padding: 15px;
          }
          .slide {
            display: flex;
            flex-direction: column;
          }
          h2 {
            top: -120px;
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
      contact: response.default.contact,
    },
  };
}
