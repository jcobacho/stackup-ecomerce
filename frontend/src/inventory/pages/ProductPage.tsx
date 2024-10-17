// import { useLoaderData, useNavigate } from "react-router";
// import { useSearchParams } from "react-router-dom";

import { useGetAllProductsQuery } from "../services/productSlice";
import Product from "../components/Product";
import { useEffect, useState } from "react";
import { SimpleGrid, Text } from "@chakra-ui/react";
import Loading from "../../core/components/Loading";
import { useDebounce } from '../../core/hooks/useDebounce';
import ProductSearch from "../components/Search";

function ProductPage() {
    // let [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1);
    const debouncedSearch = useDebounce(search, 300)

    const { data: allProducts, isFetching } = useGetAllProductsQuery({search: debouncedSearch, page});
    
    const records = allProducts?.results ?? [];
    let nextPage = page+1 || 1
  
    // searchParams.set('page', page)
    // setSearchParams(searchParams)

    useEffect(() => {
        const onScroll = () => {
            
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

            <ProductSearch search={search} setSearch={setSearch} setPage={setPage}/>
            
            {records.length > 0 ? <SimpleGrid columns={{ base: 1, sm: 2,  md: 3, lg: 4}} spacingX='40px' spacingY='20px'>

                {records.map((record: { id: any; }) => (
                    <Product key={record.id} record={record}/>             
                ))}
            </SimpleGrid>
            : !isFetching &&(
                <Text textAlign="center" mt="1.5rem" fontWeight="bold">
                  No Items in cart
                </Text>
              )}

            {isFetching && <Loading/>}

    	</div>
    );
}

export default ProductPage;