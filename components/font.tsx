import { Montserrat } from "@next/font/google";
import localFont from '@next/font/local';

const montserrat = Montserrat({ subsets: ["latin"] });
const sourceHanSans = localFont({ src: "../styles/SourceHanSans-VF.otf" });

export default function Font() {
  const fontsFontFamily = `${montserrat.style.fontFamily}, ${sourceHanSans.style.fontFamily}`;

  return (
    <style jsx global>
      {`
        html {
          font-family: ${fontsFontFamily};
          word-spacing: 2px;
          letter-spacing: 1px;
        }
      `}
    </style>
  );
}
