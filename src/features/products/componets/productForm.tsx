import { useState, useEffect } from "react";
import type { Product } from "../productType";
import './productForm.css'

export interface clientFormProps {
  onClose: () => void;
  onSubmit: (client: Product) => void;
  productSelected : Product | null;
}

export default function ClientForm({ onClose, onSubmit, productSelected }: clientFormProps) {
  const [formData, setFormData] = useState<Product>({
    id:0,
    productName: "",
    productType: 0,
    numTerminal: 0,
    soldAt: ""
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
    
  useEffect(()=>{
    if( productSelected != null ){
        setFormData(productSelected);
        setIsEditing(true);
    }
    else{
        setIsEditing(false)
    }
  },[])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const newClient: Product = {
      ...formData,
    };
    onSubmit(newClient);
  };

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <h2>{isEditing?'Edit Product':'New Product'}</h2>
        <div className="field">
            <label>id</label>
            <input 
                name="id" 
                type="number"
                value={formData.id} 
                onChange={handleChange} 
            />
        </div>
        <div className="field">            
            <label>product name</label>
            <input
                name="productName" 
                value={formData.productName} 
                onChange={handleChange} 
            />
        </div>
        <div className="field">
            <label>product type</label>
            <input 
                name="productType" 
                type="number"
                value={formData.productType} 
                onChange={handleChange} 
            />
        </div>
        <div className="field">
            <label>num terminal</label>
            <input 
                name="numTerminal" 
                type="number"
                value={formData.numTerminal} 
                onChange={handleChange} 
            />
        </div>
        <div className="field">
            <label>sold at</label>
            <input 
                name="soldAt" 
                type="datetime-local"
                value={formData.soldAt} 
                onChange={handleChange} 
            />
        </div>        
        <div className="buttonField">
          <button onClick={handleSubmit}>{isEditing?'Edit':'Create'}</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}