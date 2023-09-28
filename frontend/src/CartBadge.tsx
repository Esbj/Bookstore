import Badge from "@mui/material/Badge";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCart";

interface Props {
  cartLength: number;
  onClick: () => void;
}

export default function CartBadge(props: Props) {
  return (
    <Badge badgeContent={props.cartLength} color="primary">
      <ShoppingCartRoundedIcon
        sx={{ color: " black" }}
        onClick={props.onClick}
      />
    </Badge>
  );
}
