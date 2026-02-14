import { ArrowLeftIcon, EditIcon, Trash2Icon, CalendarIcon, UserIcon } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "@clerk/clerk-react";
import { useProduct, useDeleteProduct } from "../hooks/useProducts";
import { useParams, Link, useNavigate } from "react-router";
import CommentsSection from "../components/CommentsSection.jsx";

const Productpage = () => {
    
    const { id } = useParams();
    const { userId } = useAuth();
    const navigate = useNavigate();
    const { data: product, isLoading, error } = useProduct(id);
    const deleteProduct = useDeleteProduct();

    // console.log(product.comments);
    // console.log("Current user ID:", userId);
    // console.log("Product's user ID:", product.userId);
    // console.log(product);


    if (isLoading) return <LoadingSpinner />;
    
    if (error || !product) {
        return (
            <div className="card bg-base-300 max-w-md mx-auto">
                <div className="card-body items-center text-center">
                    <h2 className="card-title text-error">Product not found</h2>
                    <Link to="/" className="btn btn-primary btn-sm">
                        Go Home
                    </Link>
                </div>
            </div>
        );
    }



    //check who signed in (the user) is same as the product creator owner
    const isOwner = userId === product.userId;

    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this product?")) {
            await deleteProduct.mutateAsync(product.id);
            navigate("/");
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <Link to="/" className="btn btn-ghost btn-sm gap-1">
                    <ArrowLeftIcon className="size-4" /> Back
                </Link>
            </div>
            {/* PRODUCT CARD */}

            {/*  if the user is the owner of the product show him edit and delete button*/}

            {isOwner && (
                <div className="flex gap-2">
                    <Link to={`/edit/${product.id}`} className="btn btn-ghost btn-sm gap-1">
                        <EditIcon className="size-4" /> Edit
                    </Link>
                    <button
                        onClick={handleDelete}
                        className="btn btn-error btn-sm gap-1"
                        disabled={deleteProduct.isPending}
                    >
                        {deleteProduct.isPending ? (
                            <span className="loading loading-spinner loading-xs" />
                        ) : (
                            <Trash2Icon className="size-4" />
                        )}
                        Delete
                    </button>
                </div>
            )}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Image */}
                <div className="card bg-base-300">
                    <figure className="p-4">
                        <img
                            src={product.imageUrl}
                            alt={product.title}
                            className="rounded-xl w-full h-80 object-cover"
                        />
                    </figure>
                </div>
                <div className="card bg-base-300">
                    <div className="card-body">
                        <h1 className="card-title text-2xl">{product.title}</h1>
                        <div className="flex flex-wrap gap-4 text-sm text-base-content/60 my-2">
                            <div className="flex items-center gap-1">
                                <CalendarIcon className="size-4" />
                                {new Date(product.createdAt).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1">
                                <UserIcon className="size-4" />
                                {product.user?.name}
                            </div>
                        </div>
                        <div className="divider my-2"></div>
                        <p className="text-base-content/80 leading-relaxed">{product.description}</p>
                        {product.user && (
                            <>
                                <div className="divider my-2"></div>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img src={product.user.imageUrl} alt={product.user.name} />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-semibold">{product.user.name}</p>
                                        <p className="text-xs text-base-content/50">Creator</p>
                                    </div>
                                </div>
                            </>
                        )}

                    </div>
                </div>
            </div>

            {/* Comments */}
            <div className="card bg-base-300">
                <div className="card-body">
                    <CommentsSection
                        productId={product.id}
                        comments={product.comments} currentUserId={userId} 
                    />
                    
                </div>
            </div>
        </div>
    );
};

export default Productpage;
