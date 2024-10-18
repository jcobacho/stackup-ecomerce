import { Box, Checkbox, Divider, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Stack } from "@chakra-ui/react";
import FormField from "../../core/components/FormField";
import { ProductAdminCreateError, ProductAdminCreateRequest } from "../services/types";

const ProductAdminForm = ({
  formData, setFormData, formErrors
}: {
  formData: ProductAdminCreateRequest
  setFormData: (...args: any) => void
  formErrors: ProductAdminCreateError

}): JSX.Element => {

    return ( 

        <>
            <FormField 
                field="imageUrl" 
                value={formData?.imageUrl} 
                label="Image" 
                isRequired={false}
                placeholder={'http://stock.image.png'} 
                errorMessage={formErrors?.imageUrl? formErrors?.imageUrl[0] : ''}
                isInvalid={formErrors?.imageUrl ? true : false } 
                onChange={(e) => setFormData({ ...formData, imageUrl: (e.target as HTMLInputElement).value })}/>

            <FormField 
                field="name" 
                value={formData?.name} 
                label="Name" 
                placeholder={'Product 1'} 
                errorMessage={formErrors?.name? formErrors?.name[0] : ''}
                isInvalid={formErrors?.name ? true : false } 
                onChange={(e) => setFormData({ ...formData, name: (e.target as HTMLInputElement).value })}/>


            <FormField 
                field="description" 
                value={formData?.description} 
                label="Description" 
                type={'textarea'}
                isRequired={false}
                placeholder={'Lorem issop...'} 
                errorMessage={formErrors?.description? formErrors?.description[0] : ''}
                isInvalid={formErrors?.description ? true : false } 
                onChange={(e) => setFormData({ ...formData, description: (e.target as HTMLInputElement).value })}/>


            <FormField 
                field="price" 
                value={formData?.price} 
                label="Price" 
                type={'number'}
                placeholder={'55.95'} 
                errorMessage={formErrors?.price? formErrors?.price[0] : ''}
                isInvalid={formErrors?.price ? true : false } 
                onChange={(e) => setFormData({ ...formData, price: (e.target as HTMLInputElement).value })}/>
            
        </>
     );
}

export default ProductAdminForm;