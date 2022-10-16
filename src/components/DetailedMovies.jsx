import { Box, Flex, Spinner, Text} from "@chakra-ui/react"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { BoxShadow } from "./BoxShadow"


function DetailedMovies({movie_url}){
   const [Movie,setMovie]=useState(null)
   const [isLoading, setLoading] = useState(false);

    useEffect(() => {
      setLoading(true);
  axios.get(movie_url).then((res)=>{
// console.log(res)
setMovie(res.data)
  }).catch((err)=>{
    setLoading(false)
    console.log(err)
  })
    },[movie_url])
    // console.log(Movie)
    
    return(
        <>
            <br/>
            {isLoading?(
        <Box boxShadow={BoxShadow} textAlign="center"p="20px">
        <Text fontSize='2xl' textDecoration={"underline"}>{Movie?.title}</Text>
        <Text>{`Director: ${Movie?.director}`}</Text>
        <Text>{`Producer: ${Movie?.producer}`}</Text>
        <Text>{`Released_Date: ${Movie?.release_date}`}</Text>

        </Box>):(
            <Flex justify="center" mt={"5"}>
              <Spinner
                thickness="5px"
                speed="0.65s"
                emptyColor="gray.200"
                color="#3182ce"
                size="lg"
              />
            </Flex>
          )
           }
        <br />
        </>
    )

}


export default DetailedMovies



