// import { useLoaderData, useNavigate } from "react-router";
// import { useSearchParams } from "react-router-dom";

import { CircularProgress } from '@chakra-ui/react'
import { useGetAllProductsQuery } from "../services/productSlice";
import Product from "../components/product";
import { useEffect, useState } from "react";


function ProductPage() {
    // let [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(1);
    
    const { data: allProducts, isFetching } = useGetAllProductsQuery(page);
    
    const records = allProducts?.items ?? [];
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
            
            if(scrolledToBottom && !isFetching && allProducts?.hasMore) {
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
            
        	{records.map((record: { id: any; }) => (
                <Product key={record.id} record={record}/>             
            	
        	))}

            {isFetching && <CircularProgress isIndeterminate color='green.300' />}
            
    	</div>
    );
}

export default ProductPage;