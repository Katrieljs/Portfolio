import "../styles/globals.css";
import Nav from "../components/nav";
import useDeviceDetect from "../hooks/useDeviceDetect";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import NProgress from "nprogress";
import "../styles/nprogress.css";
import Router from "next/router";
import Script from "next/script";
import * as gtag from "../lib/gtag";
import { useRouter } from "next/router";

Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  NProgress.start();
});

Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { isMobile } = useDeviceDetect();
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [cursorVariant, setCursorVariant] = useState("default");
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("hashChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("hashChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const mouseDown = () => {
      setCursorVariant("click");
      document
        .querySelector(".cursor")
        .classList.remove(Router.locale === "en" ? "links" : "links__es");
    };

    const mouseUp = () => {
      setCursorVariant("default");
    };

    const mouseLeave = () => {
      setCursorVariant("leave");
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mousedown", mouseDown);
    window.addEventListener("mouseup", mouseUp);
    window.addEventListener("mouseleave", mouseLeave);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("mouseup", mouseUp);
      window.removeEventListener("mouseleave", mouseLeave);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      mixBlendMode: "difference",
    },
    text: {
      height: 150,
      width: 150,
      x: mousePosition.x - 75,
      y: mousePosition.y - 75,
    },
    click: {
      height: 40,
      width: 40,
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
    },
    leave: {
      opacity: 0,
      height: 0,
      width: 0,
    },
    links: {
      height: 40,
      width: 40,
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
    },
    links__es: {
      height: 40,
      width: 40,
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
    },
  };

  const handleMouseEnter = () => {
    document
      .querySelector(".cursor")
      .classList.add(Router.locale === "en" ? "links" : "links__es");
    setCursorVariant(Router.locale === "en" ? "links" : "links__es");
  };
  const handleMouseLeave = () => {
    document
      .querySelector(".cursor")
      .classList.remove(Router.locale === "en" ? "links" : "links__es");
    setCursorVariant("default");
  };

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      {!isMobile && (
        <motion.div
          className="cursor"
          variants={variants}
          animate={cursorVariant}
        />
      )}
      <Nav
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
