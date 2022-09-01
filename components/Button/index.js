import Link from "next/link";

export default function Button({
  children,
  disabled,
  onClick,
  href,
  target,
  darkMode,
  color,
  width,
  padding = "10px 25px",
  title,
}) {
  return (
    <>
      {href ? (
        <>
          {target ? (
            <a href={href} target={target} rel="noreferrer" title={title}>
              {children}
            </a>
          ) : (
            <Link href={href}>
              <a target={target} rel="noreferrer" title={title}>
                {children}
              </a>
            </Link>
          )}
        </>
      ) : (
        <button disabled={disabled} onClick={onClick}>
          {children}
        </button>
      )}

      <style jsx>{`
        button[disabled] {
          opacity: 0.5;
        }
        button[disabled]:hover {
          background: initial;
          color: #000;
        }
        button,
        a {
          z-index: 1;
          padding: ${padding};
          border: 1px solid ${darkMode ? "#f8f8ff" : "#121316"};
          background: transparent;
          color: ${darkMode ? "#f8f8ff" : "#121316"};
          transition: all 0.3s ease;
          position: relative;
          display: inline-block;
          width: ${width};
        }
        button:hover,
        a:hover {
          background: ${darkMode ? "#f8f8ff" : "#000"};
          color: ${darkMode ? "#000" : "#f8f8ff"};
          color: ${color};
        }
      `}</style>
    </>
  );
}
