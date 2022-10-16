import React, { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeftIcon, ArrowRightIcon, Icon } from '@chakra-ui/icons'
// import { AiOutlineHeart,AiFillHeart } from 'react-icons/ai';
// import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io"
import { Box, Button, Center, Flex,  Spacer, Spinner, Stack, Text } from "@chakra-ui/react";
import { BoxShadow, BoxShadow1 } from "./BoxShadow";
import { v4 as uuid } from 'uuid';

function CharacterList() {
  // const [lists, setList] = useState();
  const [isLoading, setLoading] = useState(false);
  const [increments, setIncrements] = useState(1);
  const [data, updateData] = useState([]);
  const [starWarsData, setStarWarsData] = useState([]);
  const [favoritesData, setFavouritesData] = useState([]);
  // const [localData, setLocalData] = useState(JSON.parse(localStorage.getItem("fav")) || []);
  // const [count,setCount] = useState(1)
  // const [fav,setFav]=useState()
  // const [favorites, setFavorites] = useState([]);

  //increments
  let incNum = () => {
    if (increments < 9) {
      setIncrements(Number(increments) + 1);
    }
  }
  let decNum = () => {
    if (increments > 1) {
      setIncrements(increments - 1);
    }
  }

  //function  calling
  const CallFun = async (increments) => {
    try {
      setLoading(true)
      const res = await axios.get(`https://swapi.dev/api/people/?page=${increments}`)
      const requiredData = res.data.results.map((el) => {
        const id = uuid();
        return { ...el, id: id };
      })
      setStarWarsData(requiredData);
      // setList(res.data)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    CallFun(1)
  }, [])

  useEffect(() => {
    CallFun(increments)
  }, [increments])

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(data));
  }, [data]);

  let navigate = useNavigate()
  function handleClick() {
    setTimeout(() => {
      navigate('/detailview')
    }, 1250)
  }

  let fav = localStorage.getItem("fav");
  if (!fav) {
    // if fav is null/undefined;
    fav = [];
    localStorage.setItem("fav", JSON.stringify(fav));
  } else {
    fav = JSON.parse(fav);

  }
  function addToFavorites(item, index) {

    let shouldIAddData = true;
    for (let i = 0; i < favoritesData.length; i++) {
      if (favoritesData[i].id === item.id) {
        shouldIAddData = false;
        return;
      }
    }

    if (shouldIAddData) {
      setFavouritesData([...favoritesData, item]);
    }

    const newStarWarsData = starWarsData.filter((el, index) => {
      if (el.id !== item.id) return item;
    });
    setStarWarsData(newStarWarsData);
    // set data in local storage
    localStorage.setItem('starWarsData', JSON.stringify(newStarWarsData));
    localStorage.setItem('favouritesData', JSON.stringify([...favoritesData, item]));
  }


  //delete fav 
  function deleteDataFromFavourites(item, id) {
    const newData = favoritesData.filter((el, i) => {
      if (el.id !== id) {
        return el
      }
    })
    setFavouritesData(newData);

    setStarWarsData([...starWarsData, item])

    // set data in local storage
    localStorage.setItem('starWarsData', JSON.stringify([...starWarsData, item]));
    localStorage.setItem('favouritesData', JSON.stringify(newData));
  }

  return (
    <>
      <Center>
        <Text fontSize='5xl' textAlign='center' textDecoration={"underline overline"}>CHARACTERS</Text>

      </Center>
      <br />
      <Center>
        <Box >
          {!isLoading ? (
            <Box boxShadow={BoxShadow} padding={"15px"}
              gap={3}>
              {starWarsData.map((e, idx) => {
                return <Box
                  mt="0.5rem"
                  boxShadow={BoxShadow1}
                  padding={"10px"}
                  key={e.id}
                >
                  <Flex>
                    <Box
                      onClick={handleClick}
                      _hover={{ border: '1px solid black', cursor: "pointer" }}
                    >
                      <Text onClick={() => updateData(e.url)}>
                        {`Name: ${e.name}`}
                      </Text>
                    </Box>
                    <Spacer />
                    <IoIosHeartEmpty
                      onClick={() => addToFavorites(e, idx)}
                      style={{ color: "red", fontSize: "25px", cursor: "pointer" }}
                    />
                  </Flex>
                </Box>
              })}
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
      <Center>
        <Stack direction='row' spacing={4}>
          <Button
            disabled={increments === 1 ? true : false}
            colorScheme='blue'
            variant='solid'
            _hover={{ bg: 'white', color: "black", border: '1px solid black' }}
            onClick={decNum}
          >
            <Icon as={ArrowLeftIcon} />
            PREV
          </Button>
          <Button
            disabled={increments === 9 ? true : false}
            colorScheme='blue'
            variant='solid'
            _hover={{ bg: 'white', color: 'black', border: '1px solid black' }}
            onClick={incNum}
          >
            NEXT
            <Icon as={ArrowRightIcon} />
          </Button>
        </Stack>


        <br />
        <br />



      </Center>
      <br />
      <Center>

        <Text fontSize='5xl' textAlign='center' textDecoration={"underline overline"}>FAVORITES</Text>
      </Center>
      <br />
      <Center>
        <Box boxShadow={BoxShadow} p="10px">

          {favoritesData?.map((e, index) => (

            <Box
              mt="0.5rem"
              boxShadow={BoxShadow1}
              padding={"10px"}
            >
              <Flex justifyContent="space-between">
                <Box
                  onClick={handleClick}
                  _hover={{ border: '1px solid black', cursor: "pointer" }}
                >
                  <Text key={e.id} onClick={() => updateData(e.url)}>
                    {`Name: ${e.name}`}
                  </Text>
                </Box>
                <Spacer />
                <IoIosHeart
                  onClick={() => deleteDataFromFavourites(e, e.id)}
                  style={{ color: "red", fontSize: "25px", cursor: "pointer", marginLeft: "20px" }}
                />

              </Flex>
            </Box>
          ))}
        </Box>
      </Center>

    </>
  )

}

export default CharacterList;