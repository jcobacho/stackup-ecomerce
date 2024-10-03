import { Box, Flex } from "@chakra-ui/react"
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import { useGetAllProductsQuery } from "../services/productSlice";
import Product from "../components/product";

function ProductPage() {
    const { data: allProducts, isLoading } = useGetAllProductsQuery();

    return (         
        <div>

        	{isLoading? <CircularProgress isIndeterminate color='green.300' /> :
            allProducts?.map((record) => (

                <Product key={record.id} record={record}/>                
            	
        	))}
    	</div>
    );
}

export default ProductPage;