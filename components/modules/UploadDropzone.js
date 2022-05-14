import { Dispatch, FunctionComponent, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Text, Box } from "@chakra-ui/react";

function UploadDropzone({ setSelectedFile }) {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    setSelectedFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragAccept } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className="h-100 text-center items-center justify-center bg-slate-400"
      >
        <input {...getInputProps()} />
        <Box alignItems="center" p={9} borderRadius="lg">
          <Text align={"center"}>Drag & Drop Files</Text>
        </Box>
      </div>
    </div>
  );
}

export default UploadDropzone;
