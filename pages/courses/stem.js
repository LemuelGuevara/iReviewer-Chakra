import {
  SimpleGrid,
} from "@chakra-ui/react";
import ReviewerCard from "../../components/modules/ReviewerCard";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { onSnapshot, collection, query, orderBy } from "@firebase/firestore";
import { db } from "../../app/firebaseApp";
import NavBar from "../../components/layout/NavBar";
import SubNav from "../../components/layout/SubNav"

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
      <NavBar/>
      <SubNav/>
      <SimpleGrid
        minChildWidth={["250px", "250px", "200px", "245px"]}
        columns={[2, 4]}
        spacingX={"24px"}
        spacingY={"24px"}
        // p={[12, 1, 12, 16]}
        p={[2, 12, 24, 12, 16]}
      >
        {reviewers.map((reviewer) => (
          <ReviewerCard
            key={reviewer.id}
            id={reviewer.id}
            reviewer={reviewer.data("curriculum" === "STEM")}
          />
        ))}
      </SimpleGrid>
    </div>
  );
}

export default ReviewerGrid;
