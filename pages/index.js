import Head from "next/head";
import Spline from "@splinetool/react-spline";
import { useRouter } from "next/router";

export default function Home(props) {
  const router = useRouter();
  const { home } = props;

  const handleClick = (e) => {
    router.push(router.pathname, router.pathname, {
      locale: e.target.value,
    });
  };

  return (
    <>
      <Head>
        <title>Katriel Martínez - Web developer</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Soy Katriel Front end developer en Ecuador, diseñador 3d, amo react y el desarrollo web"
        />
        <meta
          name="keywords"
          content="Front end developer en ecuador, React developer, next.js developer"
        />
        <meta name="author" content="Katriel Martínez" />
      </Head>

      <main>
        <h1>{home.title}</h1>
        <Spline scene="https://draft.spline.design/okVtKnwrOtIQrTwA/scene.splinecode" />
        <div>
          <input
            type="button"
            className="es"
            value="es"
            onClick={handleClick}
            title="Ver en español"
          />
          <input
            type="button"
            className="en"
            value="en"
            onClick={handleClick}
            title="Ver en ingles"
          />
        </div>
      </main>

      <style jsx>{`
        main {
          overflow: hidden;
          background: #cccffb;
        }

        h1 {
          pointer-events: none;
          -webkit-text-stroke: 1px #121316;
          color: transparent;
          position: absolute;
          z-index: 1000;
          text-align: center;
          font-size: 40px;
        }
        main {
          display: grid;
          place-items: center;
          height: 100vh;
        }
        div {
          position: absolute;
          z-index: 1000;
          bottom: 20px;
          left: 40px;
          display: flex;
          gap: 0.5em;
        }
        input {
          color: #121316;
          background: transparent;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid #121316;
        }
        input:hover {
          background: #121316;
          color: #f8f8ff;
        }
        .es {
          background: ${router.locale === "es" ? "#121316" : "transparent"};
          color: ${router.locale === "es" ? "#f8f8ff" : "#121316"};
        }
        .en {
          background: ${router.locale === "en" ? "#121316" : "transparent"};
          color: ${router.locale === "en" ? "#f8f8ff" : "#121316"};
        }
        @media only screen and (max-width: 600px) {
          div {
            left: 15px;
          }
          input {
            width: 50px;
            height: 50px;
            font-size: 15px;
          }
        }
      `}</style>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const response = await import(`../lang/${locale}.json`);

  return {
    props: {
      home: response.default.home,
    },
  };
}
