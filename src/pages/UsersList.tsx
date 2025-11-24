import { Edit, Plus, Trash, Mail, Phone, MapPin} from "lucide-react"
import { Button, Container } from "react-bootstrap"
import  { usersSelector } from "../store/usersStore"
import { Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import type { User } from "../types";
import { useState } from "react";
import { toast } from "react-toastify";


const UsersList = () => {
   const [showDeleteModal, setShowDeleteModal] = useState(false);
   const [userToDelete, setUserToDelete] = useState<User | null>(null);
   
   const users = usersSelector.use.users();
   const deleteUser = usersSelector.use.deleteUser();
   const navigate = useNavigate();

   const handleDeleteClick = (user: User) => {
      setUserToDelete(user);
      setShowDeleteModal(true);
   };
   const handleDeleteCancel = () => {
      setShowDeleteModal(false);
  
   };
   const handleDeleteConfirm = () => {
      if (userToDelete) {
        deleteUser(userToDelete.id);
        setShowDeleteModal(false);
        setUserToDelete(null);
        toast.success("User deleted successfully");
        
      }
   };
  
  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between aling-items-center mb-4 flex-wrap gap-2">
        <h2 className="text-primary mb-0">User Management</h2>
        <Button className="d-flex aling-items-center gap-2" size="sm" onClick={() => navigate("/add")}>
          <Plus size={18} />
          <span className="d-none d-sm-inline">Add New User</span>
          <span className="d-sm-none">Add</span>
        </Button>
      </div>
      {users.length === 0 ? (
        <div className="text-center py-5">
          <h5 className="text-body-secondary">No users found</h5>
          <p className="text-body-secondary">
            Click "Add New User" button to get started
          </p>
        </div>
      ) : (
        <Row className="g-4 py-4">
          
          {users.map((user) => {
           return (
             <Col key={user.id} xs={12} md={6} lg={4}>
               <Card className="shadow-hover">
                 <Card.Body>
                   <div className="d-flex justify-content-between align-items-start mb-3">
                     <h6 className="text-primary mb-1 text-truncate">
                       {user.name}
                     </h6>
                     <div className="d-flex gap-2">
                       <Button variant="outline-primary" size="sm" onClick={() => navigate(`/edit/${user.id}`)}>
                         <Edit size={14} />
                       </Button>
                       <Button variant="outline-danger" size="sm" onClick={() => handleDeleteClick(user)}>
                         <Trash size={14} />
                       </Button>
                     </div>
                   </div>
                   <div className="mb-3">
                     <div className="d-flex align-items-center gap-2 mb-2">
                       <Mail
                         size={16}
                         className="text-body-secondary flex-shrink-0"
                       />
                       <small className="text-break">{user.email}</small>
                     </div>

                     <div className="d-flex align-items-center gap-2 mb-2">
                       <Phone
                         size={16}
                         className="text-body-secondary flex-shrink-0"
                       />
                       <small className="text-break">{user.phone}</small>
                     </div>
                   </div>
                   <div className="d-flex align-items-start gap-2">
                    <MapPin
                        size={16}
                        className="text-body-secondary mt-1 flex-shrink-0"
                    />
                    <div className="flex-grow-1">
                      <div className="small">
                        {user.location.street.number} {''} {user.location.street.name}
                      </div>
                      <div className="small text-body-secondary">
                        {user.location.city}, {user.location.state}
                      </div>
                    </div>

                   </div>
                 </Card.Body>
               </Card>
             </Col>
           );
          })
        }</Row>
      )}
      <DeleteConfirmationModal
        show={showDeleteModal}
        userName={userToDelete?.name || ""}
        onHide={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
       />
    </Container>
  );
}

export default UsersList
