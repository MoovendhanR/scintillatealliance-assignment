import React from "react";
import { Route, Routes } from "react-router";
import CharacterList from "./CharacterList";
import DetailedView from "./DetailedView";

function AllRoutes(){
    return(
        <>
        <Routes>
            <Route path='/' element={<CharacterList/>}/>
            <Route path='/detailview' element={<DetailedView/>}/>
        </Routes>
        </>
    )
}

export default AllRoutes;