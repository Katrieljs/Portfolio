import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Nav({
  color = "#121316",
  bg = "#fff2",
  border = "#121316",
  handleMouseEnter,
  handleMouseLeave,
}) {
  const router = useRouter();
  const [visible, SetVisible] = useState(false);

  const handleClick = () => {
    SetVisible(!visible);
  };

  return (
    <>
      <span onClick={handleClick}>Menu</span>
      <nav>
        <ul>
          <li
            onClick={() => {
              router.push("/about");
              SetVisible(false);
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link href="/about">
              <a className={router.pathname === "/about" && "active"}>
                {router.locale === "en" ? "About" : "Sobre mí"}
              </a>
            </Link>
          </li>
          <li
            className="proyectos"
            onClick={() => {
              router.push("/proyectos");
              SetVisible(false);
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link href="/proyectos">
              <a className={router.pathname === "/proyectos" && "active"}>
                {router.locale === "en" ? "Projects" : "Proyectos"}
              </a>
            </Link>
          </li>
          <li
            className="home"
            onClick={() => {
              router.push("/");
              SetVisible(false);
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link href="/">
              <a className={router.pathname === "/" && "active"}>
                {router.locale === "en" ? "Home" : "Home"}
              </a>
            </Link>
          </li>
          <li
            className="habilidades"
            onClick={() => {
              router.push("/habilidades");
              SetVisible(false);
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link href="/habilidades">
              <a className={router.pathname === "/habilidades" && "active"}>
                {router.locale === "en" ? "Skills" : "Habilidades"}
              </a>
            </Link>
          </li>
          <li
            onClick={() => {
              router.push("/contacto");
              SetVisible(false);
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link href="/contacto">
              <a className={router.pathname === "/contacto" && "active"}>
                {router.locale === "en" ? "Contact" : "Contacto"}
              </a>
            </Link>
          </li>
        </ul>
      </nav>

      <style jsx>{`
        span {
          display: none;
        }
        nav {
          position: fixed;
          z-index: 1000;
          width: 100%;
          height: 32px;
          border-bottom: 1px solid
            ${router.pathname === "/habilidades" || router.pathname === "/404"
              ? "#f8f8ff"
              : border};
          background: ${router.pathname === "/habilidades" ||
          router.pathname === "/404"
            ? "#0002"
            : bg};
          color: ${router.pathname === "/habilidades" ||
          router.pathname === "/404"
            ? "#f8f8ff"
            : color};
          backdrop-filter: blur(10px);
          cursor: pointer;
        }
        ul {
          list-style: none;
          display: flex;
          justify-content: space-around;
        }
        li {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 32px;
          padding-left: 10px;
          padding-right: 10px;
          width: 100%;
          text-align: center;
        }
        li:hover {
          background: #fff2;
        }

        @media only screen and (max-width: 600px) {
          span {
            display: initial;
            position: absolute;
            z-index: 99999;
            top: 20px;
            right: 15px;
            color: ${router.pathname === "/habilidades" ||
            router.pathname === "/404"
              ? "#f8f8ff"
              : "#121316"};
            font-size: 30px;
            font-weight: 700;
          }
          nav {
            border: 0;
            background: ${router.pathname === "/habilidades" ||
            router.pathname === "/404"
              ? "#0009"
              : "#f8f8ff99"};
            height: ${visible ? "100vh" : "0"};
            font-size: 30px;
            font-weight: 700;
            z-index: 9999;
            overflow: hidden;
            transition: all 0.3s;
            color: ${router.pathname === "/habilidades" ||
            router.pathname === "/404"
              ? "#f8f8ff"
              : "#121316"};
          }
          ul {
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: inherit;
            width: 100%;
            gap: 30px;
            opacity: ${visible ? 1 : 0};
            transition: opacity 0.3s, height 0s;
          }
          li {
            width: fit-content;
          }
          a:hover,
          span:hover {
            -webkit-text-stroke: ${router.pathname === "/habilidades" ||
            router.pathname === "/404"
              ? "1px #f8f8ff"
              : "1px #121316"};
            color: transparent;
          }
        }
      `}</style>
    </>
  );
}
