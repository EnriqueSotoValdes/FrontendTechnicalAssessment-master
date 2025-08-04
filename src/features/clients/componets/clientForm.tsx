import { useState, useEffect } from "react";
import type { Client } from "../clientType";
import './clientForm.css';

export interface clientFormProps {
  onClose: () => void;
  onSubmit: (client: Client) => void;
  clientSelected : Client | null;
}

export default function ClientForm({ onClose, onSubmit, clientSelected }: clientFormProps) {
  const [formData, setFormData] = useState<Client>({
    id:0,
    docType: "",
    docNum: "",
    email: "",
    givenName: "",
    familyName1: "",
    phone: "",
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
    
  useEffect(()=>{
    if( clientSelected != null ){
        setFormData(clientSelected);
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
    const newClient: Client = {
      ...formData,
    };
    onSubmit(newClient);
  };

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <h2>{isEditing?'Edit Client':'New Client'}</h2>
        <div className="field">
            <label>id</label>
            <input 
                data-testid="id"
                name="id" 
                type="number"
                value={formData.id} 
                onChange={handleChange} 
            />
        </div>
        <div className="field">            
            <label>doc type</label>
            <input
                data-testid="docType"
                name="docType" 
                value={formData.docType} 
                onChange={handleChange} 
            />
        </div>
        <div className="field">
            <label>doc num</label>
            <input 
                data-testid="docNum"
                name="docNum" 
                value={formData.docNum} 
                onChange={handleChange} 
            />
        </div>
        <div className="field">
            <label>email</label>
            <input 
                data-testid="email"
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
            />
        </div>
        <div className="field">
            <label>given name</label>
            <input 
                data-testid="givenName"
                name="givenName" 
                value={formData.givenName} 
                onChange={handleChange} 
            />
        </div>
        <div className="field">
            <label>family name</label>
            <input 
                data-testid="familyName1"
                name="familyName1" 
                value={formData.familyName1} 
                onChange={handleChange} 
            />
        </div>
        <div className="field">
            <label>phone</label>
            <input 
                data-testid="phone"
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
            />
        </div>
        <div className="buttonField">
          <button data-testid="submit" onClick={handleSubmit}>{isEditing?'Edit':'Create'}</button>
          <button data-testid="cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}