import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import {
  Center,
  Spinner,
  CircularProgress
} from "@chakra-ui/react";

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
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.300"
              size="xl"
            />
          </Center>
        </div>
      }
      onLoadSuccess={onDocumentLoadSuccess}
      onLoadError={(error) => console.log("Inside Error", error)}
    >
      {Array.from(new Array(numPages), (el, index) => (
        <Page key={`page_${index + 1}`} pageNumber={index + 1} />
      ))}
    </Document>
  );
}

export function PdfPreview(props) {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const { pdf } = props;

  return (
    <Document
      size="A4"
      file={pdf}
      loading={
        <div>
          <Center>
          <CircularProgress isIndeterminate color='blue.300'/>
          </Center>
        </div>
      }
      onLoadSuccess={onDocumentLoadSuccess}
      onLoadError={(error) => console.log("Inside Error", error)}
    >
    </Document>
  );
}
