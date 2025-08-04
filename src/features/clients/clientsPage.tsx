import { useEffect, useState } from "react";
import { getClients, postClients,putClients,deleteClients } from "./clientsApi";
import type { Client } from "./clientType";
import ClientForm from './componets/clientForm';
import './clientsPage.css'

export default function clientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientSelected, setClientSelected] = useState<Client | null>(null);


  useEffect(() => {
    getClients().then(setClients).catch(console.error);
  }, []);

  function editButtonHandle( element:Client ){
    setClientSelected(element);
    setIsModalOpen(true);
  };
  function removeButtonHandle( element:Client ){

      deleteClients(element).then(()=>{
        getClients().then(setClients).catch(console.error);
      }).catch(console.error);
  };
  function newButtonHandle(){
    setClientSelected(null);
    setIsModalOpen(true);
  };

  return (
    <>  
      {
        clients.map( (element,i ) => 
          <div className="clientCard" key={'ele_'+i}>
            <label>id:{element.id}</label> 
            <label>doc type:{element.docType}</label> 
            <label>doc num:{element.docNum}</label> 
            <label>email:{element.email}</label> 
            <label>given name:{element.givenName}</label> 
            <label>family name:{element.familyName1}</label> 
            <label>phone:{element.phone}</label> 
            <div>
              <button className="editButton" onClick={()=>{ editButtonHandle(element)}}>Edit</button>
              <button className="removeButton" onClick={()=>{ removeButtonHandle(element)}}>Remove</button>
            </div>
          </div>
        )
      }
     <button className="newButton" onClick={newButtonHandle}>New Client</button>
     
      { isModalOpen && (
       <ClientForm
          onClose={() => setIsModalOpen(false)}
          onSubmit={(newClient: Client) => {
            setIsModalOpen(false);
            if(clientSelected == null){
                postClients(newClient).then(()=>{
                  getClients().then(setClients).catch(console.error);
                }).catch(console.error);
            }
            else{
                putClients(newClient).then(()=>{
                  getClients().then(setClients).catch(console.error);
                }).catch(console.error);
            }
            getClients().then(setClients).catch(console.error);
          }}
          clientSelected={clientSelected}
        />
      )}
     </>
  );
  
         
}

