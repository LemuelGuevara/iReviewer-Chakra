import {
  Alert,
  AlertIcon,
  Box,
  AlertDescription,
  AlertTitle,
  CloseButton,
  useDisclosure,
  Button,
  useToast,
} from "@chakra-ui/react";

function SizeAlert() {

  return (
    <Alert status="error">
      <AlertIcon />
        <AlertTitle>File too big!</AlertTitle>
        <AlertDescription>
          You got a big file there! Upload a file that is less than 10mb.
        </AlertDescription>
    </Alert>
  );
}

export default SizeAlert;
