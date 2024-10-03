import { useLoaderData, useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

import { CircularProgress } from '@chakra-ui/react'
import { useGetAllProductsQuery } from "../services/productSlice";
import Product from "../components/product";



function ProductPage() {
    let [searchParams, setSearchParams] = useSearchParams();
    
    const { data: allProducts, isLoading } = useGetAllProductsQuery(searchParams.toString());

    return (         
        <div>
            
        	{isLoading? <CircularProgress isIndeterminate color='green.300' /> :
            allProducts.items?.map((record) => (

                <Product key={record.id} record={record}/>                
            	
        	))}
            
    	</div>
    );
}

export default ProductPage;