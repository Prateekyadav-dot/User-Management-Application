
import { Row, Col, Container,Card, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usersSelector } from "../store/usersStore";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";




const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .regex(
      /^(\d{10}|\(\d{3}\) \d{3}-\d{4})$/,
      "Phone number must be either 10 digits or format (123) 456-7890"
    ),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),

  streetName: z.string().min(2, "Street Name is required"),
  streetNumber: z.string().optional(),
});

type UserFormData = z.infer<typeof userSchema>;

type UserFormProps = {
  isEdit?: boolean;
};
const UserForm: React.FC<UserFormProps> = ({isEdit = false}) => {
  const addUsers = usersSelector.use.addUsers();
  const getUserById = usersSelector.use.getUserById();
  const updateUser = usersSelector.use.updateUser();

  const {id} = useParams();
  console.log("editing user id",id);

  const existingUser = isEdit && id ? getUserById(id) : null;
  console.log("existing user",existingUser);
   const {
       register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserFormData>({
        resolver: zodResolver(userSchema),
        defaultValues: existingUser
          ? {
              name: existingUser?.name,
              email: existingUser?.email,
              phone: existingUser?.phone,
              city: existingUser?.location?.city,
              state: existingUser?.location?.state,
              streetName: existingUser?.location?.street?.name,
              streetNumber:"" + existingUser?.location?.street?.number || "",
            }
          : {},


    });

    const navigate = useNavigate(); // Placeholder for navigation function

    
    const onsubmit = (data : UserFormData) => {
      console.log("form data",data);
      const user = {
        id: crypto.randomUUID(),
        name: data.name,
        location: {
          city: data.city,
          state: data.state,
          street: {
            number: data.streetNumber ? parseInt(data.streetNumber, 10) : undefined,
            name: data.streetName,
          },
        },
        email: data.email,
        phone: data.phone,
      };
      if(!isEdit){
        //add user
        addUsers(user);
        navigate("/");
        toast("User added successfully.");
        navigate("/");
      }else{
        //update user
        if(id){
          updateUser(id, user);
          toast("User updated successfully.");
          navigate("/");
        }
        
        
      }
    }
   

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow">
            <Card.Header className="bg-primary text-white">
              <h3 className="mb-0">{isEdit ? "Edit User" : "Add New User"}</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit(onsubmit)}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter user name"
                        isInvalid={!!errors.name}
                        {...register("name")}
                      />
                      {errors.name && (
                        <div className="error-text">{errors.name.message}</div>
                      )}
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email address"
                        isInvalid={!!errors.email}
                        {...register("email")}
                      />
                      {errors.email && (
                        <div className="error-text">{errors.email.message}</div>
                      )}
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type="tel"
                        placeholder="Enter phone number"
                        isInvalid={!!errors.phone}
                        {...register("phone")}
                      />
                      {errors.phone && (
                        <div className="error-text">{errors.phone.message}</div>
                      )}
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter city name"
                        isInvalid={!!errors.city}
                        {...register("city")}
                      />
                      {errors.city && (
                        <div className="error-text">{errors.city.message}</div>
                      )}
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter state name"
                        isInvalid={!!errors.state}
                        {...register("state")}
                      />
                      {errors.state && (
                        <div className="error-text">{errors.state.message}</div>
                      )}
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Street Number</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter street number"
                        isInvalid={!!errors.streetNumber}
                        {...register("streetNumber")}
                      />
                      {errors.streetName && (
                        <div className="error-text">
                          {errors.streetName.message}
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Street Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter street name"
                        isInvalid={!!errors.streetName}
                        {...register("streetName")}
                      />
                      {errors.streetName && (
                        <div className="error-text">
                          {errors.streetName.message}
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <div className="d-flex gap-2 justify-content-end">
                  <Button variant="secondary" onClick={() => navigate("/")}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit">
                    {isEdit ? "Update User" : "Add User"}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default UserForm
