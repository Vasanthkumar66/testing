import {
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {Typography} from "@mui/material";
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: "0 auto",
  padding: theme.spacing(2),
  textAlign: "center",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  background:"linear-gradient(to top, #eeeeee, #ebe6eb, #ecdde3, #eed5d5, #ebcec3, #ebcebb, #e8cfb4, #e2d0ae, #e8d4af, #edd8af, #f3ddb0, #f8e1b0)"
}));

const StyledForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const StyledFormControl = styled(FormControl)({
  width: "100%",
  marginBottom: "18px",
});

const StyledButton = styled(Button)({
  marginTop: "16px",
  color:"black",
  backgroundColor:"#eeb03d",
  "&:hover":{backgroundColor:"black",color:"#eeb03d"}
});

const PurchaseForm = ({
  selectedUser,
  handleUserSelect,
  cart,
  handleProductSelect,
  handleSubmit,
  users
}) => {
  return (
    <StyledCard>
      <CardContent>
        <StyledForm onSubmit={handleSubmit}>
          <Typography variant="h6" sx={{ fontFamily: "sans-serif", marginBottom:"10px" }}>
          <strong>Select a User:</strong>
          </Typography>
          <StyledFormControl variant="outlined">
            <InputLabel>Select User</InputLabel>
            <Select
              value={selectedUser}
              onChange={handleUserSelect}
              required
              label="Select User"
            >
              <MenuItem value="" disabled>
                -- Select User --
              </MenuItem>
              {users.map((user) => (
                <MenuItem key={user.id} value={user.email}>
                  {user.username}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>
          <Typography variant="h6" sx={{ fontFamily: "sans-serif" }}>
          <strong>Select Products to Purchase:</strong>
          </Typography>
          <div className="product-checkboxes">
            {cart.map((product) => (
              <div key={product.id}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={product.id}
                      onChange={handleProductSelect}
                    />
                  }
                  label={product.title}
                />
              </div>
            ))}
          </div>
          <StyledButton
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              marginTop: "16px",
            }}
          >
            Confirm Purchase
          </StyledButton>
        </StyledForm>
      </CardContent>
    </StyledCard>
  );
};
export default PurchaseForm;
