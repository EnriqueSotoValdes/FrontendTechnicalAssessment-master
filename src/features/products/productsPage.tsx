
import { useEffect, useState } from "react";
import { getProducts, postProducts,putProducts,deleteProducts } from "./productsApi";
import type { Product } from "./productType";
import ProductForm from './componets/productForm';
import './productsPage.css'

export default function productPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productSelected, setProductSelected] = useState<Product | null>(null);


  useEffect(() => {
    getProducts().then(setProducts).catch(console.error);
  }, []);

  function editButtonHandle( element:Product ){
    setProductSelected(element);
    setIsModalOpen(true);
  };

  function removeButtonHandle( element:Product ){
      deleteProducts(element).then(()=>{
        getProducts().then(setProducts).catch(console.error);
      }).catch(console.error);
  };

  function newButtonHandle(){
    setProductSelected(null);
    setIsModalOpen(true);
  };

  return (
    <>  
      {
        products.map( (element,i ) => 
          <div className="productCard" data-testid={'product-'+i} key={'ele_'+i}>
            <label>id:{element.id}</label> 
            <label>product name:{element.productName}</label> 
            <label>product type:{element.productType}</label> 
            <label>num terminale:{element.numTerminal}</label> 
            <label>sold at:{element.soldAt}</label> 
            <div>
              <button className="editButton" onClick={()=>{ editButtonHandle(element)}}>Edit</button>
              <button className="removeButton" onClick={()=>{ removeButtonHandle(element)}}>Remove</button>
            </div>
          </div>
        )
      }
     <button className="newButton" onClick={newButtonHandle}>New Product</button>
     
      { isModalOpen && (
       <ProductForm
          onClose={() => setIsModalOpen(false)}
          onSubmit={(newproduct: Product) => {
            setIsModalOpen(false);
            if(productSelected == null){
                postProducts(newproduct).then(()=>{
                  getProducts().then(setProducts).catch(console.error);
                }).catch(console.error);
            }
            else{
                putProducts(newproduct).then(()=>{
                  getProducts().then(setProducts).catch(console.error);
                }).catch(console.error);
            }
            getProducts().then(setProducts).catch(console.error);
          }}
          productSelected={productSelected}
        />
      )}
     </>
  );
  
         
}

