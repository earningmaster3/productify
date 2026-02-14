import { useNavigate, useParams, Link } from "react-router";
import { useAuth } from "@clerk/clerk-react";
import { useProduct, useUpdateProduct } from "../hooks/useProducts";
import LoadingSpinner from "../components/LoadingSpinner";
import EditProductForm from "../components/EditProductForm";

const Editpage = () => {

    const {id} = useParams();
    const {userId} = useAuth();
    const navigate = useNavigate();
    
    const {data: product, isLoading, error} = useProduct(id);
    const updateProduct = useUpdateProduct();

    if(isLoading) return <LoadingSpinner />;
    if(error || !product) {
        return (
            <div className="card bg-base-300 max-w-md mx-auto">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">Error loading product</h2>
                    <p>There was an error loading the product details.</p>
                </div>
            </div>
        )
    }
    return (
        <div>
            <EditProductForm product={product} isPending={updateProduct.isPending} 
            isError={updateProduct.isError} updateProduct={updateProduct} onSubmit={(formData)=>
            {
                updateProduct.mutate({id,...formData},{
                    onSuccess: () => navigate(`/product/${id}`)
                })
            }
            } navigate={navigate} />
        </div>
    )
}

export default Editpage
