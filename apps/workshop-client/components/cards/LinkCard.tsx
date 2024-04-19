import {
  Box,
  Card,
  CardBody,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";

interface LinkCardProps {
  imageUrl: string;
  heading: string;
  text: string;
  url: string;
}

export const LinkCard = ({ imageUrl, heading, text, url }: LinkCardProps) => {
  return (
    <Card maxW="sm" h="250px">
      <Link href={url} target="_blank">
        <CardBody>
          <VStack height="220px" justifyContent="space-between" width="200px">
            <Box h="50%" boxSizing="content-box">
              <Image src={imageUrl} maxH="100%" />
            </Box>
            <Heading size="md">{heading}</Heading>
            <Text>{text}</Text>
          </VStack>
        </CardBody>
      </Link>
    </Card>
  );
};
