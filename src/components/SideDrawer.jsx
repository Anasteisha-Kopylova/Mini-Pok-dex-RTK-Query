import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

export default function SideDrawer({
  open,
  onClose,
  children,
  width = 360,
  title = "Details",
}) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={() => {
        if (document?.activeElement?.blur) document.activeElement.blur();
        onClose();
      }}
      slotProps={{
        paper: {
          sx: {
            width,
            mt: { xs: 0, sm: 8 },
            height: { xs: "100vh", sm: "auto" },
            maxHeight: { xs: "100vh", sm: "80vh" },
            borderTopLeftRadius: { xs: 0, sm: 16 },
            borderBottomLeftRadius: { xs: 0, sm: 16 },
            boxShadow: 6,
            overflow: "hidden",
            bgcolor: "background.paper",
          },
        },
      }}
      ModalProps={{ keepMounted: true }}
    >
      <Box
        sx={{
          px: 2,
          py: 1.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
          {title}
        </Typography>
        <IconButton onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />

      <Box
        sx={{
          p: 2,
          height: "100%",
          overflow: "auto",
          bgcolor: "background.default",
        }}
      >
        <Box
          sx={{
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
            overflow: "hidden",
          }}
        >
          {children}
        </Box>
      </Box>
    </Drawer>
  );
}
