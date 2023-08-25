import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillTwitterSquare,
} from "react-icons/ai";
import { BiLogoNetlify } from "react-icons/bi";
import { Tooltip } from "react-tooltip";
import "./App.css";
import CV from "./media/Osuka_Savin_CV.pdf";
import profile from "./media/osuka_savin.jpg";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function App() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [typedH1, setTypedH1] = useState("");
  const [typedH2, setTypedH2] = useState("");
  const [textLoaded, setTextLoaded] = useState(false);
  const targetH1 = "Osuka Savin Otieno";
  const targetH2 = "My Enchanting CV";
  const typingSpeed = 100; // Adjust typing speed in milliseconds

  useEffect(() => {
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex <= targetH1.length) {
        setTypedH1(targetH1.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTextLoaded(true); // Set textLoaded to true when typing is done
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    if (textLoaded) {
      let currentIndex = 0;

      const typingInterval = setInterval(() => {
        if (currentIndex <= targetH2.length) {
          setTypedH2(targetH2.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, typingSpeed);

      return () => clearInterval(typingInterval);
    }
  }, [textLoaded]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img className="avatar" src={`${profile}`} alt="Avatar" />
        <h1>{typedH1}</h1>
        {textLoaded && (
          <div className="social-icons">
            <AiFillLinkedin
              className="icon"
              size={40} // Set the width and height of the icon
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/savin-osuka-783b5516b/",
                  "_blank"
                )
              }
              data-tooltip-id="LinkedIn"
              data-tooltip-content="LinkedIn Profile"
            />
            <Tooltip id="LinkedIn" />
            <AiFillGithub
              className="icon"
              size={40} // Set the width and height of the icon
              onClick={() =>
                window.open("https://github.com/savin2001/", "_blank")
              }
              data-tooltip-id="GitHub"
              data-tooltip-content="GitHub Profile"
            />
            <Tooltip id="GitHub" />
            <AiFillTwitterSquare
              className="icon"
              size={40} // Set the width and height of the icon
              onClick={() =>
                window.open("https://twitter.com/osukatech/", "_blank")
              }
              data-tooltip-id="Twitter"
              data-tooltip-content="Twitter Profile"
            />
            <Tooltip id="Twitter" />
            <BiLogoNetlify
              className="icon"
              size={40} // Set the width and height of the icon
              onClick={() =>
                window.open(
                  "https://app.netlify.com/teams/savin2001/sites",
                  "_blank"
                )
              }
              data-tooltip-id="Netlify"
              data-tooltip-content="Netlify Profile"
            />
            <Tooltip id="Netlify" />
          </div>
        )}
      </header>
      <main>
        {textLoaded && (
          <>
            <h2>{typedH2}</h2>

            <p className="page-number">
              Page {pageNumber} of {numPages}
            </p>
            <div className="page-controls">
              <button
                disabled={pageNumber <= 1}
                onClick={() => setPageNumber(pageNumber - 1)}
              >
                Previous
              </button>
              <button
                disabled={pageNumber >= numPages}
                onClick={() => setPageNumber(pageNumber + 1)}
              >
                Next
              </button>
            </div>
            <div className={`pdf-container ${textLoaded ? "loaded" : ""}`}>
              <Document file={CV} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} />
              </Document>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
