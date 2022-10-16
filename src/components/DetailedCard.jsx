import { Box, Container, Text } from "@chakra-ui/react";
import React from "react";



export const DetailedCard=({name,gender,eye_color,skin_color,hair_color,height,mass})=>{


    return(
        <>
        <Container>
            <Box>
                <Text>
                    {`Name:${name}`}
                </Text>
                <Text>
                    {`Gender:${gender}`}
                </Text>
                <Text>
                   {`Eye-color:${eye_color}`} 
                </Text>
                <Text>
                    {`Skin_color:${skin_color}`}
                    </Text>
                    <Text>
                    {`Hair_color:${hair_color}`}
                    </Text>
                    <Text>
                    {`Height:${height}`}
                    </Text>
                    <Text>
                    {`Mass:${mass}`}
                    </Text>
            </Box>
        </Container>
        </>
    )
}