import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import styles from "./CustomBtn.module.css";
import "./App.css";

// interface CustomBtnProps {
//   customSx: object;
//   btnWord: string;
//   bgColor: string;
//   onclick: () => void;
// }

const CustomBtn = () => {
  // { customSx, btnWord, bgColor, onclick }: CustomBtnProps

  const routeChange = () => {
    const DOWNLOAD_PATH =
      "https://drive.google.com/drive/folders/15ho_8BiHK2kHyp0hsIXfi90JGXjXMN5s?usp=sharing";
    // document.location.href(DOWNLOAD_PATH);
    window.open(`${DOWNLOAD_PATH}`);
  };
  const CustomButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText("#8EE8DE"),
    backgroundColor: "#8EE8DE",
    border: "1px solid #CAD6E2",
    "&:hover": {
      backgroundColor: "#5f8883",
    },
  }));
  return (
    <>
      <CustomButton
        variant="contained"
        onClick={routeChange}
        sx={{
          width: 250,
          height: 60,
          fontWeight: "bold",
          fontSize: 24,
          color: "white",
          borderRadius: "50px",
          letterSpacing: 6,
          fontFamily: "WelcomeBold",
        }}
      >
        <div className="download-text">
          DOWNLOAD
          {/* <div className="download-text-1">오늘의 영양제</div> */}
          {/* <p className="download-text-2">DOWNLOAD</p> */}
          {/* <p className="download-text-2">다운로드</p> */}
        </div>
      </CustomButton>
    </>
  );
};
export default CustomBtn;
