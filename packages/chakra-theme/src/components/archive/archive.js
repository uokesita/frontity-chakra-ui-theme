import { Box, SimpleGrid } from "@chakra-ui/core";
import { connect } from "frontity";
import React from "react";
import ArchiveHeader from "./archive-header";
import ArchiveItem from "./archive-item";
import HomepageArchive from "./homepage-archive";
import Pagination from "./pagination";

const Archive = ({ state }) => {
  // Get the data of the current list.
  const data = state.source.get(state.router.link);

  const isHomePage = state.router.link === "/";
  if (isHomePage) return <HomepageArchive />;

  return (
    <Box bg="accent.50" as="section">
      {/* If the list is a taxonomy, we render a title. */}
      {data.isTaxonomy && (
        <ArchiveHeader
          taxonomy={data.taxonomy}
          title={state.source[data.taxonomy][data.id].name}
        />
      )}

      {/* If the list is an author, we render a title. */}
      {data.isAuthor && (
        <ArchiveHeader
          taxonomy="Posts By"
          title={state.source.author[data.id].name}
        />
      )}

      <Box
        padding={{ base: "24px", lg: "40px" }}
        bg="white"
        width={{ lg: "80%" }}
        maxWidth="1200px"
        mx="auto"
      >
        {/* Iterate over the items of the list. */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing="40px">
          {data.items.map(({ type, id }) => {
            const item = state.source[type][id];
            return <ArchiveItem key={item.id} item={item} />;
          })}
        </SimpleGrid>

        <Pagination mt="56px" />
      </Box>
    </Box>
  );
};

export default connect(Archive);
