import Button from "../Button";

export default function Proyecto({ title, description, urlView, urlRepo }) {
  return (
    <>
      <article>
        <div className="info-proyect">
          <a href={urlView} target="_blank" rel="noreferrer" title={title}>
            <h2>{title}</h2>
          </a>
          <p>{description}</p>
          <div className="buttons-proyect">
            <Button
              href={urlView}
              target="_blank"
              color="#cccffb"
              title={title}
            >
              Demo
            </Button>
            {urlRepo !== undefined && (
              <Button
                href={urlRepo}
                target="_blank"
                color="#cccffb"
                title={`${title} repository`}
              >
                Repo
              </Button>
            )}
          </div>
        </div>
      </article>

      <style jsx>{`
        article {
          text-align: center;
          color: #121316;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          height: 100%;
          position: relative;
        }
        .info-proyect {
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 0 0 50%;
        }
        h2 {
          font-size: 40px;
          -webkit-text-stroke: 1px #121316;
          color: transparent;
          transition: all 0.3s;
        }
        h2:hover {
          color: #121316;
        }
        .buttons-proyect {
          display: flex;
          gap: 10px;
          justify-content: center;
        }
        button {
          cursor: pointer;
          padding: 10px 30px;
          background-color: transparent;
          border: 1px solid #333;
          color: #121316;
        }
        button:hover {
          background: #fff2;
        }
        .link {
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
        .link:after {
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
        .link:hover {
          color: #f8f8ff;
        }
        .link:hover:after {
          top: 0;
          height: 100%;
        }
        @media only screen and (max-width: 600px) {
          .info-proyect {
            flex: 0 0 100%;
          }
        }
      `}</style>
    </>
  );
}
