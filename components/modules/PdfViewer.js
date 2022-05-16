import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Center, SkeletonText, CircularProgress, Text } from "@chakra-ui/react";

export default function PdfViewer(props) {
  const [numPages, setNumPages] = useState(null);
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const { pdf } = props;

  return (
    <Document
      size="A4"
      file={pdf}
      loading={
        <div>
          <Center>
            <CircularProgress isIndeterminate color="blue.300" />
          </Center>
        </div>
      }
      onLoadSuccess={onDocumentLoadSuccess}
      onLoadError={(error) => console.log("Inside Error", error)}
    >
      {Array.from(new Array(numPages), (el, index) => (
        <Page
          key={`page_${index + 1}`}
          pageNumber={index + 1}
          scale={1}
          renderMode={"canvas"}
          renderTextLayer={true}
          loading={
            <div>
              <Center>
                <CircularProgress isIndeterminate color="blue.300" />
              </Center>
            </div>
          }
        />
      ))}
    </Document>
  );
}
