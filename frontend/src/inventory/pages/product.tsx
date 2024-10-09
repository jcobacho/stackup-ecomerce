// import { useLoaderData, useNavigate } from "react-router";
// import { useSearchParams } from "react-router-dom";

import { useGetAllProductsQuery } from "../services/productSlice";
import Product from "../components/product";
import { useEffect, useState } from "react";
import { SimpleGrid } from "@chakra-ui/react";
import { Spinner } from '@chakra-ui/react'

function ProductPage() {
    // let [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(1);
    
    const { data: allProducts, isFetching } = useGetAllProductsQuery(page);
    
    const records = allProducts?.results ?? [];
    let nextPage = allProducts?.next || 1
  
    // searchParams.set('page', page)
    // setSearchParams(searchParams)

    useEffect(() => {
        const onScroll = () => {
            
        //   const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
        //   const scrolledToBottom = target.scrollHeight - target.scrollTop === target.clientHeight;

            let documentHeight = document.body.scrollHeight;
            let currentScroll = window.scrollY + window.innerHeight;
            // When the user is [modifier]px from the bottom, fire the event.
            let modifier = 200; 
            const scrolledToBottom = currentScroll + modifier > documentHeight
            
            if(scrolledToBottom && !isFetching && allProducts?.next) {
                setPage(nextPage)
            }
            
        };
    
        document.addEventListener("scroll", onScroll);
    
        return function () {
          document.removeEventListener("scroll", onScroll);
        };
      }, [setPage, isFetching, allProducts]);

    return (         
        <div>
            <SimpleGrid columns={4} spacingX='40px' spacingY='20px'>

                {records.map((record: { id: any; }) => (
                        <Product key={record.id} record={record}/>             
                ))}
                {isFetching && <div className={'d-flex justify-content-center'}> <Spinner animation="grow" /></div>}
            </SimpleGrid>
    	</div>
    );
}

export default ProductPage;