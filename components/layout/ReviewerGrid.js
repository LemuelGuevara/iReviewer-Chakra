import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Grid,
  GridItem,
  SimpleGrid,
  Button,
  HStack,
  VStack,
  Flex,
} from "@chakra-ui/react";
import ReviewerCard from "../../components/modules/ReviewerCard";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { onSnapshot, collection, query, orderBy } from "@firebase/firestore";
import { db } from "../../app/firebaseApp";

function ReviewerGrid() {
  const [reviewers, setReviewers] = useState([]);
  const { data: session } = useSession();

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "reviewers"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setReviewers(snapshot.docs);
        }
      ),
    []
  );

  return (
    <div>
      <SimpleGrid
        minChildWidth={["450px", "250px", "200px", "245px"]}
        columns={[2, 4]}
        spacingX={"24px"}
        spacingY={"24px"}
        p={[12, 1, 12, 16]}
      >
        {reviewers.map((reviewer) => (
          <ReviewerCard
            key={reviewer.id}
            id={reviewer.id}
            reviewer={reviewer.data()}
          />
        ))}
      </SimpleGrid>
    </div>
  );
}

export default ReviewerGrid;
