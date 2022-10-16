import { Box, Center, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
// import { useParams } from "react-router";
import { BoxShadow, BoxShadow1 } from "./BoxShadow";
import DetailedMovies from "./DetailedMovies";
// import { DetailedCard } from "./DetailedCard";


function DetailedView(){
    // let { id } = useParams();
    //  console.log("id",id)
    const [lists, setList] = useState();
    const [isLoading,setLoading] = useState(false);
    const [url, setUrl] = useState();
    //  const [data, setData] = useState([])

useEffect(() => {
  const item = JSON.parse(localStorage.getItem('data'));
  if (item) {
   setUrl(item);
  }
}, []);
//    console.log("item",url)
    CallFun(url)
    //function  calling
    function CallFun(url) {
        useEffect(()=>{
        
        setTimeout(()=>{
          setLoading(true);
        },500)
        axios.get(url).then((res)=>{
          setList(res.data)
         setLoading(false)
        })
      },[url])
    }
      // console.log(lists.films)


   
    return(
        <>
        <br />
        <Heading fontSize='5xl' textAlign='center' textDecoration={"underline overline"}>Base Details</Heading>
          <br />
        <Center>
        <br/>
        <Box >
          {!isLoading? (
               <Box boxShadow={BoxShadow} p="20px" textAlign={"center"}>
               <Text as='b'textDecoration={"underline"}>
                   {`Name:${lists?.name}`}
               </Text>
               <Text>
                   {`Gender:${lists?.gender}`}
               </Text>
               <Text>
                  {`Eye-color:${lists?.eye_color}`} 
               </Text>
               <Text>
                   {`Skin_color:${lists?.skin_color}`}
                   </Text>
                   <Text>
                   {`Hair_color:${lists?.hair_color}`}
                   </Text>
                   <Text>
                   {`Height:${lists?.height}`}
                   </Text>
                   <Text>
                   {`Mass:${lists?.mass}`}
                   </Text>
           </Box>
              ) : (
                <Flex justify="center" mt={"5"}>
                  <Spinner
                    thickness="5px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="#3182ce"
                    size="lg"
                  />
                </Flex>
              )}
          </Box>
        </Center>
        <br />
        <br/>
        <Center>
          <Heading textDecoration={"underline overline"}>MOVIES</Heading>
        </Center>
        <br />
          <Center>
            <Box boxShadow={BoxShadow1} p="20px">
              {lists?.films?.map((e)=>{
                   return <DetailedMovies movie_url={e}/>
              })}
            </Box>
          </Center>
        </>
    )
}

export default DetailedView;